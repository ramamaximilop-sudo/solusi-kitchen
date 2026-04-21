import { motion, AnimatePresence } from "motion/react";
import { Shield, Settings, Headset, MessageCircle, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { ProductCatalog } from "./components/ProductCatalog.tsx";
import { ContactSection } from "./components/ContactSection.tsx";
import { AboutSection } from "./components/AboutSection.tsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-[70px] md:h-[80px]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-0 group">
          <span className="text-lg md:text-xl font-black text-ske-dark uppercase tracking-tight group-hover:text-ske-emerald transition-premium">SKE</span>
          <span className="text-gray-300 mx-3 md:mx-4 font-light">|</span>
          <span className="hidden sm:inline text-[10px] md:text-xs font-bold text-ske-blue uppercase tracking-widest group-hover:text-ske-emerald transition-premium">Solution Kitchen Expert</span>
          <span className="sm:hidden text-[10px] font-bold text-ske-blue uppercase tracking-widest group-hover:text-ske-emerald transition-premium">Expert</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group relative text-sm font-bold uppercase tracking-widest transition-premium hover:-translate-y-0.5 ${
                  isActive ? 'text-ske-emerald' : 'text-ske-dark hover:text-ske-emerald'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-ske-emerald transition-premium ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-ske-dark p-2 transition-premium hover:text-ske-emerald" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden absolute top-[70px] left-0 right-0 bg-white shadow-xl border-t border-gray-100 p-8 flex flex-col gap-6 z-[60]"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                   className={`text-2xl font-black uppercase tracking-widest transition-all flex items-center gap-4 ${
                     isActive ? 'text-ske-emerald translate-x-2' : 'text-ske-dark hover:translate-x-2'
                   }`}
                  onClick={() => setIsOpen(false)}
                >
                  {isActive && <div className="w-8 h-1 bg-ske-emerald" />}
                  {item.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="pt-24 md:pt-32 border-b border-gray-300">
      <div className="grid md:grid-cols-2 min-h-[360px]">
        <div className="flex flex-col justify-center px-12 py-16 bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-ske-dark leading-none tracking-tight mb-4 uppercase">
              SKE: OPTIMALKAN<br />DAPUR PROFESIONAL<br />ANDA.
            </h1>
            <p className="text-sm text-ske-blue mb-10 max-w-md font-medium leading-relaxed">
              Solusi total peralatan dapur industrial untuk restoran, hotel, dan catering. Efisiensi, daya tahan, dan kualitas purna jual terbaik.
            </p>
            <div>
              <Link 
                to="/products"
                className="inline-block bg-ske-emerald text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-4 hover:shadow-2xl hover:brightness-110 hover:-translate-y-1 transition-premium"
              >
                JELAJAHI PRODUK SKE
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="hero-bg flex items-center justify-center p-12">
          <div className="w-full h-full border-[12px] border-white shadow-2xl overflow-hidden relative group aspect-video md:aspect-auto min-h-[250px]">
            <img 
              src="https://images.unsplash.com/photo-1590620962723-de89e2236309?auto=format&fit=crop&q=80&w=1000" 
              alt="Kitchen Equipment" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ske-dark to-transparent opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white text-[10px] font-bold tracking-widest uppercase z-10">GEA/GETRA PREMIUM SERIES</div>
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono text-[8px] uppercase tracking-[0.5em] p-4 text-center">
              Commercial Kitchen Showcase
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section id="products-preview" className="border-b border-gray-300">
      <div className="grid md:grid-cols-5 min-h-[200px]">
        <div className="md:col-span-2 px-12 py-10 flex flex-col justify-center bg-ske-bg">
          <h2 className="text-xl md:text-2xl font-black text-ske-dark leading-tight mb-4 uppercase">
            DARI KONSEPSI HINGGA<br />INSTALASI DAPUR.
          </h2>
          <div className="flex space-x-2 items-center">
            <div className="w-12 h-[2px] bg-ske-emerald"></div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-ske-blue">Proses Profesional SKE</span>
          </div>
        </div>

        <div className="md:col-span-3 grid md:grid-cols-2 gap-8 px-12 py-10 items-center bg-white">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 group">
              <span className="text-ske-emerald font-black text-xs pt-0.5">01</span>
              <div>
                <h3 className="text-[11px] font-bold text-ske-blue leading-snug uppercase transition-premium group-hover:text-ske-emerald group-hover:translate-x-1">Consultation & Design</h3>
                <p className="text-[10px] text-ske-blue/70 leading-snug">Perencanaan tata letak efisien.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 group">
              <span className="text-ske-emerald font-black text-xs pt-0.5">02</span>
              <div>
                <h3 className="text-[11px] font-bold text-ske-blue leading-snug uppercase transition-premium group-hover:text-ske-emerald group-hover:translate-x-1">Equipment Supply</h3>
                <p className="text-[10px] text-ske-blue/70 leading-snug">Produk Resmi Bergaransi</p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-32 bg-gray-200 rounded flex items-center justify-center border border-gray-300 group cursor-pointer overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000" 
              alt="Workshop" 
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-ske-emerald flex items-center justify-center bg-white shadow-lg group-hover:scale-110 group-hover:shadow-ske-emerald/20 transition-premium z-10">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-ske-emerald border-b-[6px] border-b-transparent ml-1"></div>
              </div>
            </div>
            <span className="absolute bottom-2 right-2 text-[8px] font-bold uppercase text-white drop-shadow-md z-10">Workshop Overview</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="w-6 h-6 mb-2 icon-svg" />,
      title: "PRODUK ASLI & GARANSI",
      desc: "Dukungan penuh Sparepart Resmi"
    },
    {
      icon: <Settings className="w-6 h-6 mb-2 icon-svg" />,
      title: "DESAIN DAPUR PROFESIONAL",
      desc: "Konsultasi tata ruang & alur kerja."
    },
    {
      icon: <Headset className="w-6 h-6 mb-2 icon-svg" />,
      title: "LAYANAN PURNA JUAL",
      desc: "Tim teknisi responsif di area Bekasi."
    }
  ];

  return (
    <section id="about-us" className="bg-ske-blue grid md:grid-cols-3 min-h-[128px]">
      {benefits.map((benefit, idx) => (
        <motion.div
          key={idx}
          whileHover={{ backgroundColor: "#EBECF1", color: "#1B1C25" }}
          className={`p-6 flex flex-col justify-center text-white transition-all duration-200 cursor-pointer border-gray-300/10 border-b md:border-b-0 ${idx !== benefits.length - 1 ? 'md:border-r' : ''} group`}
        >
          <div className="text-white group-hover:text-ske-dark transition-colors">
            {benefit.icon}
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider group-hover:text-ske-dark transition-colors">
            {benefit.title}
          </h3>
          <p className="text-[9px] opacity-60 mt-1 group-hover:text-ske-dark group-hover:opacity-100 transition-all">
            {benefit.desc}
          </p>
        </motion.div>
      ))}
    </section>
  );
};

const WhatsAppFloat = () => {
  return (
    <div className="fixed bottom-6 right-6 flex items-center group z-[100]">
      <div className="bg-white px-4 py-2 rounded-full shadow-lg mr-3 text-[10px] font-bold text-ske-dark opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none">
        Butuh bantuan? Hubungi kami
      </div>
      <motion.a
        href="https://wa.me/628128504818"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, shadow: "0 20px 40px -10px rgba(37, 211, 102, 0.4)" }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-premium"
      >
        <MessageCircle size={30} fill="white" className="text-white" />
      </motion.a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-white border-t border-gray-300">
      <div className="py-20 max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-16">
        {/* Branding Column */}
        <div className="space-y-8">
          <div className="flex items-center gap-0 group cursor-default">
            <span className="text-xl font-black text-ske-dark uppercase tracking-tight">SKE</span>
            <span className="text-gray-300 mx-4 font-light">|</span>
            <span className="text-[10px] font-bold text-ske-blue uppercase tracking-widest leading-none">Solution Kitchen Expert</span>
          </div>
          <p className="text-ske-blue/60 text-xs leading-relaxed font-medium max-w-sm">
            Penyedia solusi dapur industrial terpercaya sejak 2019. Melayani kebutuhan kitchen equipment dan fabrikasi stainless steel dengan kualitas purna jual terbaik.
          </p>
        </div>
        
        {/* Location Column */}
        <div>
          <h4 className="text-[10px] font-black text-ske-blue mb-8 uppercase tracking-[0.25em]">LOKASI KAMI</h4>
          <div className="space-y-6">
            <div>
              <p className="text-[9px] font-black text-ske-emerald uppercase mb-1.5 tracking-widest">OFFICE</p>
              <p className="text-[11px] font-bold text-ske-dark leading-relaxed uppercase tracking-tight">
                Jl. Alamanda Raya Block C1 No. 19 Taman Alamanda, Bekasi.
              </p>
            </div>
            <div>
              <p className="text-[9px] font-black text-ske-emerald uppercase mb-1.5 tracking-widest">WORKSHOP</p>
              <p className="text-[11px] font-bold text-ske-dark leading-relaxed uppercase tracking-tight">
                Teluk Pucung Jl. Perjuangan KM.3 Teluk Pucung, Bekasi, 17510.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-[10px] font-black text-ske-blue mb-8 uppercase tracking-[0.25em]">KONTAK</h4>
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-ske-emerald uppercase mb-1 tracking-widest">Email Inquiry</span>
              <a 
                href="mailto:rockman.ske@gmail.com" 
                className="text-xs font-bold text-ske-dark hover:text-ske-emerald hover:-translate-y-0.5 transition-premium"
              >
                rockman.ske@gmail.com
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-ske-emerald uppercase mb-1 tracking-widest">WhatsApp / Phone</span>
              <a 
                href="https://wa.me/628128504818" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-ske-dark hover:text-ske-emerald hover:-translate-y-0.5 transition-premium"
              >
                08128504818
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-[#EBECF1] border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-bold text-ske-dark/40 tracking-[0.2em] uppercase">
            © 2019 - 2026 SKE | Solution Kitchen Expert. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[9px] font-bold text-ske-dark/40 tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-ske-dark transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ske-dark transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <HowItWorks />
    <Benefits />
  </>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="selection:bg-ske-emerald selection:text-white overflow-x-hidden min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}
