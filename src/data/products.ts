export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  description: string;
  specs: {
    capacity?: string;
    wattage?: string;
    dimension?: string;
    material?: string;
  };
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "GEA CHEST FREEZER AB-208-R",
    brand: "GEA",
    category: "Freezer",
    subCategory: "Freezer",
    price: 0,
    description: "Tanyakan Langsung Menuju Whatsapp.",
    specs: { capacity: "100L", wattage: "180 W", dimension: "54 x 57 x 174 cm", material: "Painted Steel & Glass" },
    image: "https://yerutlqkfjjcrfqsmupz.supabase.co/storage/v1/object/public/FOTO%20produck/grok-image-e7f0f50c-88f9-4238-88f8-aedbc769b9a6.png"
  },
  {
    id: 2,
    name: "GEA CHEST FREEZER AB-108-R",
    brand: "GEA",
    category: "FREEZER",
    subCategory: "Freezer",
    price: 0,
    description: "Tanyakan Langsung Menuju Whatasapp.",
    specs: { capacity: "100 L", wattage: "94 W", dimension: "54,6x47,9x84,5 cm", material: "Galvanized Steel" },
    image: "https://yerutlqkfjjcrfqsmupz.supabase.co/storage/v1/object/public/FOTO%20produck/grok-image-02bcec2d-b65c-4831-a4fb-732faecb4f29.png"
  },
  {
    id: 3,
    name: "GEA SLIDING CURVE GLASS FREEZER SD-303",
    brand: "GEA",
    category: "FREEZER",
    subCategory: "FREEZER",
    price: 0,
    description: "Tanyakan Langsung Menuju Whatsapp.",
    specs: { capacity: "303 L", wattage: "330 W", dimension: "0", material: "High-Grade " },
    image: "https://yerutlqkfjjcrfqsmupz.supabase.co/storage/v1/object/public/FOTO%20produck/grok-image-d383f41d-647a-4c9b-8f0f-9bfe6c445a19.png"
  },
  {
    id: 4,
    name: "GEA SLIDING CURVE GLASS FREEZER SD-213",
    brand: "GEA",
    category: "FREEZER",
    subCategory: "FREEZER",
    price: 0,
    description: "Tanyakan Langsung Menuju Whatsapp.",
    specs: { capacity: "", wattage: "238W", dimension: "0", material: "High Grade" },
    image: "https://yerutlqkfjjcrfqsmupz.supabase.co/storage/v1/object/public/FOTO%20produck/grok-image-d383f41d-647a-4c9b-8f0f-9bfe6c445a19.png"
  },
  {
    id: 5,
    name: "GEA STAINLESS STEEL UNDER COUNTER FREEZER L-RW6T4HHHH",
    brand: "GEA",
    category: "FREEZER",
    subCategory: FREEZER",
    price: 0,
    description: "Tanyakan Langsung Menuju Whatsapp.",
    specs: { capacity: "", wattage: "", dimension: "235x70x85", material: "Food Grade Alloy" },
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 6,
    name: "GEA SLIDING CURVE GLASS FREEZER SD-165",
    brand: "GEA",
    category: "FREEZER",
    subCategory: "FREEZER",
    price: 0,
    description: ".",
    specs: { capacity: "", wattage: "150 W", dimension: "50 x 50 x 100 cm", material: "High Quality },
    image: "https://yerutlqkfjjcrfqsmupz.supabase.co/storage/v1/object/public/FOTO%20produck/grok-image-2ed9bb8b-7a35-4db6-97ce-c3274b886111.png"
  },
  {
    id: 7,
    name: "GEA ISLAND FREEZER SCD-780R",
    brand: "GEA",
    category: "Freezer",
    subCategory: "Freezer",
    price: 19008000,
    description: "Tanyakn Langsung Menuju Whatsapp.",
    specs: { capacity: "630L", wattage: "730watt", dimension: "1900 x 950 x 830 mm", material: "High Quality },
    image: "https://yerutlqkfjjcrfqsmupz.supabase.co/storage/v1/object/public/FOTO%20produck/grok-image-51ac9e88-10a5-41e0-a304-b96960f42af5.png"
  }
];
