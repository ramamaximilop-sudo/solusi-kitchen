import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Filter, 
  ChevronDown, 
  ExternalLink, 
  X, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  Search,
  ShoppingCart,
  Truck,
  RotateCcw,
  MessageCircle
} from "lucide-react";
import { useState, useMemo, ReactNode, useEffect } from "react";
import { Product, PRODUCTS } from "../data/products.ts";

// --- REUSABLE COMPONENTS (Struktur Asli dari Screenshot) ---

const FilterSection = ({ title, children, maxHeight }: { title: string; children: ReactNode; maxHeight?: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <span className="text-[11px] font-black text-ske-blue uppercase tracking-[0.2em]">{title}</span>
        <ChevronDown size={14} className={`transition-transform duration-500 text-ske-emerald ${isOpen ? '' : '-rotate-90'}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div 
              className={`space-y-1.5 pb-2 pr-2 custom-scrollbar ${maxHeight ? 'overflow-y-auto' : ''}`} 
              style={{ maxHeight }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Breadcrumb = ({ category }: { category: string }) => (
  <nav className="flex items-center space-x-2 text-[9px] font-bold uppercase tracking-widest text-ske-blue/40 mb-8">
    <span className="hover:text-ske-emerald cursor-pointer transition-colors">Home</span>
    <span className="text-gray-300">/</span>
    <span className="hover:text-ske-emerald cursor-pointer transition-colors">Catalog</span>
    <span className="text-gray-300">/</span>
    <span className="text-ske-emerald">{category}</span>
  </nav>
);

// --- MAIN COMPONENT ---

export const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // --- INTEGRASI PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Menampilkan 12 produk per halaman

  // Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: "", address: "", inquiry: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  // DATA DEFINITIONS (Lengkap Sesuai Brand & Kategori Kamu)
  const categories = [
    "All", "FREEZER", "DISPLAY COOLER", "DISPENSER & REFRIGERATOR", "ICE MAKER", 
    "ICE CREAM EQUIPMENT", "S/S KITCHEN REFRIGERATION", 
    "MINIMARKET SUPERMARKET CONVENIENCE STORE REFRIGERATION", "COLD ROOM", 
    "MISCELLANEOUS", "MEDICAL REFRIGERATION", "COMMERCIAL KITCHEN & FOOD PROCESSING EQUIPMENT", 
    "FOOD & COOKING EQUIPMENT", "MEAT & FISH PROCESSING EQUIPMENT", 
    "FRUITS & VEGETABLE PROCESSING EQUIPMENT", "BAR, CORNER, KIOSK HOTEL, EQUIPMENT", 
    "BAKERY & NOODLE EQUIPMENT", "PACKAGING MACHINE", "CHAFING DISH", 
    "DISH WASHER & KITCHEN ACCESSORIES", "STAINLESS STEEL FABRICATION"
  ];
  
  const brands = [
    "All", "Coolmax", "Gainmax", "Qmax", "GEA", "Getra", "Fomac", "Starcool", 
    "Primax", "MASEMA", "RSA", "Sansio", "Crown", "Modena", "Nayati", "Robot Coupe"
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace('IDR', 'Rp');
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const catMatch = selectedCategory === "All" || p.category === selectedCategory;
      const brandMatch = selectedBrand === "All" || p.brand === selectedBrand;
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && brandMatch && searchMatch;
    });
  }, [selectedCategory, selectedBrand, searchQuery]);

  // --- LOGIKA PAGINATION ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Reset ke halaman 1 jika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, searchQuery]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers
  const handleInquiryRequest = (product: Product) => {
    setActiveProduct(product);
    setIsInquiryModalOpen(true);
    setIsDetailModalOpen(false);
    setShowSuccess(false);
  };

  const handleDetailRequest = (product: Product) => {
    setActiveProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleWhatsAppInquiry = () => {
    if (!activeProduct) return;
    const phoneNumber = "628128504818";
    const template = `Halo Solusi Kitchen Expert, saya ${formData.name} dari ${formData.address} ingin menanyakan detail unit:
    
Produk: ${activeProduct.name}
Brand: ${activeProduct.brand}
Harga: ${formatPrice(activeProduct.price)}

Pertanyaan: ${formData.inquiry || 'Apakah stok unit ini tersedia?'}`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(template)}`, '_blank');
    setShowSuccess(true);
  };

  return (
    <div className="pt-24 md:pt-32 bg-ske-bg min-h-screen selection:bg-ske-emerald selection:text-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        
        {/* Header Section */}
        <header className="mb-16 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex space-x-3 items-center mb-6">
                <div className="w-16 h-[3px] bg-ske-emerald"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-ske-blue/60">Professional Kitchen Solution</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-ske-dark uppercase leading-[0.9] tracking-tighter mb-4">
                Industrial<br /><span className="text-ske-emerald">Equipment</span> Catalog
              </h1>
              <p className="text-ske-blue/50 text-xs md:text-sm font-medium max-w-md leading-relaxed">
                Menyediakan lebih dari 500+ pilihan alat dapur komersial bersertifikat untuk kebutuhan Hotel, Restoran, dan Cafe.
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-4">
              <div className="relative w-full md:w-[400px] group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ske-blue/30 group-focus-within:text-ske-emerald transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari model atau brand..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-2 border-gray-100 px-14 py-5 text-[11px] font-bold uppercase tracking-widest outline-none focus:border-ske-emerald transition-all shadow-sm"
                />
              </div>
            </div>
          </div>
        </header>

        <Breadcrumb category={selectedCategory} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* SIDEBAR FILTER (Kembali ke desain aslimu) */}
          <aside className="lg:col-span-3 space-y-10">
            <div className="sticky top-32">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-[13px] font-black text-ske-dark uppercase tracking-[0.2em] flex items-center gap-3">
                  <Filter size={18} className="text-ske-emerald" /> Filters
                </h2>
              </div>

              <div className="bg-white p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                <FilterSection title="Categories" maxHeight="400px">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-start text-left w-full text-[10px] font-bold uppercase tracking-[0.15em] py-2.5 transition-all group ${
                        selectedCategory === cat ? 'text-ske-emerald' : 'text-ske-blue/50 hover:text-ske-blue'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mr-3 mt-1.5 transition-all ${
                        selectedCategory === cat ? 'bg-ske-emerald scale-125 shadow-[0_0_10px_rgba(32,106,93,0.6)]' : 'bg-gray-200 group-hover:bg-ske-blue/30'
                      }`} />
                      <span className="flex-1">{cat}</span>
                    </button>
                  ))}
                </FilterSection>

                <FilterSection title="Brand Authorized" maxHeight="300px">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`flex items-center w-full text-[10px] font-bold uppercase tracking-[0.15em] py-2.5 transition-all group ${
                        selectedBrand === brand ? 'text-ske-emerald' : 'text-ske-blue/50 hover:text-ske-blue'
                      }`}
                    >
                      <div className={`w-4 h-4 border-2 mr-3 flex items-center justify-center transition-all ${
                        selectedBrand === brand ? 'border-ske-emerald bg-ske-emerald' : 'border-gray-200 group-hover:border-ske-blue/30'
                      }`}>
                        {selectedBrand === brand && <div className="w-1.5 h-1.5 bg-white rotate-45" />}
                      </div>
                      {brand}
                    </button>
                  ))}
                </FilterSection>

                <div className="pt-8 space-y-6">
                  <div className="flex gap-4 items-start">
                    <Truck size={20} className="text-ske-emerald flex-shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-black text-ske-dark uppercase tracking-widest mb-1">Fast Delivery</h4>
                      <p className="text-[9px] text-ske-blue/40 font-medium leading-relaxed">Pengiriman aman ke seluruh wilayah Indonesia.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <RotateCcw size={20} className="text-ske-emerald flex-shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-black text-ske-dark uppercase tracking-widest mb-1">Genuine Parts</h4>
                      <p className="text-[9px] text-ske-blue/40 font-medium leading-relaxed">Jaminan ketersediaan suku cadang asli pabrikan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <main className="lg:col-span-9">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
               <div className="flex items-center gap-4">
                 <span className="text-[11px] font-black text-ske-blue uppercase tracking-[0.3em]">
                   Results: <span className="text-ske-emerald">{filteredProducts.length} Units</span>
                 </span>
                 <div className="h-4 w-[1px] bg-gray-300"></div>
                 <span className="text-[10px] font-bold text-ske-blue/30 uppercase tracking-widest">
                   Page {currentPage} of {totalPages || 1}
                 </span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              <AnimatePresence mode="popLayout">
                {currentProducts.map((product, index) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] bg-white border border-gray-100 overflow-hidden mb-6 flex items-center justify-center p-12 transition-all duration-700 group-hover:border-ske-emerald group-hover:shadow-2xl group-hover:shadow-ske-emerald/5">
                      <div className="absolute top-0 left-0 bg-ske-dark text-white text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 z-10 origin-top-left -rotate-90 -translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                        {product.brand}
                      </div>

                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out" 
                        referrerPolicy="no-referrer" 
                      />
                      
                      <div className="absolute inset-0 bg-ske-emerald/0 group-hover:bg-ske-emerald/5 transition-colors duration-500" />
                      
                      <div className="absolute bottom-6 left-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-2">
                        <button 
                          onClick={() => handleDetailRequest(product)}
                          className="flex-1 bg-ske-dark text-white text-[9px] font-black uppercase tracking-widest py-4 hover:bg-ske-emerald transition-colors flex items-center justify-center gap-2"
                        >
                          Details
                        </button>
                        <button 
                          onClick={() => handleInquiryRequest(product)}
                          className="w-14 bg-white border border-ske-dark text-ske-dark flex items-center justify-center hover:bg-ske-dark hover:text-white transition-all"
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 px-2">
                      <p className="text-[9px] font-black text-ske-emerald uppercase tracking-[0.2em] mb-1">{product.category}</p>
                      <h3 className="text-sm font-black text-ske-dark uppercase tracking-tight leading-tight group-hover:text-ske-emerald transition-colors line-clamp-2 min-h-[40px]">
                        {product.name}
                      </h3>
                      <div className="pt-2 border-t border-gray-100 mt-4 flex items-center justify-between">
                        <span className="text-lg font-black text-ske-dark">{formatPrice(product.price)}</span>
                        <div className="flex items-center gap-1 text-[8px] font-black text-ske-blue/30 uppercase tracking-tighter">
                          <Shield size={10} /> Official Warranty
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* --- PAGINATION CONTROLS --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-24 mb-12">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="w-14 h-14 border-2 border-gray-100 flex items-center justify-center bg-white text-ske-blue hover:border-ske-emerald disabled:opacity-20 transition-all shadow-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => paginate(i + 1)}
                    className={`w-14 h-14 text-xs font-black border-2 transition-all shadow-sm ${
                      currentPage === i + 1 
                        ? 'bg-ske-emerald border-ske-emerald text-white shadow-lg' 
                        : 'bg-white border-gray-100 text-ske-blue hover:border-ske-blue/20'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
                
                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="w-14 h-14 border-2 border-gray-100 flex items-center justify-center bg-white text-ske-blue hover:border-ske-emerald disabled:opacity-20 transition-all shadow-sm"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- SEMUA MODAL TETAP DI SINI (Inquiry & Detail) --- */}
      <AnimatePresence>
        {isDetailModalOpen && activeProduct && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="absolute inset-0 bg-ske-dark/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-[1200px] bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden">
               {/* Konten modal detail aslimu */}
               <div className="w-full md:w-1/2 bg-[#F8F9FB] p-12 flex items-center justify-center relative overflow-hidden group">
                <img src={activeProduct.image} alt={activeProduct.name} className="relative z-10 w-full h-full object-contain mix-blend-multiply drop-shadow-2xl" referrerPolicy="no-referrer" />
                <button onClick={() => setIsDetailModalOpen(false)} className="md:hidden absolute top-6 right-6 text-ske-dark p-2 border border-gray-200 bg-white"><X size={20} /></button>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col bg-white">
                <div className="hidden md:flex justify-end mb-8"><button onClick={() => setIsDetailModalOpen(false)} className="text-ske-blue/40 hover:text-ske-emerald transition-colors"><X size={24} /></button></div>
                <div className="flex-grow">
                  <span className="bg-ske-emerald text-white text-[9px] font-black uppercase px-3 py-1 mb-4 inline-block">{activeProduct.brand}</span>
                  <h2 className="text-4xl font-black text-ske-dark uppercase leading-[0.9] mb-8 italic">{activeProduct.name}</h2>
                  <div className="text-4xl font-black text-ske-dark mb-12">{formatPrice(activeProduct.price)}</div>
                  <div className="border-y border-gray-100 py-10">
                    <h4 className="text-[10px] font-black text-ske-blue uppercase mb-4 tracking-widest">Specifications</h4>
                    <div className="space-y-3">
                      <div className="flex flex-col"><span className="text-[9px] font-bold text-ske-blue/30 uppercase">Dimensions</span><span className="text-xs font-black text-ske-dark">{activeProduct.specs.dimension}</span></div>
                      <div className="flex flex-col"><span className="text-[9px] font-bold text-ske-blue/30 uppercase">Capacity</span><span className="text-xs font-black text-ske-dark">{activeProduct.specs.capacity}</span></div>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleInquiryRequest(activeProduct)} className="w-full bg-ske-emerald text-white py-6 text-xs font-black uppercase tracking-[0.3em] hover:bg-ske-dark transition-all mt-8">Request Quotation</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInquiryModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsInquiryModalOpen(false)} className="absolute inset-0 bg-ske-dark/95 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-[550px] bg-white p-10 md:p-14 border-t-8 border-ske-emerald">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-ske-dark uppercase tracking-tight italic">Inquiry Form</h2>
                <button onClick={() => setIsInquiryModalOpen(false)} className="text-ske-dark hover:text-ske-emerald transition-colors"><X size={28} /></button>
              </div>
              {!showSuccess ? (
                <div className="space-y-8">
                  <div className="flex items-center gap-6 p-4 bg-gray-50 border border-gray-100">
                    <img src={activeProduct?.image} alt="" className="w-16 h-16 object-contain mix-blend-multiply" />
                    <div><div className="text-[8px] font-black text-ske-emerald uppercase">{activeProduct?.brand}</div><div className="text-[11px] font-black text-ske-dark uppercase">{activeProduct?.name}</div></div>
                  </div>
                  <div className="space-y-4">
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-2 border-gray-100 p-4 text-xs font-bold outline-none focus:border-ske-emerald" placeholder="Nama Lengkap" />
                    <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full border-2 border-gray-100 p-4 text-xs font-bold outline-none focus:border-ske-emerald" placeholder="Lokasi Pengiriman" />
                    <textarea rows={3} value={formData.inquiry} onChange={(e) => setFormData({...formData, inquiry: e.target.value})} className="w-full border-2 border-gray-100 p-4 text-xs font-bold outline-none focus:border-ske-emerald resize-none" placeholder="Pesan Tambahan..." />
                  </div>
                  <button onClick={handleWhatsAppInquiry} disabled={!formData.name || !formData.address} className="w-full bg-ske-emerald text-white py-5 text-xs font-black uppercase tracking-[0.3em] disabled:opacity-30">Kirim via WhatsApp</button>
                </div>
              ) : (
                <div className="py-20 text-center"><CheckCircle size={40} className="text-ske-emerald mx-auto mb-6" /><h3 className="text-2xl font-black text-ske-dark uppercase mb-2">Pesan Terkirim!</h3><button onClick={() => setShowSuccess(false)} className="mt-10 text-[10px] font-black text-ske-emerald uppercase border-b-2 border-ske-emerald pb-1">Kirim Pesan Lagi</button></div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
