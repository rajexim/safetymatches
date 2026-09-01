import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentFile = path.join(root, 'content', 'site-content.json');
const publicContentFile = path.join(root, 'public', 'content', 'site-content.json');
const uploadRoot = path.join(root, 'public', 'assets', 'images');
const distUploadRoot = path.join(root, 'dist', 'assets', 'images');

const PORT = Number(process.env.CMS_PORT || 8787);
const PASSWORD = process.env.CMS_PASSWORD || 'glovel-admin';

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

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    return send(res, 204, '');
  }

  try {
    if (req.method === 'GET' && url.pathname === '/api/cms/health') {
      return send(res, 200, {
        ok: true,
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

    send(res, 404, { error: 'Not found' });
  } catch (err) {
    send(res, 500, { error: err.message || 'Server error' });
  }
});

server.listen(PORT, () => {
  console.log(`CMS API running on http://localhost:${PORT}`);
});
