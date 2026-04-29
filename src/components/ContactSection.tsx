import { motion } from "motion/react";
import { MapPin, Mail, Phone, ExternalLink, Settings } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact-us" className="pt-32 pb-24 bg-ske-bg border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex space-x-2 items-center mb-4">
            <div className="w-12 h-[2px] bg-ske-emerald"></div>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-ske-blue">SKE Contact Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-ske-dark uppercase leading-none tracking-tight mb-4">
            HUBUNGI KAMI
          </h2>
          <p className="text-sm text-ske-blue font-medium max-w-xl">
            Tim ahli kami siap membantu perencanaan dapur industrial Anda.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Address Block */}
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-ske-emerald group-hover:bg-ske-emerald group-hover:text-white transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-ske-dark uppercase tracking-widest mb-3">Lokasi Kantor & Workshop</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-bold text-ske-blue uppercase tracking-wider mb-1">Office:</p>
                      <p className="text-xs font-bold text-ske-dark leading-relaxed">
                        Jl. Alamanda Raya Block C1 No. 19 Taman Alamanda, Bekasi.
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-ske-blue uppercase tracking-wider mb-1">Workshop:</p>
                      <p className="text-xs font-bold text-ske-dark leading-relaxed">
                        Teluk Pucung Jl. Perjuangan KM.3 Teluk Pucung, Bekasi, 17510.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Communication Blocks */}
              <div className="flex gap-6 group">
                <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-ske-emerald group-hover:bg-ske-emerald group-hover:text-white transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-ske-dark uppercase tracking-widest mb-2">Email Inquiry</h4>
                  <a 
                    href="mailto:rockman.ske@gmail.com"
                    className="text-sm font-black text-ske-dark hover:text-ske-emerald hover:-translate-y-0.5 transition-premium tracking-tight flex items-center gap-2"
                  >
                    rockman.ske@gmail.com
                    <ExternalLink size={12} className="opacity-30" />
                  </a>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-ske-emerald group-hover:bg-ske-emerald group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-ske-dark uppercase tracking-widest mb-2">WhatsApp / Phone</h4>
                  <a 
                    href="https://wa.me/628128504818"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-2xl font-black text-ske-emerald hover:brightness-110 hover:-translate-y-0.5 transition-premium tracking-tighter"
                  >
                    08128504818
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white border border-gray-200 relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-xs font-black text-ske-dark uppercase tracking-widest mb-2">Konsultasi Desain Dapur?</h4>
                <p className="text-[11px] text-ske-blue/60 leading-relaxed font-medium mb-6">
                  Siapkan dimensi ruangan Anda, dan ahli kami akan merancang alur kerja yang efisien secara gratis.
                </p>
                <a 
                  href="https://wa.me/628128504818?text=Halo%20SKE%2C%20saya%20ingin%20konsultasi%20mengenai%20desain%20tata%20ruang%20dapur%20industrial%20saya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[10px] font-black text-ske-emerald uppercase tracking-[0.2em] border-b-2 border-ske-emerald pb-1 transition-premium group-hover:tracking-[0.3em] group-hover:translate-x-1"
                >
                  Mulai Konsultasi &rarr;
                </a>
              </div>
              <div className="absolute top-0 right-0 p-8 text-gray-100 -mr-4 -mt-4 group-hover:text-ske-emerald/5 transition-colors">
                <Settings size={80} />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[500px] w-full bg-white border border-gray-300 p-2 rounded-3xl overflow-hidden shadow-xl shadow-ske-dark/5"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5828458732007!2d107.0016629!3d-6.2132174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c8e547379d3%3A0x286395e9df52c5c9!2sBekasi%20Utara%2C%20Kota%20Bks%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1714371234567!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
