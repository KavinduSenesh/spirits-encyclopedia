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

export function getFeaturedBottles(count: number = 6): Bottle[] {
  const categories = data.categories;
  const featured: Bottle[] = [];

  for (const cat of categories) {
    if (featured.length >= count) break;
    const catBottles = data.bottles.filter((b) => b.categoryId === cat.id && hasImage(b));
    if (catBottles.length > 0) {
      featured.push(catBottles[0]);
    }
  }

  // Fill remaining slots if fewer categories than count
  if (featured.length < count) {
    const ids = new Set(featured.map((b) => b.id));
    const extras = data.bottles.filter((b) => hasImage(b) && !ids.has(b.id));
    for (const b of extras) {
      if (featured.length >= count) break;
      featured.push(b);
    }
  }

  return featured;
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
