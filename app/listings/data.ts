export type Listing = {
  id: string;
  title: string;
  image: string;
  stock: number;
  price: string;
  renewDate: string;
  badge?: "Digital" | "Video";
  hasVideo?: boolean;
  visits30: number;
  favorites30: number;
  sales: number;
  revenue: string;
  renewals: number;
  featured: boolean;
};

export const listings: Listing[] = [
  {
    id: "1863021547",
    title:
      "Wooden USA Travel Map Tracker – Retirement Gift for Travelers – 50 States Map Bucket List - Wooden Puzzle Map – Travel Tracker – RV Adventures",
    image: "/products/wooden-map.jpg",
    stock: 99,
    price: "$55.99",
    renewDate: "Nov 16, 2026",
    visits30: 6,
    favorites30: 0,
    sales: 1,
    revenue: "$55.99",
    renewals: 1,
    featured: true,
  },
  {
    id: "1863020193",
    title:
      "World Cup 2026 USA Canada Mexico PNG, Soccer Trophy Sublimation Design, Football Fan Shirt Digital Download",
    image: "/products/world-cup.jpg",
    stock: 183,
    price: "$4.49",
    renewDate: "Nov 16, 2026",
    badge: "Digital",
    hasVideo: true,
    visits30: 40,
    favorites30: 3,
    sales: 117,
    revenue: "$525.33",
    renewals: 117,
    featured: true,
  },
  {
    id: "1862984751",
    title:
      "Pink Feather Fascinator Headband for Women, Tea Party Wedding Derby Cocktail Hair Accessory",
    image: "/products/pink-fascinator.jpg",
    stock: 195,
    price: "$30.99 - $35.99",
    renewDate: "Nov 15, 2026",
    visits30: 79,
    favorites30: 5,
    sales: 5,
    revenue: "$156.95",
    renewals: 5,
    featured: true,
  },
  {
    id: "1862879340",
    title:
      "Rainbow Dragonfly Sublimation Design PNG, Watercolor Butterfly Floral Shirt Design, Digital Download",
    image: "/products/dragonfly-shirt.jpg",
    stock: 300,
    price: "$4.49",
    renewDate: "Nov 13, 2026",
    badge: "Digital",
    visits30: 0,
    favorites30: 0,
    sales: 0,
    revenue: "$0.00",
    renewals: 0,
    featured: false,
  },
  {
    id: "1862877126",
    title:
      "Floral Highland Cow PNG, Coquette Sunflower Cow Sublimation Design, Western Shirt Digital Download",
    image: "/products/highland-cow.jpg",
    stock: 300,
    price: "$4.49",
    renewDate: "Nov 13, 2026",
    badge: "Digital",
    visits30: 0,
    favorites30: 0,
    sales: 0,
    revenue: "$0.00",
    renewals: 0,
    featured: false,
  },
  {
    id: "1862791502",
    title:
      "Fascinator Hat for Women-Kentucky Derby Tea Party Wedding Cocktail Flower Mesh Feather Headband",
    image: "/products/derby-fascinator.jpg",
    stock: 99,
    price: "$27.99",
    renewDate: "Nov 12, 2026",
    visits30: 12,
    favorites30: 1,
    sales: 3,
    revenue: "$83.97",
    renewals: 3,
    featured: false,
  },
  {
    id: "1862714985",
    title:
      "Hit The Dang Ball Baseball PNG, Game Day Sublimation Design, Baseball Mom Shirt Digital Download",
    image: "/products/baseball-towel.jpg",
    stock: 500,
    price: "$4.99",
    renewDate: "Nov 11, 2026",
    badge: "Digital",
    visits30: 25,
    favorites30: 2,
    sales: 14,
    revenue: "$69.86",
    renewals: 14,
    featured: false,
  },
  {
    id: "1862713310",
    title:
      "Floral Bunny Patchwork PNG, Retro Easter Sublimation Design, Pastel Rabbit Shirt Digital Download",
    image: "/products/bunny-patchwork.jpg",
    stock: 500,
    price: "$4.99",
    renewDate: "Nov 11, 2026",
    badge: "Digital",
    visits30: 8,
    favorites30: 1,
    sales: 6,
    revenue: "$29.94",
    renewals: 6,
    featured: false,
  },
  {
    id: "1862650874",
    title:
      "DRESHOW Fascinators Hat Flower Mesh Feathers Tea Party Headwear for Women, Wedding Cocktail Hair Clip",
    image: "/products/black-fascinator.jpg",
    stock: 100,
    price: "$16.99 - $20.99",
    renewDate: "Nov 10, 2026",
    visits30: 31,
    favorites30: 4,
    sales: 9,
    revenue: "$167.91",
    renewals: 9,
    featured: false,
  },
  {
    id: "1862577429",
    title:
      "Graduation Cap Candy Toppers, Gold Tassel Class of 2026 Party Favors, Chocolate Graduation Decorations",
    image: "/products/graduation-candy.jpg",
    stock: 99,
    price: "$2.50 - $39.99",
    renewDate: "Nov 9, 2026",
    badge: "Video",
    hasVideo: true,
    visits30: 44,
    favorites30: 6,
    sales: 21,
    revenue: "$138.60",
    renewals: 21,
    featured: false,
  },
];
