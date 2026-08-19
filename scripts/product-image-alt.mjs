/**
 * Alt text for every product gallery image, written from the actual photograph
 * rather than generated from a counter. Each entry has:
 *
 *   alt   — what a screen reader announces and what image search indexes.
 *           Describes the printed label, the splint and the head colour that
 *           are genuinely visible in that photo.
 *   label — the short caption printed under the thumbnail in the UI.
 *
 * These are private-label and OEM boxes Glovel has produced for importers, so
 * the third-party brand names below are what is literally printed on the box.
 *
 * Consumed by scripts/seed-cms-content.mjs and scripts/apply-image-alt.mjs.
 */

const HOUSEHOLD = [
  ['Red and black printed household safety matchbox open to show 40mm poplar splints with red match heads', 'Red & black label, red heads'],
  ['VOLCAN 40-unit household safety matchbox in blue, opened to reveal poplar splints with green match heads', 'VOLCAN, green heads'],
  ['FESCO scissors-brand household safety matchbox standing open, filled with wooden splints with brown match heads', 'FESCO scissors label'],
  ['Dima Allumettes household safety matchbox marked Made in India, filled with brown-headed wooden splints', 'Dima Allumettes'],
  ['ZEUS Fosforos de Seguridad 40-stick household matchbox with red-headed poplar splints', 'ZEUS, 40 sticks'],
  ['CHISPITA household safety matchbox in red, holding 45 wooden splints with red match heads', 'CHISPITA, 45 sticks'],
  ['Plain blue private-label household matchbox with a minimal two-square motif and white-headed splints', 'Plain blue private label'],
  ['Red and black household safety matchbox lying open, showing the side friction striker and red-headed poplar splints', 'Red & black, side striker'],
  ['Blue checkerboard household safety matchbox opened to show wooden splints with white match heads', 'Blue checkerboard'],
  ['LATIGO household safety matchbox with red horse artwork on blue board, holding 40 blue-headed splints', 'LATIGO, blue heads'],
  ['Rimi retail-brand household safety matchbox in red with a red honeycomb side striker and red-headed splints', 'Rimi retail brand'],
  ['VOLCAN 40-unit household safety matchbox in pale blue, opened to show red-headed poplar splints', 'VOLCAN, red heads'],
  ['VICUNA 40-stick household safety matchbox with yellow label and red-headed wooden splints', 'VICUNA, yellow label'],
  ['DEPO retail-brand household safety matchbox in red and green, filled with red-headed poplar splints', 'DEPO retail brand'],
  ['Household safety matchbox with yellow forest illustration, holding wooden splints with brown match heads', 'Forest illustration label'],
  ['Ukrainian-language SIRNYKY household safety matchbox in red, opened to show red-headed poplar splints', 'Ukrainian SIRNYKY label'],
  ['Selver supermarket-brand household safety matchbox in red, standing open with red-headed splints', 'Selver supermarket brand'],
  ['Elvi supermarket-brand household safety matchbox in green, standing open with green-headed splints', 'Elvi supermarket brand'],
  ['Candela 40-stick household safety matchbox with bonfire artwork and red-headed wooden splints', 'Candela, bonfire artwork'],
  ['Teal checkerboard household safety matchbox standing open with white-headed wooden splints', 'Teal checkerboard'],
  ['Closed red private-label household safety matchbox printed with a retail logo and slogan', 'Red private-label box']
];

const WAX = [
  ['Cerillito El Milagro 50-stick wax safety matchbox, reverse side showing folk-art label, barcode and safety notices', 'Cerillito El Milagro, reverse'],
  ['Cerillito El Milagro wax safety matchbox standing open, filled with white paraffin kraft splints with red heads', 'Cerillito El Milagro, open'],
  ['British American Tobacco Tanzania branded wax matchbox in navy, holding dark paraffin splints with red heads', 'BAT Tanzania private label'],
  ['San Jorge 50-stick wax safety matchbox opened to show white paraffin kraft splints with black match heads', 'San Jorge, black heads'],
  ['San Jorge Extra Largos wax safety matchboxes displayed with their printed retail caddy pack', 'San Jorge caddy pack'],
  ['Africa Moto trilingual wax matchbox labelled in French, English and Swahili, with black-headed paraffin splints', 'Africa Moto, trilingual'],
  ['Crown Crane wax safety matchbox with yellow bird artwork, filled with black-headed paraffin kraft splints', 'Crown Crane label'],
  ['Zebra wax safety matchbox with yellow label, opened to show white paraffin splints with black match heads', 'Zebra, black heads'],
  ['Cerillito El Milagro wax safety matchbox shown closed, front cover folk-art artwork', 'Cerillito El Milagro, closed'],
  ['Three Cerillito El Milagro wax matchboxes opened side by side, each filled with red-headed paraffin splints', 'Cerillito El Milagro, three-up']
];

const KITCHEN = [
  ['Energy long kitchen safety matchbox with blue elephant artwork, filled with red-headed wooden splints', 'Energy, elephant artwork'],
  ['San Antonio 100-stick kitchen safety matchbox in navy and green, holding long splints with brown heads', 'San Antonio, 100 sticks'],
  ['Horse Safety Matches kitchen matchbox in red, standing open with long red-headed wooden splints', 'Horse Safety Matches'],
  ['San Antonio chlorate-free kitchen safety matchbox filled with long brown-headed wooden splints', 'San Antonio, chlorate free'],
  ['Kirana 220 Deluxe kitchen safety matchbox in red, filled with long red-headed wooden splints', 'Kirana 220 Deluxe'],
  ['Urban extra-strong kitchen safety matchbox in yellow, packed with red-headed 47mm splints', 'Urban extra strong'],
  ['Residence Fosforos Largos 240-unit kitchen matchbox, opened to show long green-headed splints', 'Residence, 240 units'],
  ['Urban super larga kitchen safety matchbox in yellow and red with long red-headed wooden splints', 'Urban super larga'],
  ['Residence Ecologico long kitchen safety matchbox in ochre, filled with green-headed wooden splints', 'Residence Ecologico'],
  ['Vicuna kitchen safety matchbox in yellow with a full-length side striker and red-headed long splints', 'Vicuna, full-length striker'],
  ['Chispita 240-unit kitchen matchbox marked mas largos y gruesos, filled with red-headed long splints', 'Chispita, 240 units'],
  ['El Pipila 200-stick kitchen safety matchbox with green-headed long wooden splints', 'El Pipila, 200 sticks'],
  ['El Pipila 240-stick kitchen safety matchbox made in Mexico, with green-headed long splints', 'El Pipila, 240 sticks'],
  ['Chispita kitchen safety matchbox standing open, packed with long red-headed wooden splints', 'Chispita, standing open']
];

const BARBEQUE = [
  ['Energy Clasicos 40-stick barbeque matchbox with blue elephant artwork and long red-headed splints', 'Energy Clasicos, 40 sticks'],
  ['Fireplace Matches box for indoor and outdoor use, with a bundle of long red-headed splints resting on top', 'Fireplace Matches bundle'],
  ['Urban large XXL 100 mm barbeque safety matchbox in yellow, filled with red-headed splints', 'Urban XXL 100 mm'],
  ['Urban longa 225 mm barbeque matchbox holding 50 splints, with one 225mm red-headed splint shown alongside', 'Urban longa 225 mm'],
  ['Energy long barbeque matchbox with blue elephant artwork, opened to show red-headed wooden splints', 'Energy, long box'],
  ['Alem do Horizonte scouting matchbox with campfire photography and long blue-headed splints', 'Alem do Horizonte']
];

const PROMOTIONAL = [
  ['Purple promotional matchbox with a scallop shell motif, standing open with purple-headed splints', 'Scallop shell, purple'],
  ['Vila Hotel promotional matchbox printed with the hotel logo, address and social handles, holding red-headed splints', 'Vila Hotel'],
  ['Bucherer Fine Jewellery navy promotional matchbox with long white-headed splints', 'Bucherer, navy'],
  ['Park Hyatt Sydney promotional matchbox in brown with gold foil lettering and white-headed splints', 'Park Hyatt Sydney'],
  ['Emerald Hotels and Resorts white promotional matchbox standing open with green-headed splints', 'Emerald Hotels & Resorts'],
  ['Hotels by Design promotional matchbox in white listing Goa, Dubai, Bali and Germany, with white-headed splints', 'Hotels by Design'],
  ['The Pub yellow promotional matchbox with a brown striker stripe and yellow-headed splints', 'The Pub'],
  ['Reethi Faru Resort Maldives promotional matchbox with blue line-drawn crest and blue-headed splints', 'Reethi Faru Resort crest'],
  ['Legends of Fire premium promotional matchbox in gold foil with an ornate oval label, shown closed', 'Legends of Fire, gold foil'],
  ['Amangiri promotional matchbox in sage green with gold foil lettering and brown-headed splints', 'Amangiri'],
  ['Reethi Faru Resort cream promotional matchbox with sunrise logo and white-headed splints', 'Reethi Faru Resort'],
  ['Paradise Island Resort Maldives maroon promotional matchboxes, one open with pink-headed splints', 'Paradise Island Resort'],
  ['Bucherer Fine Jewellery purple promotional matchbox with silver lettering and purple-headed splints', 'Bucherer, purple'],
  ['Conrad Maldives Rangali Island navy promotional matchbox with gold foil lettering and blue-headed splints', 'Conrad Maldives']
];

const RAW = {
  household: HOUSEHOLD,
  wax: WAX,
  kitchen: KITCHEN,
  barbeque: BARBEQUE,
  promotional: PROMOTIONAL
};

const FOLDERS = {
  household: { folder: 'household', prefix: 'household-match' },
  wax: { folder: 'wax', prefix: 'wax-match' },
  kitchen: { folder: 'kitchen', prefix: 'kitchen-match' },
  barbeque: { folder: 'barbeque', prefix: 'barbeque-match' },
  promotional: { folder: 'promotional', prefix: 'promotional-match' }
};

/** Alt text for the homepage hero carousel, keyed by image path. */
export const BANNER_ALT = {
  '/assets/images/hero/banner 1.webp':
    'Chispita 240-stick safety matchbox manufactured by Glovel Matches LLP, opened to show red-headed wooden splints',
  '/assets/images/hero/banner 2.webp':
    'Cerillito El Milagro moisture-proof wax matchbox by Glovel Matches LLP, opened to show paraffin splints with red heads',
  '/assets/images/hero/banner 3.webp':
    'Custom printed Vila Hotel promotional matchbox and matching information card manufactured by Glovel Matches LLP',
  '/assets/images/hero/banner 4.webp':
    'Fireplace Matches box by Glovel Matches LLP with a bundle of extra long red-headed wooden splints resting on top'
};

/** Gallery entries for one product id, in file order. */
export function galleryFor(productId) {
  const meta = FOLDERS[productId];
  const entries = RAW[productId];
  if (!meta || !entries) throw new Error(`No image alt data for product "${productId}"`);

  return entries.map(([alt, label], i) => ({
    src: `/assets/images/products/${meta.folder}/${meta.prefix}-${String(i + 1).padStart(2, '0')}.png`,
    alt,
    label
  }));
}

export const PRODUCT_IDS = Object.keys(FOLDERS);
