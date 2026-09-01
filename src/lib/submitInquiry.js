const FORMSUBMIT_ID = 'f4a6b8d0f1f10d85b8ce3d1378360fda';
const FORMSUBMIT_CC = 'sales@glovel.in';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${FORMSUBMIT_ID}`;

function scrub(value, max = 500) {
  return String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);
}

function isMailSuccess(res, data) {
  return res.ok && (data?.success === true || data?.success === 'true' || data?.ok === true);
}

async function postJson(url, body, extraHeaders = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...extraHeaders
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(12000)
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

async function postQuote(payload) {
  try {
    const { res, data } = await postJson('/api/quote', payload);
    return isMailSuccess(res, data);
  } catch {
    return false;
  }
}

async function postFormSubmit(payload) {
  try {
    const { res, data } = await postJson(FORMSUBMIT_URL, formSubmitBody(payload));
    return isMailSuccess(res, data);
  } catch {
    return false;
  }
}

export async function submitInquiry({ type, fields }) {
  const payload = buildPayload({ type, fields });
  const sent = (await postQuote(payload)) || (await postFormSubmit(payload));
  if (!sent) {
    throw new Error('Could not send your inquiry. Please try again or use WhatsApp.');
  }
}
