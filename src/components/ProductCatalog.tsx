import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  ShoppingCart, 
  Filter, 
  ChevronRight, 
  Search,
  LayoutGrid,
  List,
  ChevronLeft
} from 'lucide-react';

// --- HELPER: Format Mata Uang ---
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const ProductCatalog = () => {
  // State untuk filtering dan view
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Data Dummy (Sesuaikan dengan data asli kamu nanti)
  const products = [
    { id: 1, name: 'GEA STAINLESS STEEL UNDER COUNTER FREEZER L-RW6T4HHHH', brand: 'GEA', category: 'FREEZER', price: 19008000, image: '/api/placeholder/400/500' },
    { id: 2, name: 'GEA CHEST FREEZER AB-208-R', brand: 'GEA', category: 'FREEZER', price: 0, image: '/api/placeholder/400/500' },
    { id: 3, name: 'FOMAC GAS OVEN BOV-ARF20H', brand: 'FOMAC', category: 'OVEN', price: 8500000, image: '/api/placeholder/400/500' },
    // ... tambahkan data lainnya sesuai katalog Solusi Kitchen Expert
  ];

  // Logic Filtering
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const catMatch = selectedCategory === 'ALL' || p.category === selectedCategory;
      const brandMatch = selectedBrand === 'ALL' || p.brand === selectedBrand;
      return catMatch && brandMatch;
    });
  }, [selectedCategory, selectedBrand]);

  // Logic Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handlers
  const handleDetailRequest = (product: any) => {
    console.log("Opening details for:", product.name);
    // Logika buka modal atau navigasi ke detail produk
  };

  const handleInquiryRequest = (product: any) => {
    const message = `Halo Solusi Kitchen Expert, saya ingin tanya stok untuk produk: ${product.name}`;
    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 font-sans">
      
      {/* BREADCRUMB & HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
            <span>Home</span>
            <ChevronRight size={10} />
            <span className="text-ske-emerald">Products</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-ske-dark uppercase tracking-tighter leading-none">
            Marketplace <br />
            <span className="text-ske-emerald">Kitchen Equipment</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <span>Showing {filteredProducts.length} Results</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* SIDEBAR FILTER (Hidden on mobile for now or can be turned into drawer) */}
        <aside className="lg:col-span-3 space-y-10">
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-ske-dark mb-6 flex items-center gap-2">
              <Filter size={14} className="text-ske-emerald" /> Categories
            </h4>
            <div className="space-y-2">
              {['ALL', 'FREEZER', 'CHILLER', 'OVEN', 'STOVE'].map(cat => (
                <button
                  key={cat}
                  onClick={() => {setSelectedCategory(cat); setCurrentPage(1);}}
                  className={`block w-full text-left text-[10px] font-bold uppercase tracking-widest py-2 px-4 transition-all ${
                    selectedCategory === cat ? 'bg-ske-emerald text-white border-l-4 border-ske-dark' : 'text-gray-500 hover:text-ske-emerald'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-ske-dark mb-6">Authorized Brands</h4>
            <div className="grid grid-cols-2 gap-2">
              {['ALL', 'GEA', 'GETRA', 'FOMAC', 'CROWN'].map(brand => (
                <button
                  key={brand}
                  onClick={() => {setSelectedBrand(brand); setCurrentPage(1);}}
                  className={`text-[9px] font-black uppercase py-3 border transition-all ${
                    selectedBrand === brand ? 'bg-ske-dark text-white border-ske-dark' : 'border-gray-100 text-gray-400 hover:border-ske-emerald'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN PRODUCT GRID */}
        <main className="lg:col-span-9">
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
                  className="group relative"
                >
                  {/* KONTINER GAMBAR (UX FIX: Clickable on Mobile) */}
                  <div 
                    onClick={() => window.innerWidth < 768 && handleDetailRequest(product)}
                    className="relative aspect-[4/5] bg-white border border-gray-100 overflow-hidden mb-6 flex items-center justify-center p-12 transition-all duration-700 group-hover:border-ske-emerald md:group-hover:shadow-2xl md:group-hover:shadow-ske-emerald/5 cursor-pointer md:cursor-default"
                  >
                    <div className="absolute top-0 left-0 bg-ske-dark text-white text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 z-10 origin-top-left -rotate-90 -translate-x-full md:group-hover:translate-x-0 transition-transform duration-500">
                      {product.brand}
                    </div>

                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply md:group-hover:scale-110 transition-transform duration-1000 ease-out" 
                      referrerPolicy="no-referrer" 
                    />
                    
                    <div className="absolute inset-0 bg-ske-emerald/0 md:group-hover:bg-ske-emerald/5 transition-colors duration-500" />
                    
                    {/* BUTTONS: Always visible on Mobile, Hover on Desktop */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 z-20 
                      opacity-100 translate-y-0 md:opacity-0 md:translate-y-12 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDetailRequest(product); }}
                        className="flex-1 bg-ske-dark text-white text-[9px] font-black uppercase tracking-widest py-4 hover:bg-ske-emerald active:bg-ske-emerald transition-colors flex items-center justify-center gap-2 shadow-xl md:shadow-none"
                      >
                        Details
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleInquiryRequest(product); }}
                        className="w-14 bg-white border border-ske-dark text-ske-dark flex items-center justify-center hover:bg-ske-dark hover:text-white active:bg-ske-dark active:text-white transition-all shadow-xl md:shadow-none"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>

                  {/* INFO PRODUK + VISUAL FILLER */}
                  <div className="relative px-2 overflow-hidden">
                    {/* Background Text Accent: Mengisi kekosongan di belakang judul */}
                    <span className="absolute -right-4 -top-2 text-[40px] font-black text-gray-400/5 select-none pointer-events-none uppercase italic tracking-tighter transition-all duration-700 md:group-hover:text-ske-emerald/10 md:group-hover:-right-2">
                      {product.brand}
                    </span>

                    <p className="text-[9px] font-black text-ske-emerald uppercase tracking-[0.2em] mb-1 relative z-10">
                      {product.category}
                    </p>
                    
                    <h3 
                      onClick={() => handleDetailRequest(product)}
                      className="text-sm font-black text-ske-dark uppercase tracking-tight leading-tight md:group-hover:text-ske-emerald transition-colors line-clamp-2 min-h-[40px] relative z-10 cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <div className="pt-2 border-t border-gray-100 mt-4 flex items-center justify-between relative z-10">
                      <span className="text-lg font-black text-ske-dark">
                        {product.price > 0 ? formatPrice(product.price) : 'Rp0'}
                      </span>
                      <div className="flex items-center gap-1 text-[8px] font-black text-ske-blue/30 uppercase tracking-tighter">
                        <Shield size={10} /> Official Warranty
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-4">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="w-12 h-12 border border-gray-100 flex items-center justify-center text-ske-dark hover:bg-ske-dark hover:text-white disabled:opacity-20 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-12 h-12 text-[11px] font-black transition-all ${
                      currentPage === i + 1 ? 'bg-ske-emerald text-white' : 'bg-white text-ske-dark border border-gray-100 hover:border-ske-emerald'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="w-12 h-12 border border-gray-100 flex items-center justify-center text-ske-dark hover:bg-ske-dark hover:text-white disabled:opacity-20 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
