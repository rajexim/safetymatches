import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentFile = path.join(root, 'content', 'site-content.json');
const publicContentFile = path.join(root, 'public', 'content', 'site-content.json');
const uploadRoot = path.join(root, 'public', 'assets', 'images');
const distUploadRoot = path.join(root, 'dist', 'assets', 'images');

const PORT = Number(process.env.CMS_PORT || 8787);
const PASSWORD = process.env.CMS_PASSWORD || 'glovel-admin';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = String(process.env.SMTP_SECURE || 'true') !== 'false';
const SMTP_USER = process.env.SMTP_USER || 'ecommerce@rajexim.co.in';
const SMTP_PASS_RAW = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
const SMTP_PASS =
  !SMTP_PASS_RAW ||
  SMTP_PASS_RAW.startsWith('replace-with-') ||
  SMTP_PASS_RAW.includes('google-app-password')
    ? ''
    : SMTP_PASS_RAW;
const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER;
const MAIL_TO = process.env.MAIL_TO || 'sales@glovel.in,export@glovel.in';

const MAX_CONTACT_BODY = 64 * 1024;
const RATE_LIMIT_MS = 60_000;
const rateLimitByIp = new Map();

function send(res, status, data, type = 'application/json') {
  const body = typeof data === 'string' ? data : JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': type,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-cms-password',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS'
  });
  res.end(body);
}

function readBody(req, maxBytes = Infinity) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > maxBytes) {
        reject(Object.assign(new Error('Payload too large'), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function checkAuth(req) {
  return req.headers['x-cms-password'] === PASSWORD;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function safeSegment(name) {
  return String(name || '')
    .replace(/[^a-zA-Z0-9._\-\s]/g, '')
    .trim();
}

/** Allow nested folders like products/household while blocking path traversal. */
function safeFolder(folder) {
  return String(folder || 'uploads')
    .replace(/\\/g, '/')
    .split('/')
    .map((seg) => safeSegment(seg))
    .filter((seg) => seg && seg !== '.' && seg !== '..')
    .join('/');
}

function uniqueFilename(original) {
  const cleaned = safeSegment(original) || `upload-${Date.now()}.png`;
  const dot = cleaned.lastIndexOf('.');
  const base = dot > 0 ? cleaned.slice(0, dot) : cleaned;
  const ext = dot > 0 ? cleaned.slice(dot) : '.png';
  const stamp = Date.now().toString(36);
  return `${base}-${stamp}${ext}`;
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const last = rateLimitByIp.get(ip) || 0;
  if (now - last < RATE_LIMIT_MS) return true;
  rateLimitByIp.set(ip, now);
  // Opportunistic cleanup
  if (rateLimitByIp.size > 500) {
    for (const [key, ts] of rateLimitByIp) {
      if (now - ts > RATE_LIMIT_MS) rateLimitByIp.delete(key);
    }
  }
  return false;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function scrub(value, max = 500) {
  return String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);
}

function buildMail({ type, fields }) {
  const isRfq = type === 'rfq';
  const name = scrub(fields.name, 120);
  const email = scrub(fields.email, 160);
  const product = scrub(fields.product, 160);
  const subject = isRfq
    ? `[safetymatches.in] RFQ: ${product || 'Inquiry'} — ${name}`
    : `[safetymatches.in] Inquiry from ${name}`;

  const lines = [
    `Type: ${isRfq ? 'RFQ / Sample Kit' : 'Contact form'}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${scrub(fields.phone, 80)}`,
    `Company: ${scrub(fields.company, 160)}`,
    `Country / Port: ${scrub(fields.country, 160)}`
  ];

  if (isRfq) {
    lines.push(
      `Product: ${product}`,
      `Order volume: ${scrub(fields.orderVolume, 160)}`,
      `Custom branding: ${scrub(fields.customBranding, 200)}`,
      `Notes:`,
      scrub(fields.notes, 4000) || '(none)'
    );
  } else {
    lines.push('Message:', scrub(fields.message, 4000) || '(none)');
  }

  lines.push('', `Submitted: ${new Date().toISOString()}`, 'Source: https://www.safetymatches.in');

  const text = lines.join('\n');
  return { subject, text, replyTo: email };
}

async function sendInquiryMail(payload) {
  if (!SMTP_PASS) {
    const err = new Error('SMTP is not configured (set SMTP_PASS / Google App Password)');
    err.statusCode = 503;
    throw err;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  const { subject, text, replyTo } = buildMail(payload);

  await transporter.sendMail({
    from: `"Glovel Matches LLP" <${MAIL_FROM}>`,
    to: MAIL_TO,
    replyTo,
    subject,
    text
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    return send(res, 204, '');
  }

  try {
    if (req.method === 'GET' && url.pathname === '/api/cms/health') {
      return send(res, 200, {
        ok: true,
        mailConfigured: Boolean(SMTP_PASS),
        passwordHint: 'Use the CMS_PASSWORD set in the glovel-cms systemd unit'
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/cms/login') {
      if (!checkAuth(req)) return send(res, 401, { error: 'Invalid CMS password' });
      return send(res, 200, { ok: true });
    }

    if (req.method === 'GET' && url.pathname === '/api/cms/content') {
      const raw = fs.readFileSync(contentFile, 'utf8');
      return send(res, 200, raw, 'application/json');
    }

    if (req.method === 'PUT' && url.pathname === '/api/cms/content') {
      if (!checkAuth(req)) return send(res, 401, { error: 'Invalid CMS password' });
      const body = await readBody(req);
      const parsed = JSON.parse(body.toString('utf8'));
      parsed.updatedAt = new Date().toISOString();
      const json = JSON.stringify(parsed, null, 2);
      ensureDir(path.dirname(contentFile));
      ensureDir(path.dirname(publicContentFile));
      fs.writeFileSync(contentFile, json);
      fs.writeFileSync(publicContentFile, json);
      return send(res, 200, { ok: true, updatedAt: parsed.updatedAt });
    }

    if (req.method === 'POST' && url.pathname === '/api/cms/upload') {
      if (!checkAuth(req)) return send(res, 401, { error: 'Invalid CMS password' });
      let body;
      try {
        body = JSON.parse((await readBody(req, 30 * 1024 * 1024)).toString('utf8'));
      } catch (err) {
        if (err.statusCode === 413) return send(res, 413, { error: 'Image too large (max ~20MB)' });
        return send(res, 400, { error: 'Invalid upload payload' });
      }
      const folder = safeFolder(body.folder || 'uploads') || 'uploads';
      const filename = uniqueFilename(body.filename || `upload-${Date.now()}.png`);
      if (!body.data) return send(res, 400, { error: 'Missing file data' });

      const base64 = String(body.data).replace(/^data:[^;]+;base64,/, '');
      const buffer = Buffer.from(base64, 'base64');
      if (!buffer.length) return send(res, 400, { error: 'Empty image data' });

      for (const rootDir of [uploadRoot, distUploadRoot]) {
        try {
          const destDir = path.join(rootDir, folder);
          ensureDir(destDir);
          fs.writeFileSync(path.join(destDir, filename), buffer);
        } catch (err) {
          // public/ is required (nginx serves /assets/images from there).
          // dist/ is best-effort and may not be writable by the CMS user.
          if (rootDir === uploadRoot) throw err;
          console.warn('cms upload dist copy skipped:', err.message);
        }
      }

      const publicPath = `/assets/images/${folder}/${filename}`.replace(/\\/g, '/');
      return send(res, 200, { ok: true, path: publicPath });
    }

    if (req.method === 'POST' && url.pathname === '/api/cms/contact') {
      const ip = clientIp(req);
      if (isRateLimited(ip)) {
        return send(res, 429, { error: 'Please wait a minute before sending another inquiry.' });
      }

      let parsed;
      try {
        parsed = JSON.parse((await readBody(req, MAX_CONTACT_BODY)).toString('utf8'));
      } catch (err) {
        if (err.statusCode === 413) return send(res, 413, { error: 'Payload too large' });
        return send(res, 400, { error: 'Invalid JSON body' });
      }

      const type = parsed.type === 'rfq' ? 'rfq' : 'contact';
      const fields = parsed.fields && typeof parsed.fields === 'object' ? parsed.fields : parsed;

      if (!scrub(fields.name, 120) || !isValidEmail(fields.email) || !scrub(fields.phone, 80)) {
        return send(res, 400, { error: 'Name, valid email, and phone are required.' });
      }

      if (type === 'contact' && !scrub(fields.message, 4000) && !scrub(fields.country, 160)) {
        return send(res, 400, { error: 'Please include your inquiry details.' });
      }

      if (type === 'rfq' && !scrub(fields.country, 160)) {
        return send(res, 400, { error: 'Destination country / port is required.' });
      }

      try {
        await sendInquiryMail({ type, fields });
      } catch (err) {
        console.error('contact mail failed:', err.message);
        return send(res, err.statusCode || 502, {
          error: err.statusCode === 503
            ? 'Email is not configured yet. Please email sales@glovel.in directly.'
            : 'Could not send your inquiry. Please try again or email sales@glovel.in.'
        });
      }

      return send(res, 200, { ok: true });
    }

    send(res, 404, { error: 'Not found' });
  } catch (err) {
    send(res, 500, { error: err.message || 'Server error' });
  }
});

server.listen(PORT, () => {
  console.log(`CMS API running on http://localhost:${PORT}`);
  console.log(`Mail configured: ${Boolean(SMTP_PASS)}`);
});
