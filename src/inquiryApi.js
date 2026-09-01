function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      ...extraHeaders
    }
  });
}

export function isMailSuccess(data) {
  return data?.success === true || data?.success === 'true' || data?.ok === true;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function scrub(value, max = 500) {
  return String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);
}

async function readJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

function smtpPassword(env = {}) {
  return String(env.SMTP_PASS || '').replace(/\s+/g, '');
}

function withTimeout(promise, ms, label = 'Timed out') {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(label)), ms);
    })
  ]).finally(() => clearTimeout(timer));
}

function headerValue(request, name, fallback = '') {
  if (!request?.headers) return fallback;
  if (typeof request.headers.get === 'function') {
    return request.headers.get(name) || fallback;
  }
  return request.headers[name.toLowerCase()] || fallback;
}

const DEFAULT_RECIPIENTS = ['export@glovel.in', 'sales@glovel.in'];
const PRIMARY_INBOX = 'export@glovel.in';
const DEFAULT_FORMSUBMIT_ID = 'f4a6b8d0f1f10d85b8ce3d1378360fda';
const SITE_ORIGIN = 'https://www.safetymatches.in';

export function inquiryRecipients(env = {}) {
  const raw = env.MAIL_TO || DEFAULT_RECIPIENTS.join(', ');
  return String(raw)
    .split(/[,;]/)
    .map((addr) => addr.trim())
    .filter(Boolean);
}

export function parseInquiryBody(body = {}) {
  const isRfq = String(body.type || '').toLowerCase() === 'rfq';
  const payload = {
    site: 'safetymatches',
    type: isRfq ? 'rfq' : 'contact',
    name: scrub(body.name, 120),
    email: scrub(body.email, 160),
    phone: scrub(body.phone, 80),
    company: scrub(body.company, 160),
    country: scrub(body.country, 160),
    product: scrub(body.product, 160),
    orderVolume: scrub(body.orderVolume, 160),
    customBranding: scrub(body.customBranding, 200),
    notes: scrub(body.notes, 4000),
    message: scrub(body.message, 4000)
  };

  if (!payload.name || !payload.email) {
    return { ok: false, message: 'Name and email are required.' };
  }

  return { ok: true, payload };
}

export function inquirySubject(payload) {
  if (payload.type === 'rfq') {
    return `[safetymatches.in] RFQ: ${payload.product || 'Inquiry'} — ${payload.name}`;
  }
  return `[safetymatches.in] Inquiry from ${payload.name}`;
}

export function formSubmitBody(payload, env = {}) {
  const recipients = inquiryRecipients(env);
  const cc =
    env.FORMSUBMIT_CC ||
    recipients.filter((addr) => addr.toLowerCase() !== PRIMARY_INBOX).join(', ');
  const body = {
    _subject: inquirySubject(payload),
    _template: 'table',
    _captcha: 'false',
    _replyto: payload.email,
    ...(cc ? { _cc: cc } : {}),
    Type: payload.type === 'rfq' ? 'RFQ / Sample Kit' : 'Contact form',
    Name: payload.name,
    email: payload.email,
    'Phone / WhatsApp': payload.phone,
    Company: payload.company,
    'Country / Port': payload.country,
    Source: SITE_ORIGIN
  };

  if (payload.type === 'rfq') {
    body.Product = payload.product;
    body['Order volume'] = payload.orderVolume;
    body['Custom branding'] = payload.customBranding;
    body.Notes = payload.notes || '(none)';
  } else {
    body.Message = payload.message || '(none)';
  }

  return body;
}

export function inquiryEmailHtml(payload) {
  const row = (label, value, alt = false) => `
    <tr>
      <td style="padding:8px;font-weight:bold;width:160px;background:${alt ? '#f8fafc' : '#ffffff'}">${label}</td>
      <td style="padding:8px;background:${alt ? '#f8fafc' : '#ffffff'}">${value}</td>
    </tr>`;

  const heading =
    payload.type === 'rfq'
      ? 'New Glovel Matches RFQ / Sample Kit Request'
      : 'New Glovel Matches Website Inquiry';

  const extra =
    payload.type === 'rfq'
      ? `${row('Product:', `<strong style="color:#b45309">${escapeHtml(payload.product || 'Inquiry')}</strong>`, true)}
    ${row('Order volume:', escapeHtml(payload.orderVolume || 'N/A'))}
    ${row('Custom branding:', escapeHtml(payload.customBranding || 'N/A'), true)}
    ${row('Notes:', escapeHtml(payload.notes || '(none)'))}`
      : `${row('Message:', escapeHtml(payload.message || '(none)'), true)}`;

  return `<!doctype html>
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:8px;">
  <h2 style="color:#b45309;border-bottom:2px solid #f59e0b;padding-bottom:10px;">${heading}</h2>
  <table style="width:100%;border-collapse:collapse;margin-top:15px;">
    ${row('Type:', escapeHtml(payload.type === 'rfq' ? 'RFQ / Sample Kit' : 'Contact form'), true)}
    ${row('Full Name:', escapeHtml(payload.name))}
    ${row('Email Address:', `<a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a>`, true)}
    ${row('Phone / WhatsApp:', escapeHtml(payload.phone || 'N/A'))}
    ${row('Company:', escapeHtml(payload.company || 'N/A'), true)}
    ${row('Country / Port:', escapeHtml(payload.country || 'N/A'))}
    ${extra}
  </table>
  <p style="margin-top:20px;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;padding-top:10px;">
    This message was sent from the Safety Matches website (safetymatches.in).
  </p>
</div>`;
}

export async function tryVpsMailer(payload, env = {}) {
  const url = env.MAILER_URL || env.VITE_MAILER_URL || 'https://contact.rajexim.co.in/api/quote';
  const key = env.MAILER_KEY || env.VITE_MAILER_KEY || '';
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 4000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(key ? { 'X-Mailer-Key': key } : {})
      },
      body: JSON.stringify(payload),
      signal: ac.signal
    });
    if (!res.ok) return null;
    const data = await readJson(res);
    return isMailSuccess(data) ? data : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function tryFormSubmit(payload, env = {}, request) {
  const origin = headerValue(request, 'Origin', SITE_ORIGIN);
  const referer = headerValue(request, 'Referer', `${SITE_ORIGIN}/`);
  const targets = [...new Set(
    [env.FORMSUBMIT_ID || DEFAULT_FORMSUBMIT_ID, PRIMARY_INBOX].filter(Boolean)
  )];
  const body = JSON.stringify(formSubmitBody(payload, env));

  for (const target of targets) {
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(target)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: origin,
          Referer: referer
        },
        body,
        signal: AbortSignal.timeout(8000)
      });
      const data = await readJson(res);
      if (res.ok && isMailSuccess(data)) return data;
    } catch {
      /* try next target */
    }
  }
  return null;
}

async function tryGmailSmtp(payload, env = {}) {
  const user = env.SMTP_USER || 'ecommerce@rajexim.co.in';
  const pass = smtpPassword(env);
  if (!pass) return false;

  let connect;
  try {
    ({ connect } = await import('cloudflare:sockets'));
  } catch {
    return false;
  }

  const recipients = inquiryRecipients(env);
  const subject = inquirySubject(payload);
  const html = inquiryEmailHtml(payload);
  const encodedSubject = `=?UTF-8?B?${btoa(String.fromCharCode(...new TextEncoder().encode(subject)))}?=`;
  const raw = [
    `From: "Glovel Matches Web" <${user}>`,
    `To: ${recipients.join(', ')}`,
    `Reply-To: ${payload.email}`,
    `Subject: ${encodedSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    html,
    ''
  ].join('\r\n');

  let socket;
  try {
    socket = connect({ hostname: 'smtp.gmail.com', port: 465, secureTransport: 'on' });
    const reader = socket.readable.getReader();
    const writer = socket.writable.getWriter();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let buffer = '';

    const readResponse = async () => {
      while (true) {
        const lines = buffer.replace(/\r/g, '').split('\n');
        const complete = lines.slice(0, -1);
        const lastComplete = [...complete].reverse().find((line) => /^\d{3}[ -]/.test(line));
        if (lastComplete && /^\d{3} /.test(lastComplete) && complete.some((line) => line === lastComplete)) {
          const code = parseInt(lastComplete.slice(0, 3), 10);
          const text = buffer;
          buffer = lines[lines.length - 1] || '';
          return { code, text };
        }
        const { value, done } = await reader.read();
        if (done) throw new Error('SMTP connection closed');
        buffer += decoder.decode(value, { stream: true });
      }
    };

    const cmd = async (line) => {
      await writer.write(encoder.encode(`${line}\r\n`));
      return readResponse();
    };

    const greet = await readResponse();
    if (greet.code !== 220) throw new Error(greet.text);
    const ehlo = await cmd('EHLO safetymatches.in');
    if (ehlo.code !== 250) throw new Error(ehlo.text);
    const auth = await cmd('AUTH LOGIN');
    if (auth.code !== 334) throw new Error(auth.text);
    const userReply = await cmd(btoa(user));
    if (userReply.code !== 334) throw new Error(userReply.text);
    const passReply = await cmd(btoa(pass));
    if (passReply.code !== 235) throw new Error(passReply.text);
    const fromReply = await cmd(`MAIL FROM:<${user}>`);
    if (fromReply.code !== 250) throw new Error(fromReply.text);
    for (const addr of recipients) {
      const toReply = await cmd(`RCPT TO:<${addr}>`);
      if (toReply.code !== 250) throw new Error(toReply.text);
    }
    const dataReply = await cmd('DATA');
    if (dataReply.code !== 354) throw new Error(dataReply.text);
    const sendReply = await cmd(`${raw.replace(/\n\./g, '\n..')}\r\n.`);
    if (sendReply.code !== 250) throw new Error(sendReply.text);
    await cmd('QUIT').catch(() => {});
    return true;
  } catch {
    return false;
  } finally {
    try {
      socket?.close();
    } catch {
      /* ignore */
    }
  }
}

async function tryGmailSmtpTimed(payload, env = {}) {
  try {
    return await withTimeout(tryGmailSmtp(payload, env), 5000, 'SMTP timeout');
  } catch {
    return false;
  }
}

export async function handleInquiryRequest(request, env = {}) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (request.method !== 'POST') {
    return json({ success: false, message: 'Method not allowed.' }, 405);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: 'Invalid JSON body.' }, 400);
  }

  const parsed = parseInquiryBody(body);
  if (!parsed.ok) {
    return json({ success: false, message: parsed.message }, 400);
  }

  const payload = parsed.payload;

  // FormSubmit first: Cloudflare blocks outbound SMTP ports, so Gmail often hangs.
  const formSubmit = await tryFormSubmit(payload, env, request);
  if (formSubmit) {
    return json({ success: true, message: 'Inquiry sent.' });
  }

  if (await tryGmailSmtpTimed(payload, env)) {
    return json({ success: true, message: 'Inquiry sent.' });
  }

  const vps = await tryVpsMailer(payload, env);
  if (vps) {
    return json({ success: true, message: vps.message || 'Inquiry sent.' });
  }

  return json(
    {
      success: false,
      message: 'Could not send your inquiry. Please try again or use WhatsApp.'
    },
    502
  );
}
