export interface Product {
  id: number;
  name: string;
  brand?: string;
  category?: string;
  subCategory?: string;
  price?: number;
  description?: string;
  specs?: {
    capacity?: string;
    wattage?: string;
    dimension?: string;
    material?: string;
    [key: string]: string | undefined; 
  };
  image?: string;
  slug?: string; 
}