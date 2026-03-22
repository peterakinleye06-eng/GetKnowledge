export const CBT_QUESTIONS = {
  WAEC: {
    Mathematics: [
      { q: "Simplify: 2³ × 2⁴", options: ["2⁷", "2¹²", "4⁷", "2⁶"], ans: 0, explanation: "When multiplying same bases, add exponents: 2³⁺⁴ = 2⁷" },
      { q: "Find the value of x if 3x + 7 = 22", options: ["3", "4", "5", "6"], ans: 2, explanation: "3x = 22 - 7 = 15, so x = 15 ÷ 3 = 5" },
      { q: "What is the LCM of 12 and 18?", options: ["6", "24", "36", "72"], ans: 2, explanation: "12 = 2²×3, 18 = 2×3². LCM = 2²×3² = 36" },
      { q: "A rectangle has length 8cm and breadth 5cm. Find its area.", options: ["13cm²", "26cm²", "40cm²", "80cm²"], ans: 2, explanation: "Area = length × breadth = 8 × 5 = 40cm²" },
      { q: "Evaluate: log₁₀(1000)", options: ["1", "2", "3", "4"], ans: 2, explanation: "log₁₀(1000) = log₁₀(10³) = 3" },
    ],
    English: [
      { q: "Choose the word closest in meaning to 'BENEVOLENT'", options: ["Cruel", "Kind", "Angry", "Lazy"], ans: 1, explanation: "Benevolent means well-meaning and kindly disposed toward others." },
      { q: "Identify the correct sentence:", options: ["She don't know the answer", "She doesn't knows the answer", "She doesn't know the answer", "She do not knows the answer"], ans: 2, explanation: "With third person singular (she/he/it), use 'doesn't' + base verb." },
      { q: "Which of these is a simile?", options: ["The stars are diamonds", "He ran like the wind", "The moon smiled", "Time is a thief"], ans: 1, explanation: "A simile uses 'like' or 'as' to compare. 'Ran like the wind' uses 'like'." },
    ],
    Biology: [
      { q: "Which organelle is known as the 'powerhouse of the cell'?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], ans: 2, explanation: "Mitochondria produce ATP through cellular respiration, powering the cell." },
      { q: "What is the process by which plants make food?", options: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"], ans: 1, explanation: "Photosynthesis uses sunlight, CO₂, and water to produce glucose and oxygen." },
      { q: "Osmosis is the movement of water from a region of:", options: ["Low concentration to high", "High concentration to low", "Low water potential to high", "High water potential to low"], ans: 3, explanation: "Water moves from high water potential (dilute) to low water potential (concentrated) through a semi-permeable membrane." },
    ],
  },
  JAMB: {
    Mathematics: [
      { q: "If f(x) = 2x² - 3x + 1, find f(2)", options: ["3", "5", "7", "9"], ans: 0, explanation: "f(2) = 2(4) - 3(2) + 1 = 8 - 6 + 1 = 3" },
      { q: "Solve: x² - 5x + 6 = 0", options: ["x = 2 or 3", "x = -2 or -3", "x = 1 or 6", "x = -1 or -6"], ans: 0, explanation: "Factor: (x-2)(x-3) = 0, so x = 2 or x = 3" },
    ],
    Chemistry: [
      { q: "What is the atomic number of Carbon?", options: ["4", "6", "8", "12"], ans: 1, explanation: "Carbon has 6 protons, so its atomic number is 6." },
      { q: "Which gas is produced when dilute HCl reacts with Zinc?", options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Chlorine"], ans: 2, explanation: "Zn + 2HCl → ZnCl₂ + H₂↑. Hydrogen gas is produced." },
    ],
    "English Language": [
      { q: "The plural of 'criterion' is:", options: ["Criterions", "Criterias", "Criteria", "Criteriones"], ans: 2, explanation: "Criterion is a Greek-origin word. Its plural is 'criteria'." },
      { q: "Choose the word that rhymes with 'FEAT'", options: ["Feet", "Fit", "Fat", "Fate"], ans: 0, explanation: "'Feat' and 'feet' both have the /iːt/ sound." },
    ],
  },
};

export const LIBRARY_TOPICS = [
  {
    id: 1, subject: "Mathematics", title: "Quadratic Equations", exam: "WAEC/JAMB", readTime: "8 min", color: "#00E5A0",
    content: `## Quadratic Equations\n\nA quadratic equation is any equation of the form: **ax² + bx + c = 0** where a ≠ 0.\n\n### Methods of Solving\n\n**1. Factorization**\nExample: x² - 5x + 6 = 0\n→ (x - 2)(x - 3) = 0\n→ x = 2 or x = 3\n\n**2. Quadratic Formula**\nx = (-b ± √(b² - 4ac)) / 2a\n\n### Key Terms\n- **Discriminant**: b² - 4ac\n  - If > 0: two real roots\n  - If = 0: one repeated root\n  - If < 0: no real roots\n\n### Exam Tips\n✓ Always set equation to zero first\n✓ Check your answer by substituting back\n✓ Remember the formula — examiners love it!`,
  },
  {
    id: 2, subject: "Biology", title: "Cell Structure & Function", exam: "WAEC", readTime: "10 min", color: "#FF6B35",
    content: `## Cell Structure & Function\n\nThe cell is the basic unit of life.\n\n### Key Organelles\n\n| Organelle | Function |\n|-----------|----------|\n| Nucleus | Controls cell activities, contains DNA |\n| Mitochondria | Produces ATP (energy) |\n| Ribosome | Protein synthesis |\n| Cell membrane | Controls what enters/leaves |\n| Chloroplast | Photosynthesis (plants only) |\n\n### Cell Division\n- **Mitosis**: Growth (2 identical daughter cells)\n- **Meiosis**: Reproduction (4 genetically unique cells)\n\n### WAEC Exam Focus Areas\n✓ Differences between plant and animal cells\n✓ Functions of each organelle\n✓ Osmosis and diffusion across cell membrane`,
  },
  {
    id: 3, subject: "Chemistry", title: "Chemical Bonding", exam: "JAMB", readTime: "12 min", color: "#7C5CBF",
    content: `## Chemical Bonding\n\n### 1. Ionic Bonding\n- Transfer of electrons between atoms\n- Forms between metals and non-metals\n- Example: NaCl (table salt)\n\n### 2. Covalent Bonding\n- Sharing of electrons between atoms\n- Example: H₂O, CO₂, CH₄\n\n**Types:**\n- Single bond: 1 shared pair\n- Double bond: 2 shared pairs\n- Triple bond: 3 shared pairs\n\n### Properties to Remember\n- Ionic: high melting point, conducts when dissolved\n- Covalent: low melting point, poor conductors\n\n✓ Electronegativity difference determines bond type\n✓ Polar vs non-polar covalent bonds`,
  },
  {
    id: 4, subject: "English", title: "Figures of Speech", exam: "WAEC/JAMB", readTime: "9 min", color: "#E91E8C",
    content: `## Figures of Speech\n\n**Simile** — Comparison using 'like' or 'as'\n> "He fought like a lion"\n\n**Metaphor** — Direct comparison (no like/as)\n> "Life is a journey"\n\n**Personification** — Giving human qualities to non-human things\n> "The sun smiled at us"\n\n**Hyperbole** — Extreme exaggeration\n> "I've told you a million times!"\n\n**Alliteration** — Repetition of consonant sounds\n> "Peter Piper picked a peck"\n\n**Oxymoron** — Two contradictory words together\n> "Deafening silence", "bitter sweet"\n\n### Exam Strategy\n✓ Identify the device, then explain WHY it's used\n✓ Always quote from the text\n✓ Discuss the EFFECT on the reader`,
  },
];

export const DAILY_CHALLENGES = [
  { question: "If 2x + 3 = 15, what is the value of 4x - 2?", options: ["20", "22", "24", "26"], ans: 1, subject: "Mathematics", difficulty: "Medium", explanation: "First: 2x = 12, so x = 6. Then: 4(6) - 2 = 24 - 2 = 22", points: 50 },
  { question: "Which of the following is NOT a function of the liver?", options: ["Production of bile", "Detoxification of alcohol", "Production of insulin", "Storage of glycogen"], ans: 2, subject: "Biology", difficulty: "Hard", explanation: "Insulin is produced by the pancreas (beta cells), not the liver.", points: 75 },
  { question: "The speed of light in vacuum is approximately:", options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10¹² m/s"], ans: 1, subject: "Physics", difficulty: "Easy", explanation: "The speed of light (c) = 3×10⁸ m/s or 300,000 km/s.", points: 25 },
];
