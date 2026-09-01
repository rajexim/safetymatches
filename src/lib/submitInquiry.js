const FORMSUBMIT_ID = 'f4a6b8d0f1f10d85b8ce3d1378360fda';
const FORMSUBMIT_INBOX = 'export@glovel.in';
const FORMSUBMIT_CC = 'sales@glovel.in';
const FORMSUBMIT_TARGETS = [FORMSUBMIT_ID, FORMSUBMIT_INBOX];

function scrub(value, max = 500) {
  return String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);
}

function isMailSuccess(res, data) {
  return res.ok && (data?.success === true || data?.success === 'true' || data?.ok === true);
}

async function postJson(url, body, extraHeaders = {}, timeoutMs = 8000) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...extraHeaders
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs)
  });
  let data = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  return { res, data };
}

function buildPayload({ type, fields }) {
  const isRfq = type === 'rfq';
  const name = scrub(fields.name, 120);
  const email = scrub(fields.email, 160);
  const product = scrub(fields.product, 160);

  return {
    type: isRfq ? 'rfq' : 'contact',
    name,
    email,
    phone: scrub(fields.phone, 80),
    company: scrub(fields.company, 160),
    country: scrub(fields.country, 160),
    product,
    orderVolume: scrub(fields.orderVolume, 160),
    customBranding: scrub(fields.customBranding, 200),
    notes: scrub(fields.notes, 4000),
    message: scrub(fields.message, 4000)
  };
}

function formSubmitBody(payload) {
  const isRfq = payload.type === 'rfq';
  const subject = isRfq
    ? `[safetymatches.in] RFQ: ${payload.product || 'Inquiry'} — ${payload.name}`
    : `[safetymatches.in] Inquiry from ${payload.name}`;

  const body = {
    _subject: subject,
    _cc: FORMSUBMIT_CC,
    _replyto: payload.email,
    _template: 'table',
    _captcha: 'false',
    Type: isRfq ? 'RFQ / Sample Kit' : 'Contact form',
    Name: payload.name,
    email: payload.email,
    'Phone / WhatsApp': payload.phone,
    Company: payload.company,
    'Country / Port': payload.country,
    Source: 'https://www.safetymatches.in'
  };

  if (isRfq) {
    body.Product = payload.product;
    body['Order volume'] = payload.orderVolume;
    body['Custom branding'] = payload.customBranding;
    body.Notes = payload.notes || '(none)';
  } else {
    body.Message = payload.message || '(none)';
  }

  return body;
}

function explainFailure(message) {
  const text = String(message || '');
  if (/activat/i.test(text)) {
    return 'FormSubmit sent an activation email to export@glovel.in. Open that inbox, click “Activate Form”, then submit this form again.';
  }
  return text || 'Could not send your inquiry. Please try again or use WhatsApp.';
}

async function postQuote(payload) {
  try {
    const { res, data } = await postJson('/api/quote', payload, {}, 8000);
    if (isMailSuccess(res, data)) return { ok: true };
    return { ok: false, message: data.message || data.error };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

async function postFormSubmit(payload) {
  const body = formSubmitBody(payload);
  let lastMessage = '';
  for (const target of FORMSUBMIT_TARGETS) {
    try {
      const { res, data } = await postJson(
        `https://formsubmit.co/ajax/${encodeURIComponent(target)}`,
        body
      );
      if (isMailSuccess(res, data)) return { ok: true };
      lastMessage = data.message || data.error || lastMessage;
    } catch (err) {
      lastMessage = err.message || lastMessage;
    }
  }
  return { ok: false, message: lastMessage };
}

export async function submitInquiry({ type, fields }) {
  const payload = buildPayload({ type, fields });
  const [form, quote] = await Promise.all([postFormSubmit(payload), postQuote(payload)]);
  if (form.ok || quote.ok) return;
  throw new Error(explainFailure(form.message || quote.message));
}
