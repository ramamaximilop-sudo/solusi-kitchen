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
    name: "Standard Upright Freezer",
    brand: "RSA",
    category: "FREEZER",
    subCategory: "Freezers",
    price: 12400000,
    description: "Freezer vertikal dengan sistem pendinginan statis. Dirancang untuk penyimpanan jangka panjang dengan rak yang dapat disesuaikan.",
    specs: { capacity: "500 L", wattage: "250 W", dimension: "68 x 70 x 190 cm", material: "Galvanized Steel" },
    image: "https://images.unsplash.com/photo-1571175432247-41857920ab0b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    name: "High-Speed Oven HP-45",
    brand: "GETRA",
    category: "FOOD & COOKING EQUIPMENT",
    subCategory: "Ovens",
    price: 34500000,
    description: "Oven kecepatan tinggi yang menggabungkan konveksi dan microwave. Ideal untuk restoran cepat saji dan kafe yang membutuhkan waktu masak instan.",
    specs: { capacity: "45 L", wattage: "3200 W", dimension: "60 x 60 x 50 cm", material: "High-Grade Stainless Steel" },
    image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    name: "6-Burner Gas Range w/ Oven",
    brand: "SANSIIO",
    category: "FOOD & COOKING EQUIPMENT",
    subCategory: "Ranges",
    price: 28900000,
    description: "Kompor gas industrial 6 tungku dengan oven di bagian bawah. Konstruksi kokoh untuk penggunaan berat di dapur hotel dan catering.",
    specs: { capacity: "Large", wattage: "Gas", dimension: "120 x 80 x 90 cm", material: "Stainless Steel 304" },
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    name: "Automatic Dough Divider",
    brand: "FOMAC",
    category: "BAKERY & NOODLE EQUIPMENT",
    subCategory: "Bakery",
    price: 18500000,
    description: "Mesin pembagi adonan otomatis dengan akurasi berat tinggi. Mempercepat proses produksi roti di workshop bakery Anda.",
    specs: { capacity: "30 pcs/cycle", wattage: "750 W", dimension: "70 x 70 x 150 cm", material: "Food Grade Alloy" },
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 6,
    name: "Meat Bone Saw Machine",
    brand: "PRIMAX",
    category: "MEAT & FISH PROCESSING EQUIPMENT",
    subCategory: "Food Processing",
    price: 21200000,
    description: "Gergaji tulang industrial untuk memotong daging beku dan tulang dengan bersih. Dilengkapi dengan fitur keamanan tingkat tinggi.",
    specs: { capacity: "200 kg/hr", wattage: "1500 W", dimension: "50 x 50 x 100 cm", material: "Anodized Aluminum & SS" },
    image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 7,
    name: "Double Deck Stone Deck Oven",
    brand: "CROWN",
    category: "BAKERY & NOODLE EQUIPMENT",
    subCategory: "Bakery",
    price: 42500000,
    description: "Oven dek batu dua tingkat untuk hasil panggangan roti dengan kerak sempurna. Distribusi panas sangat stabil dan merata.",
    specs: { capacity: "2 Trays", wattage: "Gas/Electric", dimension: "135 x 95 x 125 cm", material: "Double Layered SS" },
    image: "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?auto=format&fit=crop&q=80&w=600"
  }
];
