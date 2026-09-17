import fs from 'fs';
import path from 'path';
import { DatabaseSchema, Category, Product } from '../src/types';
import { hashPassword } from './auth';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'bedroom',
    name: 'BEDROOM',
    slug: 'bedroom',
    description: 'Beds, wardrobes, storage beds, dressing tables and side units customized to your room dimensions.',
    iconName: 'Bed',
    subcategories: [
      'Bed',
      'Double Bed',
      'Single Bed',
      'Storage Bed',
      'Dressing Table',
      'Bedside Table',
      'Wardrobe',
    ],
  },
  {
    id: 'living-room',
    name: 'LIVING ROOM',
    slug: 'living-room',
    description: 'Comfortable sofa sets, center tables, modern TV units and accent chairs built to last.',
    iconName: 'Sofa',
    subcategories: [
      'Sofa',
      'Sofa Set',
      'Center Table',
      'TV Unit',
      'Chairs',
    ],
  },
  {
    id: 'dining',
    name: 'DINING',
    slug: 'dining',
    description: 'Solid dining tables, comfortable dining chairs and complete dining sets for family gatherings.',
    iconName: 'Utensils',
    subcategories: [
      'Dining Table',
      'Dining Chairs',
      'Complete Dining Set',
    ],
  },
  {
    id: 'study-office',
    name: 'STUDY / OFFICE',
    slug: 'study-office',
    description: 'Ergonomic study tables, robust office desks, conference tables and durable wooden bookshelves.',
    iconName: 'BookOpen',
    subcategories: [
      'Study Table',
      'Office Table',
      'Office Chair',
      'Bookshelf',
    ],
  },
  {
    id: 'custom-other',
    name: 'CUSTOM / OTHER',
    slug: 'custom-other',
    description: 'Bespoke wooden partitions, prayer units (mandir), custom shoe racks, and special woodworking orders.',
    iconName: 'Sparkles',
    subcategories: [
      'Custom Almirah',
      'Temple Unit',
      'Wooden Partition',
      'Shoe Rack',
      'Bespoke Project',
    ],
  },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-bed-01',
    name: 'Solid Wood Double Storage Bed',
    category: 'BEDROOM',
    subcategory: 'Storage Bed',
    description: 'Heavy-duty master double bed with spacious hydraulic or drawer storage underneath. Built for everyday Indian family durability with reinforced corner frames.',
    priceType: 'get_quote',
    material: 'Commercial / Marine Plywood & Teak / Sheesham finish as requested',
    dimensions: 'King Size (6x6.5 ft) or Queen Size (5x6.5 ft) customizable',
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80'],
    customizationInfo: 'Headboard cushioning, hydraulic lift mechanism, and polish shade customizable as per customer room requirement.',
    status: 'published',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-sofa-01',
    name: 'Handcrafted Wooden Frame Sofa Set (3+1+1)',
    category: 'LIVING ROOM',
    subcategory: 'Sofa Set',
    description: 'Robust seasoned wood framework paired with high-density premium foam cushioning and custom selected upholstery fabric.',
    priceType: 'get_quote',
    material: 'Seasoned Wood Frame + High Density Foam + Washable Fabric',
    dimensions: 'Standard 5-seater configuration (custom sizing available)',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80'],
    customizationInfo: 'Seating layout (L-shape, 3+2, 3+1+1), fabric color, and armrest wooden carving customized to your choice.',
    status: 'published',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-wardrobe-01',
    name: 'Custom Multi-Door Bedroom Wardrobe',
    category: 'BEDROOM',
    subcategory: 'Wardrobe',
    description: 'Spacious wardrobe with dedicated hanging racks, internal lockable locker drawers, and upper loft storage tailored to wall heights.',
    priceType: 'get_quote',
    material: 'Plywood with premium laminate or polish veneer',
    dimensions: 'Floor-to-ceiling (e.g. 7x6 ft or custom wall width)',
    images: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=80'],
    customizationInfo: 'Inner shelving partition, mirror integration, and door handles customized according to your storage requirement.',
    status: 'published',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-dining-01',
    name: '6-Seater Solid Wood Dining Table Set',
    category: 'DINING',
    subcategory: 'Complete Dining Set',
    description: 'Solid dining table with 6 comfortably cushioned ergonomic chairs. Hand-finished with durable heat and moisture resistant wood polish.',
    priceType: 'get_quote',
    material: 'Solid Wood / Teak frame with cushioned seating',
    dimensions: '5x3 ft table top with standard chair clearance',
    images: ['https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop&q=80'],
    customizationInfo: '4-seater or 6-seater options, glass-top groove support, and fabric pattern can be customized.',
    status: 'published',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-study-01',
    name: 'Executive Office & Study Desk with Storage',
    category: 'STUDY / OFFICE',
    subcategory: 'Office Table',
    description: 'Sturdy executive wooden workstation with smooth drawer slides, cable management grommet, and side CPU/book cabinet.',
    priceType: 'get_quote',
    material: 'High durability board / Plywood with scratch-resistant laminate',
    dimensions: '4.5x2.5 ft or custom space fit',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80'],
    customizationInfo: 'Drawer locks, keyboard tray, and custom shelf height.',
    status: 'published',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-tv-01',
    name: 'Contemporary Wall-Mounted Living Room TV Unit',
    category: 'LIVING ROOM',
    subcategory: 'TV Unit',
    description: 'Modern entertainment console with concealed wiring channels, display floating shelves, and storage drawers for set-top boxes and decor.',
    priceType: 'get_quote',
    material: 'Waterproof Plywood with modern matte/gloss laminate',
    dimensions: '6 ft wide x 5 ft height panel (customizable)',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'],
    customizationInfo: 'Backdrop louvers, ambient LED groove, and drawer configuration tailored to your TV display size.',
    status: 'published',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function getInitialDatabase(): DatabaseSchema {
  const adminPass = hashPassword('majdur@123');

  return {
    business: {
      businessName: 'Majdur Furniture Works',
      logo: {
        imageUrl: '',
        altText: 'Majdur Furniture Works',
        displayName: 'Majdur Furniture Works',
        showInHeader: true,
        showInFooter: true,
        showInMobile: true,
      },
      owners: ['Munawar Hussain', 'Salahuddin Sahab'],
      experienceYears: 20,
      businessType: 'Custom Furniture Manufacturer / Furniture Works',
      introduction:
        'Majdur Furniture Works is an established furniture workshop and manufacturing showroom in Motihari with over 20 years of hands-on experience. Founded and operated by Munawar Hussain and Salahuddin Sahab, our workshop is dedicated to crafting durable, practical, and aesthetically pleasing furniture tailored to the precise requirements of homes and businesses in Motihari and neighboring regions of East Champaran. Whether you need reliable ready designs or bespoke custom-built wooden furniture made to your exact room dimensions and design preferences, we bring decades of honest craftsmanship to every piece.',
      address: {
        street: 'Janpul, Near Smart Bazaar',
        landmark: 'Near Smart Bazaar',
        city: 'Motihari',
        district: 'East Champaran',
        state: 'Bihar',
        pincode: '845401',
        country: 'India',
      },
      googleMapsUrl:
        'https://www.google.com/maps/place/Majdoor+Furniture+Works/@26.6655977,84.9109871,17z/data=!3m1!4b1!4m6!3m5!1s0x3993351be50ff86b:0x22c7bb5f9e188563!8m2!3d26.6655929!4d84.913562!16s%2Fg%2F11gfk1b4hf?entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D',
      coordinates: {
        lat: 26.6655929,
        lng: 84.913562,
      },
      phoneNumbers: ['8292036802', '8789414357', '9973740499'],
      whatsAppNumbers: [
        { number: '8292036802', label: 'Primary Contact (Munawar Hussain)', priority: 1 },
        { number: '8789414357', label: 'Salahuddin Sahab', priority: 2 },
        { number: '9973740499', label: 'Workshop & Custom Inquiries', priority: 3 },
      ],
      alternativeNumbers: ['9973740499', '7261834808'],
      email: '', // Not available yet; editable by admin
      openingHours: {
        days: 'Monday – Sunday',
        hours: '9:00 AM – 8:00 PM',
      },
      socialMedia: {
        instagram: '',
        facebook: '',
        youtube: '',
      },
      warrantyInfo: '',
      serviceInfo: '',
      slogan: 'Apni Zaroorat, Apna Design — Furniture Apne Andaaz Mein.',
      sloganSubtext:
        '20+ saal ke anubhav ke saath Majdur Furniture Works mein aapki zaroorat, space, design aur budget ke according furniture tayyar kiya jata hai.',
      customFurnitureIntro:
        'Jo kuchh banwana hai, aap batayiye — hum aapki zaroorat ke hisaab se banane ki koshish karte hain.',
      customFurnitureMessage:
        'Apna design bhejiye, size batayiye, aur apne space aur zaroorat ke according furniture ke baare mein humse baat kijiye. Customer reference photo, specific room dimensions aur budget ke hisaab se poori tarah custom furniture tayyar kiya jata hai.',
      materialIntro:
        'Furniture ke liye material aur wood ka selection customer ki requirement, design, use aur budget ke according discuss kiya ja sakta hai. Agar customer ko material select karne ki jankari na ho, to furniture ki zaroorat aur budget ke hisaab se suitable material choose karne mein guidance di ja sakti hai.',
      materialsList: [
        {
          title: 'Solid Teak Wood (Saagwan)',
          description: 'Renowned for natural grain patterns, high density, and long-term durability. Ideal for main beds, front sofa frames, and dining sets.',
          bestFor: 'Beds, Dining Sets, Carved Accents',
        },
        {
          title: 'Sheesham (Indian Rosewood)',
          description: 'Strong, pest-resistant hardwood with rich natural deep tones. Excellent structural rigidity for long-lasting home furniture.',
          bestFor: 'Tables, Sturdy Chairs, Double Beds',
        },
        {
          title: 'Calibrated Commercial & Marine Plywood',
          description: 'Engineered multi-layer plywood providing uniform thickness and superior moisture tolerance. Prevents warping in humid climate.',
          bestFor: 'Modular Wardrobes, Storage Beds, Kitchen/Storage Cabinets',
        },
        {
          title: 'HDHMR & Premium Laminates',
          description: 'High Density High Moisture Resistant core boards finished with scratch-resistant decorative laminates or acrylic textures.',
          bestFor: 'TV Units, Dressing Tables, Office Desks',
        },
      ],
      whyChooseUs: [
        {
          title: '20+ Years of Craftsmanship',
          description: 'Two decades of proven woodworking experience serving families and commercial establishments across Motihari.',
        },
        {
          title: 'Custom-Fit to Your Space',
          description: 'Furniture fabricated specifically to your room measurements so there is no wasted floor space.',
        },
        {
          title: 'Customer Requirement-Based',
          description: 'You share your preferred layout, photos, or Pinterest inspiration; we work together to bring it into reality.',
        },
        {
          title: 'Material & Wood Guidance',
          description: 'Honest consultation on selecting the most appropriate wood or board suited to your usage and budget.',
        },
        {
          title: 'Direct WhatsApp Consultation',
          description: 'Speak directly with Munawar Hussain and Salahuddin Sahab without middlemen or corporate delays.',
        },
        {
          title: 'Local Motihari Workshop',
          description: 'Conveniently located at Janpul near Smart Bazaar. Visit our workshop to inspect in-progress work anytime.',
        },
      ],
      placeholders: {
        galleryText: 'Real workshop aur furniture photos yahan admin ke dwara add ki jayengi.',
        videosText: 'Furniture making aur workshop ke original videos jald yahan dekhein.',
        reviewsText: 'Customer feedback yahan admin ke dwara add kiya jayega.',
        noPriceText: 'Price ke liye WhatsApp karein',
      },
    },
    products: INITIAL_PRODUCTS,
    categories: INITIAL_CATEGORIES,
    gallery: [], // Authentic empty state for real photos uploaded by admin
    videos: [], // Clean placeholder
    reviews: [], // Authentic empty state
    admin: {
      id: 'admin-01',
      username: 'Admin',
      passwordHash: adminPass.hash,
      salt: adminPass.salt,
    },
  };
}

class Database {
  private data: DatabaseSchema;

  constructor() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(fileContent);
        // Ensure default username is exactly 'Admin'
        if (!this.data.admin || this.data.admin.username !== 'Admin') {
          const defaultCreds = hashPassword('majdur@123');
          this.data.admin = {
            id: 'admin-01',
            username: 'Admin',
            passwordHash: defaultCreds.hash,
            salt: defaultCreds.salt,
          };
          this.save();
        }

        // Ensure business.logo exists
        if (!this.data.business.logo) {
          this.data.business.logo = {
            imageUrl: '',
            altText: 'Majdur Furniture Works',
            displayName: 'Majdur Furniture Works',
            showInHeader: true,
            showInFooter: true,
            showInMobile: true,
          };
          this.save();
        }
      } catch (err) {
        console.error('Error reading db.json, falling back to initial data', err);
        this.data = getInitialDatabase();
        this.save();
      }
    } else {
      this.data = getInitialDatabase();
      this.save();
    }
  }

  public save(): void {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save database file:', err);
    }
  }

  public getBusiness(): DatabaseSchema['business'] {
    return this.data.business;
  }

  public updateBusiness(newBusiness: Partial<DatabaseSchema['business']>): DatabaseSchema['business'] {
    this.data.business = {
      ...this.data.business,
      ...newBusiness,
    };
    this.save();
    return this.data.business;
  }

  public getLogo(): NonNullable<DatabaseSchema['business']['logo']> {
    if (!this.data.business.logo) {
      this.data.business.logo = {
        imageUrl: '',
        altText: 'Majdur Furniture Works',
        displayName: 'Majdur Furniture Works',
        showInHeader: true,
        showInFooter: true,
        showInMobile: true,
      };
      this.save();
    }
    return this.data.business.logo;
  }

  public updateLogo(logoData: Partial<NonNullable<DatabaseSchema['business']['logo']>>): NonNullable<DatabaseSchema['business']['logo']> {
    const current = this.getLogo();
    this.data.business.logo = {
      ...current,
      ...logoData,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.business.logo;
  }

  public deleteLogo(): NonNullable<DatabaseSchema['business']['logo']> {
    const current = this.getLogo();
    this.data.business.logo = {
      ...current,
      imageUrl: '',
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.business.logo;
  }

  public getProducts(publishedOnly = false): Product[] {
    if (publishedOnly) {
      return this.data.products.filter((p) => p.status === 'published');
    }
    return this.data.products;
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p.id === id);
  }

  public addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: 'prod-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.products.unshift(newProduct);
    this.save();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.data.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.data.products[index] = {
      ...this.data.products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.products[index];
  }

  public deleteProduct(id: string): boolean {
    const index = this.data.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.data.products.splice(index, 1);
    this.save();
    return true;
  }

  public getCategories(): Category[] {
    return this.data.categories;
  }

  public addCategory(cat: { name: string; description?: string; subcategories?: string[] }): Category {
    const trimmedName = cat.name.trim();
    const slug = trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCategory: Category = {
      id: 'cat-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: trimmedName,
      slug: slug || 'category-' + Date.now(),
      subcategories: cat.subcategories || [],
      description: cat.description || '',
    };
    this.data.categories.push(newCategory);
    this.save();
    return newCategory;
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | null {
    const index = this.data.categories.findIndex((c) => c.id === id);
    if (index === -1) return null;
    const oldName = this.data.categories[index].name;
    const updatedCategory = {
      ...this.data.categories[index],
      ...updates,
      name: updates.name ? updates.name.trim() : this.data.categories[index].name,
    };
    if (updates.name && updates.name.trim()) {
      updatedCategory.slug = updates.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newName = updates.name.trim();
      if (oldName.toLowerCase() !== newName.toLowerCase()) {
        this.data.products.forEach((p) => {
          if (p.category.toLowerCase() === oldName.toLowerCase()) {
            p.category = newName;
          }
        });
      }
    }
    this.data.categories[index] = updatedCategory;
    this.save();
    return updatedCategory;
  }

  public deleteCategory(id: string): { success: boolean; error?: string; productCount?: number } {
    const index = this.data.categories.findIndex((c) => c.id === id);
    if (index === -1) {
      return { success: false, error: 'Category not found' };
    }
    const categoryName = this.data.categories[index].name.toLowerCase();
    const assignedProducts = this.data.products.filter(
      (p) => p.category.toLowerCase() === categoryName || (p as any).categoryId === id
    );
    if (assignedProducts.length > 0) {
      return {
        success: false,
        error: `This category is being used by ${assignedProducts.length} existing product(s). Please move those products to another category before deleting.`,
        productCount: assignedProducts.length,
      };
    }
    this.data.categories.splice(index, 1);
    this.save();
    return { success: true };
  }

  public updateCategories(categories: Category[]): Category[] {
    this.data.categories = categories;
    this.save();
    return this.data.categories;
  }

  public getGallery(publishedOnly = false) {
    if (publishedOnly) {
      return this.data.gallery.filter((item) => item.published);
    }
    return this.data.gallery;
  }

  public addGalleryItem(item: Omit<DatabaseSchema['gallery'][0], 'id' | 'createdAt'>) {
    const newItem = {
      ...item,
      id: 'gal-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };
    this.data.gallery.unshift(newItem);
    this.save();
    return newItem;
  }

  public updateGalleryItem(id: string, updates: Partial<DatabaseSchema['gallery'][0]>) {
    const index = this.data.gallery.findIndex((g) => g.id === id);
    if (index === -1) return null;
    this.data.gallery[index] = { ...this.data.gallery[index], ...updates };
    this.save();
    return this.data.gallery[index];
  }

  public deleteGalleryItem(id: string): boolean {
    const index = this.data.gallery.findIndex((g) => g.id === id);
    if (index === -1) return false;
    this.data.gallery.splice(index, 1);
    this.save();
    return true;
  }

  public getVideos(publishedOnly = false) {
    if (publishedOnly) {
      return this.data.videos.filter((v) => v.published);
    }
    return this.data.videos;
  }

  public addVideo(video: Omit<DatabaseSchema['videos'][0], 'id' | 'createdAt'>) {
    const newVideo = {
      ...video,
      id: 'vid-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };
    this.data.videos.unshift(newVideo);
    this.save();
    return newVideo;
  }

  public updateVideo(id: string, updates: Partial<DatabaseSchema['videos'][0]>) {
    const index = this.data.videos.findIndex((v) => v.id === id);
    if (index === -1) return null;
    this.data.videos[index] = { ...this.data.videos[index], ...updates };
    this.save();
    return this.data.videos[index];
  }

  public deleteVideo(id: string): boolean {
    const index = this.data.videos.findIndex((v) => v.id === id);
    if (index === -1) return false;
    this.data.videos.splice(index, 1);
    this.save();
    return true;
  }

  public getReviews(publishedOnly = false) {
    if (publishedOnly) {
      return this.data.reviews.filter((r) => r.published);
    }
    return this.data.reviews;
  }

  public addReview(review: Omit<DatabaseSchema['reviews'][0], 'id' | 'createdAt'>) {
    const newReview = {
      ...review,
      id: 'rev-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };
    this.data.reviews.unshift(newReview);
    this.save();
    return newReview;
  }

  public updateReview(id: string, updates: Partial<DatabaseSchema['reviews'][0]>) {
    const index = this.data.reviews.findIndex((r) => r.id === id);
    if (index === -1) return null;
    this.data.reviews[index] = { ...this.data.reviews[index], ...updates };
    this.save();
    return this.data.reviews[index];
  }

  public deleteReview(id: string): boolean {
    const index = this.data.reviews.findIndex((r) => r.id === id);
    if (index === -1) return false;
    this.data.reviews.splice(index, 1);
    this.save();
    return true;
  }

  public getAdmin() {
    return this.data.admin;
  }

  public updateAdminPassword(newPasswordHash: string, newSalt: string) {
    this.data.admin.passwordHash = newPasswordHash;
    this.data.admin.salt = newSalt;
    this.save();
  }

  public updateAdminCredentials(newUsername?: string, newPasswordHash?: string, newSalt?: string) {
    if (newUsername && newUsername.trim()) {
      this.data.admin.username = newUsername.trim();
    }
    if (newPasswordHash && newSalt) {
      this.data.admin.passwordHash = newPasswordHash;
      this.data.admin.salt = newSalt;
    }
    this.save();
    return this.data.admin;
  }
}

export const db = new Database();
