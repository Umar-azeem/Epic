// types.ts

export type Platform = "PC" | "PS" | "Xbox" | "Mobile" | "Switch";
export type GameStatus = "active" | "inactive" | "coming_soon" | "early_access";
export type PriceType = "paid" | "free" | "freemium";
export type SectionType = "A" | "B" | "C" | "D";
export type StarRating = 1 | 2 | 3 | 4 | 5;

export interface SysReqSpec {
  os: string;
  cpu: string;
  ram: string;
  gpu: string;
  storage: string;
  directX?: string;
  network?: string;
}

export interface SystemRequirements {
  minimum: SysReqSpec;
  recommended: SysReqSpec;
}

export interface Publisher {
  _id?: string;
  name: string;
  slug: string;
  developers: Record<string, unknown>;
  logo?: string;
  website?: string;
  country?: string;
  foundedYear?: number;
  createdAt?: Date;
}

export interface Genre {
  _id?: string;
  name: string;
  slug: string;
  icon?: string;
  createdAt?: Date;
}

export interface Review {
  _id?: string;
  gameId: string;
  userId: string;
  rating: StarRating;
  title?: string;
  body?: string;
  recommended: boolean;
  helpfulVotes: number;
  verifiedPurchase: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Add these missing fields to your Game type in types.ts
export interface Game {
  _id: string;
  slug: string;
  title: string;
  description: string;
  label: string;
  category: string;
  saleOfTheWeek: string;
  tag: string;
  priceText: string;
  image: string;
  coverImage: string;
  mainImage: string;
  screenshots: string[];
  price: number;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  availableDate: string;
  releaseDate: string;
  sectionType: string;
  sectionKey: string;
  priceType: string;
  status: string;
  platforms: string[];
  genres: string[];
  rating: number;
  viewMore: boolean;
  viewAll: boolean;
  featured: boolean;
  isFree: boolean;
  totalAvailable: boolean;
  gameType?: string;
  trialAvailable?: boolean;
  button: {
    enabled: boolean;
    text: string;
    type: string;
    style: string;
    link: string;
  };
  sysMin: {
    os: string;
    cpu: string;
    ram: string;
    gpu: string;
    storage: string;
    directX: string;
    network: string;
  };
  sysRec: {
    os: string;
    cpu: string;
    ram: string;
    gpu: string;
    storage: string;
    directX: string;
    network: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}