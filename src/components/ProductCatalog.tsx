import { motion, AnimatePresence } from "motion/react";
import { Shield, Settings, ChevronRight, Filter, ChevronDown, ExternalLink, X, CheckCircle, Search } from "lucide-react";
import { useState, useMemo, ReactNode, useEffect, useRef } from "react";
import { Product, PRODUCTS } from "../data/products.ts";

const ITEMS_PER_PAGE = 12;

const FilterSection = ({ title, children, maxHeight }: { title: string; children: ReactNode; maxHeight?: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="text-sm font-black text-ske-blue uppercase tracking-widest">{title}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 text-ske-blue/50 ${isOpen ? '' : '-rotate-90'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className={`space-y-1 pb-2 scrollbar-thin scrollbar-thumb-gray-200 ${maxHeight ? 'overflow-y-auto' : ''}`} style={{ maxHeight }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const catalogTopRef = useRef<HTMLDivElement>(null);
  
  // Reset page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, searchQuery]);

  // Handle page change with smooth scroll
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    catalogTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  // Inquiry Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: "", address: "", inquiry: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace('IDR', 'Rp');
  };

  const categories = [
    "All",
    "FREEZER",
    "DISPLAY COOLER",
    "DISPENSER & REFRIGERATOR",
    "ICE MAKER",
    "ICE CREAM EQUIPMENT",
    "S/S KITCHEN REFRIGERATION",
    "MINIMARKET SUPERMARKET CONVENIENCE STORE REFRIGERATION",
    "COLD ROOM",
    "MISCELLANEOUS",
    "MEDICAL REFRIGERATION",
    "COMMERCIAL KITCHEN & FOOD PROCESSING EQUIPMENT",
    "FOOD & COOKING EQUIPMENT",
    "MEAT & FISH PROCESSING EQUIPMENT",
    "FRUITS & VEGETABLE PROCESSING EQUIPMENT",
    "BAR, CORNER, KIOSK HOTEL, EQUIPMENT",
    "BAKERY & NOODLE EQUIPMENT",
    "PACKAGING MACHINE",
    "CHAFING DISH",
    "DISH WASHER & KITCHEN ACCESSORIES"
  ];
  
  const brands = [
    "All",
    "Coolmax",
    "Gainmax",
    "Qmax",
    "GEA",
    "Getra",
    "Fomac",
    "Starcool",
    "Primax",
    "MASEMA",
    "RSA",
    "Sansio",
    "Crown",
    "Modena"
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const catMatch = selectedCategory === "All" || p.category === selectedCategory;
      const brandMatch = selectedBrand === "All" || p.brand === selectedBrand;
      const searchMatch = searchQuery === "" || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && brandMatch && searchMatch;
    });
  }, [selectedCategory, selectedBrand, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleInquiryRequest = (product: Product) => {
    setActiveProduct(product);
    setIsInquiryModalOpen(true);
    setIsDetailModalOpen(false); // Close detail if open
    setShowSuccess(false);
  };

  const handleDetailRequest = (product: Product) => {
    setActiveProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleWhatsAppInquiry = () => {
    if (!activeProduct) return;
    
    const phoneNumber = "628128504818";
    const template = `Halo SKE, saya ${formData.name} dari ${formData.address} ingin menanyakan perihal ${formData.inquiry || 'Stok'}. Apakah Stok Tersedia untuk produk ${activeProduct.name} dengan harga ${formatPrice(activeProduct.price)}?`;
    const encodedMessage = encodeURIComponent(template);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success state
    setShowSuccess(true);
  };

  return (
    <div className="pt-24 md:pt-32 bg-ske-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
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
          
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ske-blue/30 group-focus-within:text-ske-emerald transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Cari produk (Nama, Brand, Kategori)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 py-4 pl-12 pr-4 text-xs font-bold text-ske-dark outline-none focus:border-ske-emerald transition-premium placeholder:text-ske-blue/20"
            />
          </div>
        </header>

        {/* Mobile Filter Chips & Drawer */}
        <div className="lg:hidden mb-8 space-y-4">
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                  selectedCategory === cat 
                    ? 'bg-ske-emerald border-ske-emerald text-white shadow-lg' 
                    : 'bg-white border-gray-200 text-ske-blue/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 bg-ske-blue text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest"
            >
              <Filter size={14} /> Brand Filter
            </button>
            <span className="text-[10px] font-bold text-ske-blue/40 uppercase tracking-widest">
              Found {filteredProducts.length} items
            </span>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="fixed inset-0 bg-ske-dark/60 z-[110] backdrop-blur-sm"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-0 bottom-0 w-[80%] max-w-[400px] bg-ske-bg z-[120] p-8 overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-sm font-black text-ske-blue uppercase tracking-widest">Filter & Brands</h2>
                    <button onClick={() => setIsFilterOpen(false)} className="text-ske-dark">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-12">
                    <section>
                      <h3 className="text-[10px] font-black text-ske-blue uppercase tracking-[0.2em] mb-4 border-b border-gray-300 pb-2">Categories</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                            className={`flex items-center text-left w-full text-[10px] font-bold uppercase tracking-widest py-2 transition-colors ${
                              selectedCategory === cat ? 'text-ske-emerald' : 'text-ske-blue/60 hover:text-ske-blue'
                            }`}
                          >
                            <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mr-3 ${selectedCategory === cat ? 'bg-ske-emerald' : 'bg-transparent border border-gray-300'}`}></span>
                            {cat}
                          </button>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-[10px] font-black text-ske-blue uppercase tracking-[0.2em] mb-4 border-b border-gray-300 pb-2">Authorized Brands</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {brands.map((brand) => (
                          <button
                            key={brand}
                            onClick={() => { setSelectedBrand(brand); setIsFilterOpen(false); }}
                            className={`flex items-center w-full text-[10px] font-bold uppercase tracking-widest py-2 transition-colors ${
                              selectedBrand === brand ? 'text-ske-emerald' : 'text-ske-blue/60 hover:text-ske-blue'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-3 ${selectedBrand === brand ? 'bg-ske-emerald' : 'bg-transparent border border-gray-300'}`}></span>
                            {brand}
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 border-r border-gray-200 pr-8 sticky top-[100px] h-fit self-start">
            <h2 className="text-[11px] font-black text-ske-blue uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Filter size={14} /> Shop Resources
            </h2>
            
            <div className="flex flex-col gap-10">
              {/* Categories Section */}
              <section className="bg-ske-bg">
                <div className="sticky top-0 bg-ske-bg z-10 pb-3 border-b border-gray-300">
                  <h3 className="text-[10px] font-black text-ske-blue uppercase tracking-[0.22em]">Categories</h3>
                </div>
                <div className="mt-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-start text-left w-full text-[10px] font-bold uppercase tracking-widest py-2 transition-all duration-200 ${
                        selectedCategory === cat ? 'text-ske-emerald translate-x-1' : 'text-ske-blue/60 hover:text-ske-blue hover:translate-x-0.5'
                      }`}
                    >
                      <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mr-3 mt-1.5 transition-all ${selectedCategory === cat ? 'bg-ske-emerald shadow-[0_0_8px_rgba(32,106,93,0.5)]' : 'bg-transparent border border-gray-300'}`}></span>
                      <span className={selectedCategory === cat ? 'font-black' : ''}>{cat}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Brands Section */}
              <section className="bg-ske-bg">
                <div className="sticky top-0 bg-ske-bg z-10 pb-3 border-b border-gray-300">
                  <h3 className="text-[10px] font-black text-ske-blue uppercase tracking-[0.22em]">Authorized Brands</h3>
                </div>
                <div className="mt-4 max-h-[250px] overflow-y-auto custom-scrollbar pr-4">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`flex items-center w-full text-[10px] font-bold uppercase tracking-widest py-2 transition-all duration-200 ${
                        selectedBrand === brand ? 'text-ske-emerald translate-x-1' : 'text-ske-blue/60 hover:text-ske-blue hover:translate-x-0.5'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-all ${selectedBrand === brand ? 'bg-ske-emerald shadow-[0_0_8px_rgba(32,106,93,0.5)]' : 'bg-transparent border border-gray-300'}`}></span>
                      <span className={selectedBrand === brand ? 'font-black' : ''}>{brand}</span>
                    </button>
                  ))}
                </div>
              </section>

              <div className="p-6 bg-white border border-gray-200 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <Shield className="w-8 h-8 text-ske-emerald mb-4 transition-transform group-hover:scale-110" />
                  <h4 className="text-[10px] font-black text-ske-dark uppercase tracking-widest mb-2">Jaminan Kualitas</h4>
                  <p className="text-[9px] text-ske-blue/60 leading-relaxed font-medium italic">Semua produk kami memiliki garansi resmi pabrikan dan dukungan purna jual responsif.</p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Shield size={64} />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3" ref={catalogTopRef}>
            <div className="hidden lg:flex justify-between items-center mb-8 border-b border-gray-300 pb-4">
               <span className="text-[10px] font-bold text-ske-blue/40 uppercase tracking-[0.2em]">Showing {paginatedProducts.length} of {filteredProducts.length} Results</span>
               <div className="text-[10px] font-bold text-ske-blue uppercase tracking-widest cursor-pointer hover:text-ske-emerald transition-colors flex items-center gap-1 group">
                 Sort By: Newest <ChevronDown size={10} className="group-hover:translate-y-0.5 transition-transform" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {paginatedProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8, shadow: "0 25px 50px -12px rgba(27, 28, 37, 0.15)" }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="bg-white border border-gray-200 flex flex-col group relative transition-premium"
                  >
                    {/* Brand Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-ske-bg/80 backdrop-blur-sm px-2 py-1 text-[8px] font-black text-ske-blue uppercase tracking-[0.2em] border border-gray-200 shadow-sm">
                        {product.brand}
                      </span>
                    </div>

                    {/* Image Area */}
                    <div className="aspect-square bg-gray-50 flex items-center justify-center p-8 overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-ske-dark/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-[10px] font-black text-ske-blue uppercase tracking-[0.3em] mb-1">{product.brand}</div>
                      <div className="text-[8px] font-bold text-ske-emerald uppercase tracking-[0.3em] mb-4">{product.category}</div>
                      <h3 
                        onClick={() => handleDetailRequest(product)}
                        className="text-sm font-black text-ske-dark uppercase tracking-tight mb-2 group-hover:text-ske-emerald transition-colors leading-snug cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      
                      <div className="mb-4">
                        <span className="text-xl font-black text-ske-dark">{formatPrice(product.price)}</span>
                        <p className="text-[7px] text-ske-blue/40 font-bold uppercase tracking-widest mt-0.5">*Harga dapat berubah sewaktu-waktu.</p>
                      </div>
                      
                      <div className="space-y-1 mb-8">
                        {product.specs.capacity && (
                          <div className="flex justify-between items-center border-b border-gray-100 py-1">
                            <span className="text-[9px] font-bold text-ske-blue/40 uppercase tracking-widest">Capacity</span>
                            <span className="text-[9px] font-bold text-ske-dark">{product.specs.capacity}</span>
                          </div>
                        )}
                        {product.specs.wattage && (
                          <div className="flex justify-between items-center border-b border-gray-100 py-1">
                            <span className="text-[9px] font-bold text-ske-blue/40 uppercase tracking-widest">Power</span>
                            <span className="text-[9px] font-bold text-ske-dark">{product.specs.wattage}</span>
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={() => handleInquiryRequest(product)}
                        className="mt-auto w-full bg-ske-emerald text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:shadow-[0_0_20px_rgba(32,106,93,0.4)] hover:brightness-110 transition-premium flex items-center justify-center gap-2 group/btn"
                      >
                        Tanyakan Stok
                        <ExternalLink size={12} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-premium" />
                      </button>
                    </div>

                    {/* Hover Shadow Enhancement */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ske-dark/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-20 flex flex-col items-center gap-8 border-t border-gray-200 pt-10">
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-5 py-3 border border-gray-200 text-[10px] font-black uppercase tracking-widest text-ske-blue disabled:opacity-30 disabled:cursor-not-allowed hover:border-ske-emerald hover:text-ske-emerald transition-premium"
                  >
                    <ChevronDown size={14} className="rotate-90" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 text-[10px] font-black uppercase tracking-widest transition-premium ${
                          currentPage === page 
                            ? 'bg-ske-emerald text-white shadow-lg' 
                            : 'bg-white text-ske-blue border border-gray-200 hover:border-ske-emerald hover:text-ske-emerald'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-5 py-3 border border-gray-200 text-[10px] font-black uppercase tracking-widest text-ske-blue disabled:opacity-30 disabled:cursor-not-allowed hover:border-ske-emerald hover:text-ske-emerald transition-premium"
                  >
                    Next
                    <ChevronDown size={14} className="-rotate-90" />
                  </button>
                </div>
                <div className="text-[9px] font-bold text-ske-blue/30 uppercase tracking-[0.2em]">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-6 text-ske-blue/20">
                  <Filter size={32} />
                </div>
                <h3 className="text-sm font-black text-ske-dark uppercase tracking-widest mb-2">No Products Found</h3>
                <p className="text-xs text-ske-blue/60 font-medium max-w-xs">Coba ubah filter pencarian Anda untuk melihat koleksi lainnya.</p>
                <button 
                  onClick={() => { setSelectedCategory("All"); setSelectedBrand("All"); }}
                  className="mt-8 text-[10px] font-black text-ske-emerald uppercase tracking-[0.2em] border-b-2 border-ske-emerald pb-1 hover:brightness-110 hover:-translate-y-0.5 transition-premium"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && activeProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="fixed inset-0 bg-ske-dark/80 z-[150] backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-[95%] max-w-[900px] h-fit max-h-[90vh] bg-white z-[160] shadow-2xl flex flex-col md:flex-row overflow-hidden"
            >
              {/* Product Image Side */}
              <div className="w-full md:w-1/2 bg-[#EBECF1] p-10 flex items-center justify-center relative">
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name} 
                  className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl" 
                  referrerPolicy="no-referrer" 
                />
                <button 
                  onClick={() => setIsDetailModalOpen(false)}
                  className="absolute top-6 left-6 md:hidden text-ske-dark"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Product Content Side */}
              <div className="w-full md:w-1/2 p-10 overflow-y-auto custom-scrollbar bg-white">
                <div className="hidden md:flex justify-end mb-4">
                  <button onClick={() => setIsDetailModalOpen(false)} className="text-ske-dark hover:text-ske-emerald transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-[2px] bg-ske-emerald"></div>
                    <span className="text-[10px] font-black text-ske-blue uppercase tracking-widest">{activeProduct.brand}</span>
                  </div>
                  <h2 className="text-2xl font-black text-ske-dark uppercase leading-none tracking-tight mb-4">
                    {activeProduct.name}
                  </h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-ske-dark">{formatPrice(activeProduct.price)}</span>
                    <span className="text-[8px] font-bold text-ske-blue/40 uppercase">*Harga dapat berubah</span>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Technical Specs Table */}
                  <section>
                    <h4 className="text-[10px] font-black text-ske-blue uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-2">Technical Specifications</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-[11px] font-bold text-ske-blue/40 uppercase">Dimensions</span>
                        <span className="text-[11px] font-black text-ske-dark">{activeProduct.specs.dimension}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-[11px] font-bold text-ske-blue/40 uppercase">Capacity</span>
                        <span className="text-[11px] font-black text-ske-dark">{activeProduct.specs.capacity}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-[11px] font-bold text-ske-blue/40 uppercase">Power Input</span>
                        <span className="text-[11px] font-black text-ske-dark">{activeProduct.specs.wattage}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-[11px] font-bold text-ske-blue/40 uppercase">Material Build</span>
                        <span className="text-[11px] font-black text-ske-dark">{activeProduct.specs.material}</span>
                      </div>
                    </div>
                  </section>

                  {/* Features Description */}
                  <section>
                    <h4 className="text-[10px] font-black text-ske-blue uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-2">Product Description</h4>
                    <p className="text-xs font-bold text-ske-blue/70 leading-relaxed">
                      {activeProduct.description}
                    </p>
                  </section>

                  <button 
                    onClick={() => handleInquiryRequest(activeProduct)}
                    className="w-full bg-[#206A5D] text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:shadow-[0_0_25px_rgba(32,106,93,0.3)] hover:brightness-110 transition-premium flex items-center justify-center gap-3 shadow-xl"
                  >
                    Tanyakan Stok & Spesifikasi
                    <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-premium" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isInquiryModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInquiryModalOpen(false)}
              className="fixed inset-0 bg-ske-dark/80 z-[200] backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-[90%] max-w-[500px] h-fit bg-[#EBECF1] z-[210] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-ske-emerald"></div>
                    <h2 className="text-sm font-black text-ske-dark uppercase tracking-widest">Tanyakan Stok</h2>
                  </div>
                  <button onClick={() => setIsInquiryModalOpen(false)} className="text-ske-dark hover:text-ske-emerald transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {!showSuccess ? (
                  <div className="space-y-6">
                    <div className="bg-white p-4 border border-gray-200 flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-gray-50 p-2 flex items-center justify-center">
                        <img src={activeProduct?.image} alt={activeProduct?.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="text-[8px] font-black text-ske-blue/40 uppercase tracking-widest">{activeProduct?.brand}</div>
                        <div className="text-[11px] font-black text-ske-dark uppercase leading-tight">{activeProduct?.name}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black text-ske-blue uppercase tracking-widest mb-1.5 ml-1">Nama Lengkap</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Masukkan nama Anda..."
                          className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-bold text-ske-dark outline-none focus:border-ske-emerald transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-ske-blue uppercase tracking-widest mb-1.5 ml-1">Alamat / Lokasi Pengiriman</label>
                        <input 
                          type="text" 
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          placeholder="Contoh: Bekasi, Jawa Barat..."
                          className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-bold text-ske-dark outline-none focus:border-ske-emerald transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-ske-blue uppercase tracking-widest mb-1.5 ml-1">Pertanyaan Tambahan</label>
                        <textarea 
                          rows={3}
                          value={formData.inquiry}
                          onChange={(e) => setFormData({...formData, inquiry: e.target.value})}
                          placeholder="Tanyakan hal lain mengenai produk..."
                          className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-bold text-ske-dark outline-none focus:border-ske-emerald transition-colors resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-[9px] text-ske-blue/40 font-medium italic leading-relaxed mb-6">
                        "Permintaan daripada Alamat Dan juga Nama Hanya Sebatas informasi Bagi Untuk Mempertimbangkan Expedisi dari Workshop kami"
                      </p>
                      <button 
                        onClick={handleWhatsAppInquiry}
                        disabled={!formData.name || !formData.address}
                        className="w-full bg-[#206A5D] text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(32,106,93,0.3)] hover:brightness-110 transition-premium flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                      >
                        <MessageIcon /> Hubungi WhatsApp
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-ske-emerald/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-ske-emerald" />
                    </div>
                    <h3 className="text-lg font-black text-ske-dark uppercase tracking-widest mb-2">Inquiry Terkirim</h3>
                    <p className="text-[11px] font-bold text-ske-blue/60 uppercase tracking-widest">
                      SUCCESS: Tunggu balasan kami mengenai stok
                    </p>
                    <button 
                      onClick={() => setIsInquiryModalOpen(false)}
                      className="mt-8 text-[10px] font-black text-ske-blue uppercase tracking-widest border-b border-ske-blue pb-1 hover:text-ske-emerald hover:border-ske-emerald transition-premium"
                    >
                      Kembali ke Katalog
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.125.553 4.197 1.604 6.04L0 24l6.104-1.602a11.812 11.812 0 005.942 1.605h.005c6.634 0 12.032-5.392 12.035-12.029a11.72 11.72 0 00-3.487-8.489" />
  </svg>
);
