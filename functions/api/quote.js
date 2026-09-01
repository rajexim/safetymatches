import { handleInquiryRequest } from '../../src/quoteApi.js';

export async function onRequest(context) {
  return handleInquiryRequest(context.request, context.env);
}
