import { handleInquiryRequest } from '../../src/inquiryApi.js';

export async function onRequest(context) {
  return handleInquiryRequest(context.request, context.env);
}
