interface Game {
  _id: string;
  title: string;
  slug: string;
  description: string;
  label: string;
  category: string;
  saleOfTheWeek: string;
  tag: string;
  priceText: string;
  image: string;
  coverImage: string | null;
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
  status: "active" | "early_access" | "inactive";
  platforms: string[];
  genres: string[];
  rating: number;
  viewMore: boolean;
  viewAll: boolean;
  featured: boolean;
  isFree: boolean;
  totalAvailable: boolean;
  button?: {
    enabled: boolean;
    text: string;
    type: string;
    style: string;
    link: string;
  };
  sysMin?: {
    os: string;
    cpu: string;
    ram: string;
    gpu: string;
    storage: string;
    directX: string;
    network: string;
  };
  sysRec?: {
    os: string;
    cpu: string;
    ram: string;
    gpu: string;
    storage: string;
    directX: string;
    network: string;
  };
}