import { getCollection } from 'astro:content';

export const CATEGORY_META = {
  all:     { label: "全部",     dot: "var(--ink)" },
  food:    { label: "食品蔬果", dot: "var(--cat-food)" },
  craft:   { label: "手作",     dot: "var(--cat-craft)" },
  tribe:   { label: "部落",     dot: "var(--cat-tribe)" },
  weekday: { label: "週間攤車", dot: "var(--cat-weekday)" },
};

// 讀出所有品牌，轉成一般 plain object（含 markdown body 當作 about 純文字）。
export async function getBrands() {
  const entries = await getCollection('brands');
  return entries.map((entry) => ({
    ...entry.data,
    about: entry.body.trim(),
  }));
}

export function brandsAtStation(brands, key) {
  return brands.filter((b) => (b.stations || []).includes(key));
}
