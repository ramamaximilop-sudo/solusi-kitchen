export interface Product {
    id: string | number;
    category: string;
    subCategory?: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    description?: string;
    features?: string[];
    specs: {
      capacity?: string;
      wattage?: string;
      dimension?: string;
      material?: string;
      [key: string]: string | undefined;
    };
    specifications?: Record<string, string>;
    link?: string;
    slug: string;
  }
