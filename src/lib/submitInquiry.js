const FORMSUBMIT_ID = 'f4a6b8d0f1f10d85b8ce3d1378360fda';
const FORMSUBMIT_CC = 'sales@glovel.in';

function scrub(value, max = 500) {
  return String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);
}

function isMailSuccess(res, data) {
  return res.ok && (data.success === true || data.success === 'true' || data.ok === true);
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
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
  const notes = scrub(fields.notes, 4000);
  const message =
    scrub(fields.message, 4000) ||
    [product, notes].filter(Boolean).join(' — ') ||
    'No additional notes provided.';

  return {
    site: 'safetymatches',
    type: isRfq ? 'rfq' : 'contact',
    name,
    email,
    phone: scrub(fields.phone, 80),
    company: scrub(fields.company, 160),
    country: scrub(fields.country, 160),
    vehicle: product,
    product,
    orderVolume: scrub(fields.orderVolume, 160),
    customBranding: scrub(fields.customBranding, 200),
    notes,
    message
  };
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
    const { res, data } = await postJson(
      `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_ID)}`,
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        country: payload.country,
        company: payload.company,
        vehicle: payload.product,
        message: payload.message,
        _subject: payload.type === 'rfq'
          ? `[safetymatches.in] RFQ: ${payload.product || 'Inquiry'} — ${payload.name}`
          : `[safetymatches.in] Inquiry from ${payload.name}`,
        _template: 'table',
        _captcha: 'false',
        _replyto: payload.email,
        _cc: FORMSUBMIT_CC
      }
    );
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
