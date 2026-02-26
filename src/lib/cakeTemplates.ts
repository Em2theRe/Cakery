export type CakeShape =
  | "round"
  | "square"
  | "heart"
  | "star"
  | "oval"
  | "hex";

export type CakeTemplate = {
  id: string;
  name: string;
  description: string;
  basePrice: number; // Basispreis in €
  tiers: 1 | 2; // 1 oder 2 Etagen
  shapes: CakeShape[];

  sizes: { id: string; label: string; portions: number; priceAdd: number }[];
  flavors: { id: string; label: string; priceAdd: number }[];
  fillings: { id: string; label: string; priceAdd: number }[];
  colors: { id: string; label: string; hex: string; priceAdd: number }[];
  decorations: { id: string; label: string; priceAdd: number }[];
};

export const cakeTemplates: CakeTemplate[] = [
  {
    id: "classic-1tier",
    name: "Classic (1 Etage)",
    description: "Ein eleganter Klassiker - perfekt für Geburtstage & kleine Feiern.",
    basePrice: 25,
    tiers: 1,
    shapes: ["round", "square", "heart", "oval"],

    sizes: [
      { id: "s", label: "S (8-10 Stück)", portions: 10, priceAdd: 0 },
      { id: "m", label: "M (12-16 Stück)", portions: 16, priceAdd: 10 },
      { id: "l", label: "L (20-24 Stück)", portions: 24, priceAdd: 20 },
      { id: "Hamzah", label: "XL/Hamzah (80-90 Stück)", portions: 90, priceAdd: 385},
    ],

    flavors: [
        { id: "vanilla", label: "Vanille", priceAdd: 0 },
        { id: "choco", label: "Schokolade", priceAdd: 0 },
        { id: "lemon", label: "Zitrone", priceAdd: 2 },
        { id: "strawberry", label: "Erdbeer", priceAdd: 3 },
        { id: "salted-caramel", label: "Salted Caramel", priceAdd: 3 },
        { id: "cookies-cream", label: "Cookies & Cream (Oreo)", priceAdd: 4 },
        { id: "hazelnut", label: "Haselnuss", priceAdd: 4 },
        { id: "mocha", label: "Kaffee / Mokka", priceAdd: 3 },
        { id: "coconut", label: "Kokos", priceAdd: 3 },
        { id: "pistachio", label: "Pistazie", priceAdd: 5 },
        { id: "Ahmad", label: "Tripple A (Ahmad)", priceAdd: 199 },
      ],
      

    fillings: [
        { id: "vanilla", label: "Vanille", priceAdd: 2 },
        { id: "choco", label: "Schokolade", priceAdd: 2 },
        { id: "lemon", label: "Zitrone", priceAdd: 4 },
        { id: "strawberry", label: "Erdbeer", priceAdd: 4 },
        { id: "coconut", label: "Kokos", priceAdd: 6 },
        { id: "pistachio", label: "Pistazie", priceAdd: 6 },
        { id: "hazelnut", label: "Haselnuss", priceAdd: 6 },
        { id: "salted-caramel", label: "Salted Caramel", priceAdd: 8 },
        { id: "cookies-cream", label: "Cookies & Cream (Oreo)", priceAdd: 8 },
        { id: "mocha", label: "Kaffee / Mokka", priceAdd: 8 },
        { id: "spezial", label: "Emre's Geheimfüllung (Proteinreich)", priceAdd: 25 },
    ],

    colors: [
        { id: "white", label: "Weiß", hex: "#F7F7F7", priceAdd: 0 },
        { id: "cream", label: "Creme", hex: "#F3E6D6", priceAdd: 0 },
        { id: "vanilla", label: "Vanilla Bean", hex: "#F6E9C9", priceAdd: 1 },
        { id: "blush", label: "Blush", hex: "#F7C8D0", priceAdd: 1 },
        { id: "peach", label: "Peach", hex: "#F2C1A4", priceAdd: 1 },
        { id: "lavender", label: "Lavendel", hex: "#CBB7E9", priceAdd: 2 },
        { id: "mint", label: "Mint", hex: "#CFE9DF", priceAdd: 2 },
        { id: "sky", label: "Sky Blue", hex: "#CFE3F6", priceAdd: 2 },
        { id: "matcha", label: "Matcha", hex: "#BFD39B", priceAdd: 2 },
        { id: "berry", label: "Berry", hex: "#D79BB8", priceAdd: 2 },
        { id: "choco", label: "Schoko", hex: "#8B5E3C", priceAdd: 2 },
        { id: "black", label: "Black Cocoa", hex: "#2B1B16", priceAdd: 3 },
      ],
      

      decorations: [
        { id: "none", label: "Keine", priceAdd: 0 },
      
        // Klassiker
        { id: "sprinkles", label: "Streusel", priceAdd: 2 },
        { id: "berries", label: "Beeren", priceAdd: 4 },
        { id: "drip", label: "Schoko-Drip", priceAdd: 4 },
      
        // Sehr relevant / beliebt
        { id: "flowers", label: "Blumen (Buttercream)", priceAdd: 5 },
        { id: "gold", label: "Gold Akzent", priceAdd: 6 },
        { id: "topper", label: "Topper", priceAdd: 5 },
      
        // Moderne Styles
        { id: "naked", label: "Naked Style", priceAdd: 3 },
        { id: "ombre", label: "Ombre Verlauf", priceAdd: 4 },
        { id: "marble", label: "Marmor Look", priceAdd: 5 },
        { id: "ganache", label: "Ganache Glanz", priceAdd: 4 },
      ],
      
  },

  {
    id: "party-2tier",
    name: "Party (2 Etagen)",
    description: "Für große Momente - zwei Etagen, mehr Wow-Effekt.",
    basePrice: 55,
    tiers: 2,
    // 2 Etagen: mehr “Wow”-Formen
    shapes: ["round", "square", "heart", "star", "hex"],

    sizes: [
      { id: "m", label: "M (20-24 Stück)", portions: 24, priceAdd: 0 },
      { id: "l", label: "L (28-32 Stück)", portions: 32, priceAdd: 15 },
      { id: "xl", label: "XL (36-44 Stück)", portions: 44, priceAdd: 30 },
    ],

    flavors: [
        { id: "vanilla", label: "Vanille", priceAdd: 0 },
        { id: "choco", label: "Schokolade", priceAdd: 3 },
        { id: "lemon", label: "Zitrone", priceAdd: 3 },
        { id: "strawberry", label: "Erdbeer", priceAdd: 4 },
        { id: "salted-caramel", label: "Salted Caramel", priceAdd: 4 },
        { id: "cookies-cream", label: "Cookies & Cream (Oreo)", priceAdd: 5 },
        { id: "hazelnut", label: "Haselnuss", priceAdd: 5 },
        { id: "mocha", label: "Kaffee / Mokka", priceAdd: 4 },
        { id: "coconut", label: "Kokos", priceAdd: 4 },
        { id: "pistachio", label: "Pistazie", priceAdd: 6 },
      ],
    

    fillings: [
      { id: "strawberry", label: "Erdbeer", priceAdd: 3 },
      { id: "choco-cream", label: "Schoko-Creme", priceAdd: 4 },
      { id: "pistachio", label: "Pistazie", priceAdd: 6 },
    ],

    colors: [
        { id: "white", label: "Weiß", hex: "#F7F7F7", priceAdd: 0 },
        { id: "cream", label: "Creme", hex: "#F3E6D6", priceAdd: 0 },
        { id: "vanilla", label: "Vanilla Bean", hex: "#F6E9C9", priceAdd: 1 },
        { id: "blush", label: "Blush", hex: "#F7C8D0", priceAdd: 1 },
        { id: "peach", label: "Peach", hex: "#F2C1A4", priceAdd: 1 },
        { id: "lavender", label: "Lavendel", hex: "#CBB7E9", priceAdd: 2 },
        { id: "mint", label: "Mint", hex: "#CFE9DF", priceAdd: 2 },
        { id: "sky", label: "Sky Blue", hex: "#CFE3F6", priceAdd: 2 },
        { id: "matcha", label: "Matcha", hex: "#BFD39B", priceAdd: 2 },
        { id: "berry", label: "Berry", hex: "#D79BB8", priceAdd: 2 },
        { id: "choco", label: "Schoko", hex: "#8B5E3C", priceAdd: 2 },
        { id: "black", label: "Black Cocoa", hex: "#2B1B16", priceAdd: 3 },
      ],
      

    decorations: [
        { id: "none", label: "Keine", priceAdd: 0 },
      
        // Klassiker
        { id: "sprinkles", label: "Streusel", priceAdd: 2 },
        { id: "berries", label: "Beeren", priceAdd: 4 },
        { id: "drip", label: "Schoko-Drip", priceAdd: 4 },
      
        // Sehr relevant / beliebt
        { id: "flowers", label: "Blumen (Buttercream)", priceAdd: 5 },
        { id: "gold", label: "Gold Akzent", priceAdd: 6 },
        { id: "topper", label: "Topper", priceAdd: 5 },
      
        // Moderne Styles
        { id: "naked", label: "Naked Style", priceAdd: 3 },
        { id: "ombre", label: "Ombre Verlauf", priceAdd: 4 },
        { id: "marble", label: "Marmor Look", priceAdd: 5 },
        { id: "ganache", label: "Ganache Glanz", priceAdd: 4 },
      ],
      
  },
];
