import { motion, AnimatePresence } from "motion/react";
import { Shield, ChevronDown, ExternalLink, X, CheckCircle, Search, LayoutGrid } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { Product, PRODUCTS } from "../data/products.ts";

const ITEMS_PER_PAGE = 12;

// 1. Komponen Skeleton Loading
const ProductSkeleton = () => (
  <div className="bg-white border border-gray-100 flex flex-col shadow-sm rounded-lg overflow-hidden animate-pulse h-full">
    <div className="aspect-square bg-gray-50 flex items-center justify-center p-6 relative">
      <div className="w-2/3 h-2/3 bg-gray-200/50 rounded-lg" />
    </div>
    <div className="p-3 sm:p-4 flex flex-col flex-grow">
      <div className="h-2 w-12 bg-gray-100 rounded mb-2" />
      <div className="space-y-1.5 mb-4 min-h-[2.4em]">
        <div className="h-2.5 w-full bg-gray-100 rounded" />
        <div className="h-2.5 w-4/5 bg-gray-100 rounded" />
      </div>
      <div className="h-4 w-20 bg-gray-100 rounded mb-4" />
      <div className="mt-auto h-9 w-full bg-gray-100 rounded" />
    </div>
  </div>
);

export const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const catalogTopRef = useRef<HTMLDivElement>(null);

  // List kategori sesuai permintaanmu
  const categories = [
    "All",
    "FREEZER",
    "DISPLAY COOLER",
    "dispenser refrigerator",
    "ICE MAKER",
    "ICE CREAM EQUIPMENT",
    "stainless-kitchen",
    "SUPERMARKET EQUIPMENT",
    "COLD ROOM STORAGE",
    "MISCELLANEOUS",
    "MEDICAL REFRIGERATION",
    "FOOD & COOKING EQUIPMENT",
    "FOOD AND FISH EQUIPMENT",
    "FRUIT AND VEGETABLE EQUIPMENT",
    "BAR AND HOTEL EQUIPMENT",
    "BAKERY AND NOODLE EQUIPMENT",
    "PACKAGING MACHINE",
    "CHAFING DISH EQUIPMENT",
    "DISH WASHER EQUIPMENT"
  ];

  const brands = ["All", "GEA", "Getra", "Fomac", "Modena", "RSA", "Sansio"];

  // Effect untuk loading state biar gak glitch
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedBrand, searchQuery, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, searchQuery]);

  // Modal State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Lock scroll saat modal buka
  useEffect(() => {
    if (isDetailModalOpen || isInquiryModalOpen || isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDetailModalOpen, isInquiryModalOpen, isFilterOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(price).replace('IDR', 'Rp');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Bandingkan dengan lowercase untuk menghindari error typo kecil/besar
      const catMatch = selectedCategory === "All" || 
                       p.category?.toLowerCase() === selectedCategory.toLowerCase();
      const brandMatch = selectedBrand === "All" || 
                        p.brand?.toLowerCase() === selectedBrand.toLowerCase();
      const searchMatch = searchQuery === "" || 
                         p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && brandMatch && searchMatch;
    });
  }, [selectedCategory, selectedBrand, searchQuery]);

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="pt-24 md:pt-32 bg-ske-bg min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex space-x-2 items-center mb-4">
              <div className="w-12 h-[2px] bg-ske-emerald"></div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-ske-blue">SKE Professional Catalog</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-ske-dark uppercase leading-none tracking-tight">
              Marketplace Peralatan<br />Dapur Industrial
            </h1>
          </div>
          
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="relative flex-grow group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ske-blue/30 group-focus-within:text-ske-emerald" size={18} />
              <input 
                type="text" 
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 py-4 pl-12 pr-4 text-xs font-bold outline-none focus:border-ske-emerald transition-all rounded-lg"
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="bg-ske-dark text-white p-4 rounded-lg hover:bg-ske-emerald transition-colors shadow-lg flex items-center gap-2"
            >
              <LayoutGrid size={20} />
              <span className="text-[10px] font-black uppercase hidden sm:block">Kategori</span>
            </button>
          </div>
        </header>

        {/* Product Grid */}
        <main ref={catalogTopRef}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {isLoading ? (
              Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
            ) : (
              paginatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-100 flex flex-col group relative shadow-sm rounded-lg overflow-hidden"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 cursor-pointer" onClick={() => { setActiveProduct(product); setIsDetailModalOpen(true); }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-3 flex flex-col flex-grow">
                    <span className="text-[8px] font-black text-ske-blue/40 uppercase mb-1">{product.brand}</span>
                    <h3 className="text-[10px] font-black text-ske-dark uppercase mb-2 line-clamp-2 min-h-[2.4em]">{product.name}</h3>
                    <div className="text-xs font-black text-ske-emerald mb-3">{formatPrice(product.price)}</div>
                    <button 
                      onClick={() => { setActiveProduct(product); setIsDetailModalOpen(true); }}
                      className="mt-auto w-full bg-ske-emerald text-white text-[9px] font-black uppercase py-2 rounded hover:brightness-110"
                    >
                      Detail Produk
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* POPUP KATEGORI */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFilterOpen(false)} className="absolute inset-0 bg-ske-dark/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <h2 className="text-xs font-black uppercase tracking-widest text-ske-blue">Pilih Kategori</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-200 rounded-full"><X size={20}/></button>
              </div>
              <div className="p-6 grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                    className={`text-left p-3 text-[10px] font-bold uppercase rounded-lg border transition-all ${selectedCategory === cat ? 'bg-ske-emerald text-white border-ske-emerald' : 'bg-white text-ske-blue border-gray-100 hover:border-ske-emerald'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL DETAIL (Fix Scroll Bug) */}
      <AnimatePresence>
        {isDetailModalOpen && activeProduct && (
          <div className="fixed inset-0 z-[250] overflow-y-auto flex items-start justify-center py-10 px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="fixed inset-0 bg-ske-dark/80 backdrop-blur-md" />
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="relative w-full max-w-[900px] bg-white shadow-2xl flex flex-col md:flex-row rounded-2xl overflow-hidden z-[10] my-auto"
            >
              <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
                <img src={activeProduct.image} className="max-h-[350px] object-contain" />
              </div>
              <div className="w-full md:w-1/2 p-8 relative flex flex-col">
                <button onClick={() => setIsDetailModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-ske-dark p-2"><X size={24}/></button>
                <span className="text-[10px] font-black text-ske-emerald uppercase tracking-widest">{activeProduct.brand}</span>
                <h2 className="text-xl font-black text-ske-dark uppercase mt-2 mb-4 leading-tight">{activeProduct.name}</h2>
                <div className="text-2xl font-black text-ske-dark mb-6">{formatPrice(activeProduct.price)}</div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="text-[10px] font-black text-ske-blue uppercase border-b pb-2">Deskripsi & Spesifikasi</h4>
                  <p className="text-xs text-ske-blue/70 whitespace-pre-line leading-relaxed">
                    {activeProduct.description || "Hubungi kami untuk informasi lebih lanjut mengenai spesifikasi detail produk ini."}
                  </p>
                </div>

                <a 
                  href={`https://wa.me/62XXXXXXXXXX?text=Halo%20Sintman%20Mitra%20Solusi,%20saya%20ingin%20tanya%20stok%20${encodeURIComponent(activeProduct.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full bg-ske-emerald text-white py-4 font-black uppercase text-xs tracking-widest rounded-xl hover:brightness-110 transition-all text-center"
                >
                  Tanyakan via WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
