export type PetCategory = 'DOGS' | 'CATS' | 'BIRDS' | 'FISHES';

export type PetListing = {
  id: number;
  name: string;
  category: PetCategory;
  price: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  stockQuantity: number;
  breed?: string;
  age?: string;
};

export const fallbackCatalog: PetListing[] = [
  // DOGS
  {
    id: 1,
    name: 'Golden Retriever',
    category: 'DOGS',
    breed: 'Retriever',
    age: '2 years',
    price: '1200.00',
    description: 'Friendly family companion with playful energy. Great with kids and other pets.',
    imageUrl: 'https://images.unsplash.com/photo-1633722715463-d30628519c14?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stockQuantity: 3
  },
  {
    id: 2,
    name: 'Labrador Retriever',
    category: 'DOGS',
    breed: 'Retriever',
    age: '1.5 years',
    price: '1100.00',
    description: 'Loyal and intelligent, perfect for active families. Excellent temperament.',
    imageUrl: 'https://images.unsplash.com/photo-1633956122544-f6b0277e8e78?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stockQuantity: 4
  },
  {
    id: 3,
    name: 'German Shepherd',
    category: 'DOGS',
    breed: 'Shepherd',
    age: '2 years',
    price: '1400.00',
    description: 'Intelligent, loyal, and protective. Highly trainable and devoted companion.',
    imageUrl: 'https://images.unsplash.com/photo-1568595471452-1e4662ab0fa7?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stockQuantity: 2
  },
  {
    id: 4,
    name: 'French Bulldog',
    category: 'DOGS',
    breed: 'Bulldog',
    age: '1 year',
    price: '1600.00',
    description: 'Compact, muscular, and charming. Excellent for apartment living.',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19db992cb74?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stockQuantity: 2
  },
  {
    id: 5,
    name: 'Beagle',
    category: 'DOGS',
    breed: 'Hound',
    age: '1.5 years',
    price: '900.00',
    description: 'Energetic and curious, perfect for families. Strong pack instinct.',
    imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stockQuantity: 5
  },

  // CATS
  {
    id: 6,
    name: 'Maine Coon',
    category: 'CATS',
    breed: 'Maine Coon',
    age: '2 years',
    price: '1300.00',
    description: 'Large, gentle giant with striking appearance. Affectionate and social.',
    imageUrl: 'https://images.unsplash.com/photo-1604514628550-37477a805b42?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stockQuantity: 2
  },
  {
    id: 7,
    name: 'Persian Cat',
    category: 'CATS',
    breed: 'Persian',
    age: '1.5 years',
    price: '1100.00',
    description: 'Elegant with luxurious long coat. Calm and gentle personality.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stockQuantity: 3
  },
  {
    id: 8,
    name: 'Bengal Cat',
    category: 'CATS',
    breed: 'Bengal',
    age: '1 year',
    price: '1800.00',
    description: 'Exotic spotted coat with wild appearance. Playful and energetic.',
    imageUrl: 'https://images.unsplash.com/photo-1626895149374-120fc04e8e64?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stockQuantity: 1
  },
  {
    id: 9,
    name: 'Siamese Cat',
    category: 'CATS',
    breed: 'Siamese',
    age: '2 years',
    price: '950.00',
    description: 'Striking blue eyes and vocal personality. Highly intelligent.',
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4a6396b0c0c2?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stockQuantity: 4
  },
  {
    id: 10,
    name: 'British Shorthair',
    category: 'CATS',
    breed: 'British Shorthair',
    age: '1.5 years',
    price: '1050.00',
    description: 'Stocky build with round face. Calm, good-natured companion.',
    imageUrl: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stockQuantity: 3
  },

  // BIRDS
  {
    id: 11,
    name: 'Macaw',
    category: 'BIRDS',
    breed: 'Macaw',
    age: '3 years',
    price: '2500.00',
    description: 'Vibrant plumage, highly intelligent. Long lifespan companion.',
    imageUrl: 'https://images.unsplash.com/photo-1535003588551-b521f5f0ffa7?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stockQuantity: 1
  },
  {
    id: 12,
    name: 'Cockatoo',
    category: 'BIRDS',
    breed: 'Cockatoo',
    age: '2 years',
    price: '2000.00',
    description: 'Playful and affectionate. Strong personality and loud vocalizations.',
    imageUrl: 'https://images.unsplash.com/photo-1610852043872-caf0e5b16d10?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stockQuantity: 2
  },
  {
    id: 13,
    name: 'Lovebird',
    category: 'BIRDS',
    breed: 'Lovebird',
    age: '1 year',
    price: '400.00',
    description: 'Colorful and social birds. Perfect for beginners, mate for life.',
    imageUrl: 'https://images.unsplash.com/photo-1631317197522-e68fe6c76bef?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stockQuantity: 8
  },
  {
    id: 14,
    name: 'Parakeet',
    category: 'BIRDS',
    breed: 'Parakeet',
    age: '6 months',
    price: '250.00',
    description: 'Small, colorful, and playful. Great starter bird.',
    imageUrl: 'https://images.unsplash.com/photo-1444464666175-1cff94334810?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stockQuantity: 12
  },
  {
    id: 15,
    name: 'Canary',
    category: 'BIRDS',
    breed: 'Canary',
    age: '1 year',
    price: '150.00',
    description: 'Beautiful yellow plumage with melodious song.',
    imageUrl: 'https://images.unsplash.com/photo-1613369480034-763649a7a0c1?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stockQuantity: 6
  },

  // FISHES
  {
    id: 16,
    name: 'Betta Fish',
    category: 'FISHES',
    breed: 'Siamese Fighting Fish',
    age: '1 year',
    price: '85.00',
    description: 'Colorful with flowing fins. Must be kept alone.',
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8e2c58?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stockQuantity: 15
  },
  {
    id: 17,
    name: 'Goldfish',
    category: 'FISHES',
    breed: 'Goldfish',
    age: '2 years',
    price: '45.00',
    description: 'Classic and hardy. Great for beginners.',
    imageUrl: 'https://images.unsplash.com/photo-1567899378793-ad461642698e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stockQuantity: 20
  },
  {
    id: 18,
    name: 'Neon Tetra',
    category: 'FISHES',
    breed: 'Tetra',
    age: '6 months',
    price: '15.00',
    description: 'Bright blue and red stripes. Peaceful schooling fish.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stockQuantity: 50
  },
  {
    id: 19,
    name: 'Angelfish',
    category: 'FISHES',
    breed: 'Angelfish',
    age: '1 year',
    price: '35.00',
    description: 'Elegant triangular shape. Requires larger tank.',
    imageUrl: 'https://images.unsplash.com/photo-1580822261290-991b38693d1b?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stockQuantity: 10
  },
  {
    id: 20,
    name: 'Clownfish',
    category: 'FISHES',
    breed: 'Clownfish',
    age: '1.5 years',
    price: '120.00',
    description: 'Famous orange and white coloring. Symbiotic with anemones.',
    imageUrl: 'https://images.unsplash.com/photo-1546859140-a0db89fcd92e?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stockQuantity: 8
  }
];
