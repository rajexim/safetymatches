// Shared FAQ source: renders the on-page accordion AND the FAQPage JSON-LD, so
// the answer an AI engine cites is always the answer a human reads.

export const HOME_FAQS = [
  {
    q: 'What types of safety matches does Glovel Matches LLP manufacture and export?',
    a: 'Glovel Matches LLP manufactures a complete range of export-grade safety matches at our Sivakasi plant in Tamil Nadu, India. Our portfolio includes:\n• Household Safety Matches (Models 5S, 5E, 5H - 40mm & 42mm wooden splints)\n• Extra Long Kitchen Matches (KB 100 to KB 250 - 110mm splints for gas stoves & candles)\n• Moisture-Proof Wax Matches (WM, WSM, 5H - paraffin-treated paper sticks for humid climates)\n• Barbeque & Fireplace Matches (BBQ 96, 170, 280 - up to 280mm thick softwood sticks)\n• Custom Promotional & Hotel Matchbooks (BX-09 to BX-15 with metallic gold foil stamping & black splints).'
  },
  {
    q: 'Does Glovel Matches LLP make anything besides safety matches?',
    a: 'Yes. Glovel Matches LLP is part of the Glovel Group of Companies, which also manufactures and exports incense sticks and incense cones from our Tamil Nadu facilities. This site (safetymatches.in) covers our safety matches catalogue and specifications in full; our incense product range is presented at glovel.in.'
  },
  {
    q: 'Why are Glovel wax safety matches ideal for tropical and high-humidity climates?',
    a: 'Our wax matches feature premium kraft paper splints thoroughly impregnated with refined paraffin wax and chemical strike heads treated for moisture resistance. Unlike standard paper matches that soften in humid sea air, Glovel wax matches maintain rigidity and ignite smoothly even in coastal, rainy, or tropical environments across Africa, Latin America, and island nations.'
  },
  {
    q: 'What is the Minimum Order Quantity (MOQ) for international container shipments?',
    a: 'For standard wooden and wax safety matches, our standard export MOQ is 1 x 20FT FCL (Full Container Load), which typically holds 1,000 to 1,850 master cartons depending on matchbox size. For specialized promotional hotel matches and kitchen matchboxes, custom OEM runs start at 500 outer cartons or 10,000 custom units.'
  },
  {
    q: 'Can we customize the matchbox artwork, striker friction, and match head colors?',
    a: 'Yes, 100%. Glovel Matches LLP provides complete OEM private label manufacturing. Importers can customize cover board artwork (4-color wet offset printing, metallic gold/silver foil, spot UV), side striker coating (plain or dotted friction), splint material (natural poplar wood, paraffin kraft, or black dyed wood), and match head colors (red, black, brown, green, pink, or custom hex shades).'
  },
  {
    q: 'Which sea port is used for ocean freight dispatch from Sivakasi?',
    a: 'All international FCL container shipments are dispatched from V.O. Chidambaranar Port (Tuticorin VOC Port), located just 90 km from our Sivakasi manufacturing plant. This close proximity ensures rapid port stuffing, reduced inland transit times, and quick bill of lading (B/L) issuance.'
  },
  {
    q: 'What quality certifications and chemical compliance standards do your matches meet?',
    a: 'Glovel Matches LLP is ISO 9001:2015 certified and a registered member of CAPEXIL (Chemicals and Allied Products Export Promotion Council, Govt. of India). Our matchsticks strictly adhere to Bureau of Indian Standards (IS 2653) and European REACH chemical safety regulations—ensuring zero afterglow, lead-free composition, and non-toxic combustion.'
  },
  {
    q: 'How are matches packed to prevent damage during long ocean voyages?',
    a: 'Safety matches are packed in multi-tier moisture-barrier packaging. Matchboxes are first bundled into polypacks or caddy boxes, wrapped in heavy-duty shrink film, and packed into 3-ply or 5-ply corrugated master cartons. Outer cartons are palletized and container-sealed to resist dampness during sea transit.'
  },
  {
    q: 'How can international buyers request physical sample kits and factory price quotes?',
    a: 'You can request a free physical sample kit and CIF/FOB pricing by contacting our export desk directly via email at sales@glovel.in, WhatsApp at +91 99525 38046, or phone at +91 99525 38046. Sample boxes can be shipped via express courier to your destination address.'
  }
];

// Product-page FAQs. Keyed by route so each product page carries its own
// FAQPage entity instead of every page repeating the homepage's questions.
export const PRODUCT_FAQS = {
  '/household-matches': [
    {
      q: 'What splint and box sizes are available for Glovel household safety matches?',
      a: 'Glovel household safety matches ship in three standard models: 5S (49 x 35 x 12 mm box, 40 x 2 x 2 mm poplar splint), 5E (51 x 35 x 14 mm box, 42 x 2 x 2 mm splint) and 5H (52 x 35 x 12 mm box, 42 x 2 x 2 mm splint). Every model averages 40 sticks per box on white duplex board with plain or dotted side friction.'
    },
    {
      q: 'How many cartons of household matches fit in a 20FT and 40FT HC container?',
      a: 'Each master carton holds 1,000 matchboxes (10 poly packs x 10 shrink wraps). A 20FT FCL loads 1,200 cartons of 5S, 1,000 cartons of 5E or 1,100 cartons of 5H. A 40FT High Cube loads 2,850 / 2,375 / 2,600 cartons respectively.'
    },
    {
      q: 'Can household matchboxes be printed with an importer’s own brand?',
      a: 'Yes. Household boxes are supplied as full OEM private label: your own cover artwork in 4-colour wet offset, your choice of match head colour (black, brown, red or green), plain or dotted striker friction, and custom-printed outer shipping cartons.'
    }
  ],
  '/wax-matches': [
    {
      q: 'What makes wax matches better than wooden matches in humid climates?',
      a: 'Wax match splints are kraft paper impregnated with refined paraffin wax, so the stick cannot absorb atmospheric moisture the way bare wood does. The head chemistry is also treated for damp resistance. This is why wax matches are the highest-volume match type in coastal West Africa, Central America and island markets.'
    },
    {
      q: 'What wax match models and container loads does Glovel export?',
      a: 'Glovel exports four wax models: WM (40 x 33 x 12 mm, 32 mm splint, 1,500 cartons per 20FT), WSM (43 x 30 x 10 mm, 30 mm splint, 1,800 cartons per 20FT), 5H (53 x 37 x 11 mm, 35 mm splint, 1,850 cartons per 20FT) and a Wax Kitchen box (70 x 48 x 22 mm, approx. 200 sticks, 4,000 cartons per 20FT).'
    }
  ],
  '/kitchen-matches': [
    {
      q: 'How long are the splints in Glovel extra long kitchen matches?',
      a: 'Kitchen match splints run 47 mm to 53 mm, sitting in boxes from 71 x 53 x 25 mm (KB 100) up to 118 x 65 x 25 mm (KB 240 / KB 250). The extra length keeps hands clear of the flame when lighting gas stoves, deep oven burners and tall candles.'
    },
    {
      q: 'How many sticks come in a kitchen matchbox?',
      a: 'Standard fills are 100, 200, 240 and 250 match sticks per box. Head colours available are black, red, blue, brown and green, and every box carries a high-friction side striker.'
    }
  ],
  '/barbeque-matches': [
    {
      q: 'How long are Glovel barbeque and fireplace matches?',
      a: 'Three lengths are produced: BBQ 96 (96 x 3 x 3 mm splint in a 110 x 65 x 20 mm box, 50 sticks), BBQ 170 (170 x 3 x 3 mm splint in a 182 x 63.5 x 18 mm box, 50 sticks) and BBQ 280 (280 x 3 x 3 mm splint in a 290 x 60 x 29 mm box, 40 sticks).'
    },
    {
      q: 'Are barbeque matches suitable for charcoal grills and log fireplaces?',
      a: 'Yes. The 3 x 3 mm softwood splint is thick enough to resist snapping and gives an extended, wind-resistant burn, which is what charcoal briquettes, log fires and camping fire pits need. Striker panels are damp-proofed for outdoor use.'
    }
  ],
  '/promotional-matches': [
    {
      q: 'What customisation is available on promotional and hotel matchboxes?',
      a: 'Cover artwork is printed in 4-colour wet offset on 300 GSM art board with optional metallic gold or silver foil stamping, spot UV and soft-touch matte lamination. Splints can be natural poplar or black dyed wood, and match heads are produced in any custom hex shade.'
    },
    {
      q: 'What sizes and stick counts do promotional matchboxes come in?',
      a: 'Standard promotional formats are BX-09 (112 x 26 x 9 mm, 12 sticks), BX-10 (112 x 17.5 x 17.5 mm, 15 sticks), BX-13 / BX-14 (84 mm boxes, 15 sticks) and BX-15 (84 x 26.5 x 9 mm, 12 sticks), all on 96 mm or 80 mm splints. Matchbooks are available in 10, 20 and 30 strikes.'
    }
  ]
};
