/**
 * Seed script — run with: npm run seed
 * Clears existing brands + perfumes, then inserts fresh demo data.
 * Replace `uri` values with real image URLs before using in production.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Brand from "./models/brand.model.js";
import Perfume from "./models/perfume.model.js";

dotenv.config();

const PLACEHOLDER = (name: string) =>
  `https://placehold.co/400x500/f6f1e7/9a5c0f?text=${encodeURIComponent(name)}`;

const brandData = [
  { brandName: "Chanel" },
  { brandName: "Dior" },
  { brandName: "Hermès" },
  { brandName: "Tom Ford" },
  { brandName: "Versace" },
  { brandName: "Yves Saint Laurent" },
];

type PerfumeInput = {
  perfumeName: string;
  uri: string;
  price: number;
  concentration: string;
  description: string;
  ingredients: string;
  volume: number;
  targetAudience: "male" | "female";
  brandKey: string;
};

const perfumeData: PerfumeInput[] = [
  // ── Chanel ────────────────────────────────────────────────
  {
    perfumeName: "Chanel No.5",
    uri: PLACEHOLDER("Chanel No.5"),
    price: 150,
    concentration: "EDP",
    description:
      "The iconic floral aldehyde fragrance that has defined elegance since 1921. A timeless symbol of femininity with powdery rose and jasmine over a warm sandalwood base.",
    ingredients: "Ylang-ylang, Rose, Jasmine, Sandalwood, Vetiver, Vanilla",
    volume: 100,
    targetAudience: "female",
    brandKey: "Chanel",
  },
  {
    perfumeName: "Bleu de Chanel",
    uri: PLACEHOLDER("Bleu de Chanel"),
    price: 135,
    concentration: "EDP",
    description:
      "A woody aromatic fragrance of rare strength and depth. Citrus and aromatic facets give way to a warm, woody base that evokes effortless freedom.",
    ingredients: "Grapefruit, Lemon, Mint, Labdanum, Sandalwood, Cedar, Vetiver",
    volume: 100,
    targetAudience: "male",
    brandKey: "Chanel",
  },
  {
    perfumeName: "Coco Mademoiselle",
    uri: PLACEHOLDER("Coco Mademoiselle"),
    price: 140,
    concentration: "EDP",
    description:
      "A bold, unexpected oriental fragrance with a zesty fresh start, a sensual floral heart and a powerful oriental trail.",
    ingredients: "Orange, Bergamot, Rose, Jasmine, Patchouli, Vetiver, Musk",
    volume: 100,
    targetAudience: "female",
    brandKey: "Chanel",
  },

  // ── Dior ──────────────────────────────────────────────────
  {
    perfumeName: "Sauvage",
    uri: PLACEHOLDER("Dior Sauvage"),
    price: 130,
    concentration: "EDP",
    description:
      "A radically fresh composition built on the contrast between a Reggio bergamot and a raw Ambroxan base. Wild and noble at once.",
    ingredients: "Bergamot, Pepper, Lavender, Ambroxan, Vetiver",
    volume: 100,
    targetAudience: "male",
    brandKey: "Dior",
  },
  {
    perfumeName: "Miss Dior",
    uri: PLACEHOLDER("Miss Dior"),
    price: 145,
    concentration: "EDP",
    description:
      "A declaration of love. Rose Centifolia from Grasse at its heart, wrapped in lively Mandarin and anchored by a warm Musk.",
    ingredients: "Mandarin, Peony, Rose Centifolia, Patchouli, Musk",
    volume: 100,
    targetAudience: "female",
    brandKey: "Dior",
  },
  {
    perfumeName: "J'adore",
    uri: PLACEHOLDER("Dior J'adore"),
    price: 138,
    concentration: "EDP",
    description:
      "An absolute femininity — a luminous floral bouquet where Rose de Grasse and Jasmine Grandiflorum shine over a warm Musk.",
    ingredients: "Pear, Rose de Grasse, Jasmine Grandiflorum, Ylang-ylang, Musk",
    volume: 100,
    targetAudience: "female",
    brandKey: "Dior",
  },

  // ── Hermès ────────────────────────────────────────────────
  {
    perfumeName: "Terre d'Hermès",
    uri: PLACEHOLDER("Terre d'Hermes"),
    price: 128,
    concentration: "EDT",
    description:
      "A narrative of the relationship between man and earth. Vibrant, contrasted, mineral and vegetal with grapefruit and pepper over Vetiver.",
    ingredients: "Grapefruit, Orange, Pepper, Flint, Vetiver, Benzoin",
    volume: 100,
    targetAudience: "male",
    brandKey: "Hermès",
  },
  {
    perfumeName: "Twilly d'Hermès",
    uri: PLACEHOLDER("Twilly d'Hermes"),
    price: 118,
    concentration: "EDP",
    description:
      "The playful and lively spirit of the Twilly scarf — a fresh, spirited and intoxicating fragrance of ginger, tuberose and sandalwood.",
    ingredients: "Ginger, Tuberose, Sandalwood",
    volume: 85,
    targetAudience: "female",
    brandKey: "Hermès",
  },

  // ── Tom Ford ──────────────────────────────────────────────
  {
    perfumeName: "Black Orchid",
    uri: PLACEHOLDER("TF Black Orchid"),
    price: 175,
    concentration: "EDP",
    description:
      "A luxurious and sensual fragrance of rich, dark accords and an alluring potion of black truffle, ylang-ylang and dark florals.",
    ingredients: "Truffle, Bergamot, Black Orchid, Spice, Dark Chocolate, Patchouli, Vetiver",
    volume: 100,
    targetAudience: "female",
    brandKey: "Tom Ford",
  },
  {
    perfumeName: "Oud Wood",
    uri: PLACEHOLDER("TF Oud Wood"),
    price: 195,
    concentration: "EDP",
    description:
      "Rare oud wood is blended with rosewood, cardamom and sandalwood creating an intoxicating and seductive signature.",
    ingredients: "Oud, Rosewood, Cardamom, Sandalwood, Vetiver, Amber",
    volume: 100,
    targetAudience: "male",
    brandKey: "Tom Ford",
  },

  // ── Versace ───────────────────────────────────────────────
  {
    perfumeName: "Eros",
    uri: PLACEHOLDER("Versace Eros"),
    price: 110,
    concentration: "EDT",
    description:
      "Inspired by the God of Love, a magnetic mix of Italian mint oil, green apple and tonka bean celebrates masculine strength and passion.",
    ingredients: "Mint, Apple, Lemon, Tonka Bean, Vanilla, Vetiver, Oakmoss",
    volume: 100,
    targetAudience: "male",
    brandKey: "Versace",
  },
  {
    perfumeName: "Crystal Noir",
    uri: PLACEHOLDER("Versace Crystal Noir"),
    price: 105,
    concentration: "EDP",
    description:
      "A sumptuous blend of spices, florals and exotic woods that creates a seductive and mysterious femininity.",
    ingredients: "Cardamom, Pepper, Ginger, Peony, Gardenia, Coconut, Sandalwood, Amber, Musk",
    volume: 90,
    targetAudience: "female",
    brandKey: "Versace",
  },

  // ── YSL ───────────────────────────────────────────────────
  {
    perfumeName: "Black Opium",
    uri: PLACEHOLDER("YSL Black Opium"),
    price: 125,
    concentration: "EDP",
    description:
      "Addictive and rock-chic — the hallmarks of Black Opium. An intoxicating blend of coffee, vanilla and white flowers.",
    ingredients: "Pink Pepper, Coffee, White Flowers, Vanilla, Patchouli, Cedarwood",
    volume: 90,
    targetAudience: "female",
    brandKey: "Yves Saint Laurent",
  },
  {
    perfumeName: "Y Eau de Parfum",
    uri: PLACEHOLDER("YSL Y EDP"),
    price: 120,
    concentration: "EDP",
    description:
      "A bold fresh scent that embodies the energy and dynamism of a new generation of men. Sage, bergamot and ginger over Fir Balsam.",
    ingredients: "Apple, Bergamot, Ginger, Sage, Fir Balsam, Suede, Amberwood",
    volume: 100,
    targetAudience: "male",
    brandKey: "Yves Saint Laurent",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB");

  // Clear existing data
  await Promise.all([Brand.deleteMany({}), Perfume.deleteMany({})]);
  console.log("Cleared existing brands and perfumes");

  // Insert brands
  const insertedBrands = await Brand.insertMany(brandData);
  const brandMap = Object.fromEntries(
    insertedBrands.map((b) => [b.brandName, b._id]),
  );
  console.log(`Inserted ${insertedBrands.length} brands`);

  // Insert perfumes
  const perfumes = perfumeData.map(({ brandKey, ...rest }) => ({
    ...rest,
    brand: brandMap[brandKey],
  }));
  const insertedPerfumes = await Perfume.insertMany(perfumes);
  console.log(`Inserted ${insertedPerfumes.length} perfumes`);

  await mongoose.disconnect();
  console.log("Done. Disconnected.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
