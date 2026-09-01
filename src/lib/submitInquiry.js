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

function foldExtras(baseMessage, extras) {
  const lines = extras.filter((line) => line && !baseMessage.includes(line));
  const extraBlock = lines.join('\n');
  return [baseMessage, extraBlock].filter(Boolean).join('\n\n') || 'No additional notes provided.';
}

function buildPayload({ type, fields }) {
  const isRfq = type === 'rfq';
  const name = scrub(fields.name, 120);
  const email = scrub(fields.email, 160);
  const phone = scrub(fields.phone, 80);
  const company = scrub(fields.company, 160);
  const country = scrub(fields.country, 160);
  const product = scrub(fields.product, 160);
  const orderVolume = scrub(fields.orderVolume, 160);
  const customBranding = scrub(fields.customBranding, 200);
  const notes = scrub(fields.notes, 4000);
  const message = foldExtras(scrub(fields.message, 4000), [
    company && `Company: ${company}`,
    country && `Country / Port: ${country}`,
    product && `Product: ${product}`,
    orderVolume && `Order volume: ${orderVolume}`,
    customBranding && `Custom branding: ${customBranding}`,
    notes && `Notes: ${notes}`
  ]);

  return {
    site: 'safetymatches',
    type: isRfq ? 'rfq' : 'contact',
    name,
    email,
    phone,
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
        message: payload.message,
        _subject: payload.type === 'rfq'
          ? `[safetymatches.in] RFQ — ${payload.name}`
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
