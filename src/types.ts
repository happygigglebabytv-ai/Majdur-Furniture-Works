export type PriceType = 'fixed' | 'starting_from' | 'get_quote' | 'quote';

export type ProductStatus = 'published' | 'draft';

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  price?: number;
  startingPrice?: number;
  priceType: PriceType;
  material?: string;
  dimensions?: string;
  images: string[];
  videoUrl?: string;
  customizationInfo?: string;
  status: ProductStatus;
  published?: boolean;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: string[];
  description?: string;
  iconName?: string;
}

export type GalleryCategory =
  | 'Shop Front'
  | 'Shop Interior'
  | 'Workshop'
  | 'Beds'
  | 'Sofas'
  | 'Wardrobes'
  | 'Tables'
  | 'Chairs'
  | 'TV Units'
  | 'Dining Sets'
  | 'Furniture Making'
  | 'Wood Cutting'
  | 'Polishing'
  | 'Finishing'
  | 'Installation'
  | 'Other';

export type GalleryGroup = 'SHOP' | 'FURNITURE' | 'WORK PROCESS';

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: GalleryCategory;
  group: GalleryGroup;
  published: boolean;
  order: number;
  createdAt: string;
}

export type VideoCategory =
  | 'Furniture Making'
  | 'Workshop'
  | 'Finished Product'
  | 'Customer Installation'
  | 'Before / After'
  | 'Short Reels';

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category: VideoCategory;
  published: boolean;
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  reviewText: string;
  product?: string;
  date?: string;
  rating?: number;
  imageUrl?: string;
  photoUrl?: string;
  videoUrl?: string;
  published: boolean;
  createdAt: string;
}

export interface LogoSettings {
  imageUrl?: string;        // Path to uploaded logo e.g. /uploads/... or external/data URI
  altText?: string;         // Alt text e.g. "Majdur Furniture Works Logo"
  displayName?: string;     // e.g. "Majdur Furniture Works"
  showInHeader?: boolean;   // default true
  showInFooter?: boolean;   // default true
  showInMobile?: boolean;   // default true
  updatedAt?: string;
}

export interface BusinessSettings {
  businessName: string;
  logo?: LogoSettings;
  owners: string[];
  experienceYears: number;
  experience?: string;
  businessType: string;
  introduction: string;
  address: {
    street: string;
    landmark: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    country: string;
  };
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phoneNumbers: string[];
  whatsAppNumbers: {
    number: string;
    label: string;
    priority: number; // 1, 2, 3
  }[];
  alternativeNumbers: string[];
  email?: string; // Optional - hidden if empty
  openingHours: {
    days: string;
    hours: string;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  warrantyInfo?: string; // Optional - hidden if empty
  serviceInfo?: string;  // Optional - hidden if empty
  slogan: string;
  sloganSubtext: string;
  customFurnitureIntro: string;
  customFurnitureMessage: string;
  materialIntro: string;
  materialsList: {
    title: string;
    description: string;
    bestFor: string;
  }[];
  whyChooseUs: {
    title: string;
    description: string;
  }[];
  placeholders: {
    galleryText: string;
    videosText: string;
    reviewsText: string;
    noPriceText: string;
  };
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  salt: string;
}

export interface DatabaseSchema {
  business: BusinessSettings;
  products: Product[];
  categories: Category[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  reviews: CustomerReview[];
  admin: AdminUser;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  username?: string;
  message?: string;
}
