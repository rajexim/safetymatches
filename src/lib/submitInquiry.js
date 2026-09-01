const FORMSUBMIT_ID = 'f4a6b8d0f1f10d85b8ce3d1378360fda';
const FORMSUBMIT_CC = 'sales@glovel.in';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${FORMSUBMIT_ID}`;

function scrub(value, max = 500) {
  return String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);
}

function isFormSubmitSuccess(data) {
  return data?.success === true || data?.success === 'true';
}

export async function submitInquiry({ type, fields }) {
  const isRfq = type === 'rfq';
  const name = scrub(fields.name, 120);
  const email = scrub(fields.email, 160);
  const product = scrub(fields.product, 160);
  const subject = isRfq
    ? `[safetymatches.in] RFQ: ${product || 'Inquiry'} — ${name}`
    : `[safetymatches.in] Inquiry from ${name}`;

  const payload = {
    _subject: subject,
    _cc: FORMSUBMIT_CC,
    _replyto: email,
    _template: 'table',
    _captcha: 'false',
    Type: isRfq ? 'RFQ / Sample Kit' : 'Contact form',
    Name: name,
    email,
    'Phone / WhatsApp': scrub(fields.phone, 80),
    Company: scrub(fields.company, 160),
    'Country / Port': scrub(fields.country, 160),
    Source: 'https://www.safetymatches.in'
  };

  if (isRfq) {
    payload.Product = product;
    payload['Order volume'] = scrub(fields.orderVolume, 160);
    payload['Custom branding'] = scrub(fields.customBranding, 200);
    payload.Notes = scrub(fields.notes, 4000) || '(none)';
  } else {
    payload.Message = scrub(fields.message, 4000) || '(none)';
  }

  const res = await fetch(FORMSUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !isFormSubmitSuccess(data)) {
    throw new Error(data.message || data.error || 'Could not send your inquiry.');
  }
}
