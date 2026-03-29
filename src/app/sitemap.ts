import type { MetadataRoute } from 'next';
import { getAllCategories, getBottlesByCategory } from '@/lib/data';

const BASE_URL = 'https://spirits-encyclopedia.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getAllCategories();
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  entries.push({
    url: `${BASE_URL}/en`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${BASE_URL}/en`,
        si: `${BASE_URL}/si`,
      },
    },
  });

  // Category pages
  for (const cat of categories) {
    entries.push({
      url: `${BASE_URL}/en/category/${cat.slug}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${BASE_URL}/en/category/${cat.slug}`,
          si: `${BASE_URL}/si/category/${cat.slug}`,
        },
      },
    });

    // Bottle pages
    const bottles = getBottlesByCategory(cat.id);
    for (const bottle of bottles) {
      entries.push({
        url: `${BASE_URL}/en/category/${cat.slug}/${bottle.slug}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${BASE_URL}/en/category/${cat.slug}/${bottle.slug}`,
            si: `${BASE_URL}/si/category/${cat.slug}/${bottle.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
