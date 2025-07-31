const URL = "https://www.trexthailand.org";
const collections = [
  {
    title: "horticultural",
    products: [
      "super-mix",
      "mega-kelp",
      "t-rex-bloom-booster",
      "t-rex-grow",
      "t-rex-bloom",
      "t-rex-shield",
      "compost-tea-trio-set",
      "t-rex-dino-serum",
      "clover",
      "alfalfa",
      "earthworms",
    ]
  },
  {
    title: "buds-concentrates-seeds",
    products: [
      "roberts-mintz",
      "samwise-rise-16",
      "roberts-mint-f1-2",
      "dreadnought-og",
      "obi-wan-og",
      "roberts-mint-8",
      "roberts-mint-f1-21",
      "roberts-mint-f1",
      "samwise-rise"
    ]
  },
  {
    title: "merchandise",
    products: [
      "trichome-monster-t-shirt",
      "trichome-monster-playmat",
      "t-rex-lanyards"
    ]
  },
  {
    title: "growing-supplies",
    products: [
      "super-mix",
      "t-rex-bloom-booster",
      "mega-kelp",
      "t-rex-grow",
      "t-rex-bloom",
      "t-rex-shield",
      "compost-tea-trio-set",
      "t-rex-dino-serum",
      "clover",
      "alfalfa"
    ]
  }
]
const howTo = [
  "183782471",
  "183782360",
  "187328787",
  "187328797",
  "187328800",
  "187328807",
  "187328808",
  "187328809",
  "187328821",
  "187328822",
  "187328824",
  "187328825",
  "187328830",
  "187328834",
  "187328841",
  "187328855",
  "187328960",
  "183782472",
  "182273603",
  "185388369",
  "181576142",
]
const static_routes = ['about-us', 'collection', 'contact-us', 'dealers', 'event', 'how-to']

export default async function sitemap() {
  const mappedRoutes = [];

  mappedRoutes.push({
    url: `${URL}/en`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  })

  mappedRoutes.push({
    url: `${URL}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  })

  const localeRoutes = static_routes.map(route => ({
    url: `${URL}/en/${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const howToRoutes = howTo.map(route => ({
    url: `${URL}/en/how-to/${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5
  }))
  
  mappedRoutes.push(...howToRoutes);
  mappedRoutes.push(...localeRoutes);
  
  for (const route of collections) {
    mappedRoutes.push({
      url: `${URL}/en/collection/${route.title}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    });

    for (const product of route.products) {
      mappedRoutes.push({
        url: `${URL}/en/collection/${route.title}/product/${product}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8
      });
    }
  }

  return [...mappedRoutes]
}
