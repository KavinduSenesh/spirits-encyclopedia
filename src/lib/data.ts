import bottlesData from '../../data/bottles.json';

export interface BilingualText {
  en: string;
  si: string;
}

export interface Category {
  id: string;
  slug: string;
  name: BilingualText;
  description: BilingualText;
  image: string;
}

export interface Bottle {
  id: string;
  slug: string;
  categoryId: string;
  name: BilingualText;
  abv: string;
  origin: BilingualText;
  ingredients: BilingualText;
  productionMethod: BilingualText;
  history: BilingualText;
  image: string;
}

interface BottlesData {
  categories: Category[];
  bottles: Bottle[];
}

const data = bottlesData as BottlesData;

function hasImage(bottle: Bottle): boolean {
  return bottle.image !== '' && bottle.image.endsWith('.png');
}

export function getAllCategories(): Category[] {
  return data.categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return data.categories.find((c) => c.slug === slug);
}

export function getBottlesByCategory(categoryId: string): Bottle[] {
  return data.bottles.filter((b) => b.categoryId === categoryId && hasImage(b));
}

export function getBottleBySlug(slug: string): Bottle | undefined {
  return data.bottles.find((b) => b.slug === slug && hasImage(b));
}

export function getAllBottles(): Bottle[] {
  return data.bottles.filter(hasImage);
}

export function searchBottles(query: string, locale: 'en' | 'si'): Bottle[] {
  const lower = query.toLowerCase();
  return data.bottles.filter((b) =>
    hasImage(b) && b.name[locale].toLowerCase().includes(lower)
  );
}

export function getRelatedBottles(bottleId: string, limit: number = 3): Bottle[] {
  const bottle = data.bottles.find((b) => b.id === bottleId);
  if (!bottle) return [];

  const sameCategory = data.bottles.filter(
    (b) => b.categoryId === bottle.categoryId && b.id !== bottleId && hasImage(b)
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = data.bottles.filter(
    (b) => b.categoryId !== bottle.categoryId && b.id !== bottleId && hasImage(b)
  );

  return [...sameCategory, ...others].slice(0, limit);
}
