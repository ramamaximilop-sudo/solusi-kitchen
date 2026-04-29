import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Shield, Target, Award } from "lucide-react";

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Authenticity",
      desc: "Original products sourced directly from global brands like GEA and Getra.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision",
      desc: "Expert custom fabrication tailored to your specific kitchen layout and needs.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Reliability",
      desc: "Unmatched after-sales service and technical support to keep your kitchen running.",
    },
  ];

  return (
    <section ref={containerRef} id="about-us" className="bg-ske-blue pt-40 pb-32 overflow-hidden relative">
      {/* Parallax Background Noise/Texture */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-10 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[url('https://yerutlqkfjjcrfqsmupz.supabase.co/storage/v1/object/public/FOTO%20produck/Dish%20washer/grok-image-9deb4f16-0046-4d33-b735-ec1d4858b5db.png')] scale-150"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-2 items-center mb-6">
              <div className="w-12 h-[2px] bg-ske-emerald"></div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">Mitra Terpercaya Anda</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-ske-bg uppercase leading-none tracking-tight mb-8 italic">
              TENTANG KAMI
            </h2>
            
            <p className="text-lg text-ske-bg/80 leading-relaxed font-medium mb-12 border-l-4 border-ske-emerald pl-8 py-2">
              SKE | Solution Kitchen Expert adalah mitra terpercaya dalam penyediaan dan fabrikasi peralatan dapur industrial. Berbasis di Bekasi, kami mengintegrasikan teknologi dari brand global seperti GEA dan Getra dengan keahlian teknis lokal untuk menciptakan ekosistem dapur yang efisien dan tahan lama.
            </p>

            <div className="grid gap-8">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 group cursor-default"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-ske-emerald/10 flex items-center justify-center text-ske-emerald group-hover:bg-ske-emerald group-hover:text-white transition-premium">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-ske-emerald transition-premium">{value.title}</h3>
                    <p className="text-sm text-ske-bg/60 font-medium leading-relaxed max-w-md">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-ske-bg">
              <div 
                style={{ backgroundImage: "url('https://yerutlqkfjjcrfqsmupz.supabase.co/storage/v1/object/public/FOTO%20produck/grok-image-e59c4c94-f697-4970-bb83-5e0a8567619d.png" }}
                className="absolute inset-0 w-full h-full bg-cover bg-center  opacity-80"
              ></div>
              <div className="absolute inset-0 bg-ske-blue/40"></div>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-10 left-10 right-10 bg-ske-emerald p-8 rounded-2xl shadow-2xl">
                 <h4 className="text-white font-black uppercase text-xl leading-none mb-2 tracking-tighter">Fabrikasi & Instalasi</h4>
                 <p className="text-white/80 text-xs font-bold uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">Kualitas Standar Industrial Bekasi</p>
              </div>
            </div>

            {/* Design Accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-t-8 border-r-8 border-white/5 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-8 border-l-8 border-ske-emerald/20 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
