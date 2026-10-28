import { ShoppingCart, MessageCircle, Phone, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useSiteContext } from '../context/SiteContext';

const Shop = () => {
  const { settings } = useSiteContext();

  const products = [
    { 
      id: 1, 
      name: 'Logitech Wireless Keyboard & Mouse Combo', 
      price: '₹1,450', 
      cat: 'Peripherals', 
      desc: 'Durable full-size keyboard and optical mouse with USB wireless receiver.',
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80' 
    },
    { 
      id: 2, 
      name: 'HP LaserJet Pro Mono Printer', 
      price: '₹16,500', 
      cat: 'Printers', 
      desc: 'High-speed mono laser printer for offices, shops, and institutions.',
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&q=80' 
    },
    { 
      id: 3, 
      name: 'CP PLUS 2MP Full HD CCTV Camera', 
      price: '₹1,250', 
      cat: 'Security', 
      desc: 'High clarity IR night-vision bullet/dome camera for commercial and home security.',
      image: 'https://images.unsplash.com/photo-1557805174-8664ecad71da?w=500&q=80' 
    },
    { 
      id: 4, 
      name: 'SanDisk 64GB Ultra USB 3.0 Pen Drive', 
      price: '₹480', 
      cat: 'Storage', 
      desc: 'High-speed flash drive for fast data backup and transfer.',
      image: 'https://images.unsplash.com/photo-1601004818451-b0dbb88339dc?w=500&q=80' 
    },
    { 
      id: 5, 
      name: 'Kingston 500GB NVMe M.2 High-Speed SSD', 
      price: '₹3,200', 
      cat: 'Storage', 
      desc: 'Boost PC and laptop speed by up to 5x with fast read/write speeds.',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80' 
    },
    { 
      id: 6, 
      name: 'Cat6 High-Speed RJ45 Network Cable (Patch Cord)', 
      price: '₹180', 
      cat: 'Networking', 
      desc: 'Gold-plated connectors for interference-free Gigabit LAN connections.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80' 
    }
  ];

  const cleanPhone = settings.phone ? settings.phone.replace(/[^0-9]/g, '') : '919860342172';
  const cleanWhatsApp = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : cleanPhone;

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12 sm:py-16">
      <div className="section-container">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F7] border border-[#FAD3E6] text-[#9C225B] text-xs font-semibold mb-3">
            <ShoppingCart className="w-4 h-4" />
            <span>Hardware Sales & Peripherals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#163262] tracking-tight">
            IT Hardware & Tech Accessories
          </h1>
          <p className="text-[#667085] text-base mt-2">
            Genuine peripherals, networking cables, storage upgrades, and printer consumables available at our Kurkumbh store.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#E4E7EC] shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <div className="h-48 bg-slate-50 overflow-hidden relative border-b border-[#E4E7EC]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#9C225B] block mb-1.5">
                    {p.cat}
                  </span>
                  <h3 className="font-bold text-base text-[#163262] leading-snug mb-2">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4E7EC] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#667085] block">Approx. Price</span>
                    <span className="text-base font-extrabold text-[#163262]">{p.price}</span>
                  </div>

                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Sanjivani%20Computer,%20is%20${encodeURIComponent(p.name)}%20available%20in%20stock?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-[#16A34A] hover:bg-emerald-100 text-xs font-bold rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Check Stock
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Store Counter Notice */}
        <div className="mt-12 bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-[#163262]">
              Looking for a specific component, RAM, or cable?
            </h3>
            <p className="text-xs text-[#667085] mt-1">
              Visit our store near Primary School, Kurkumbh, or call our team to check immediate availability.
            </p>
          </div>
          <a
            href={`tel:${settings.phone}`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#9C225B] hover:bg-[#83184B] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            Call {settings.phone}
          </a>
        </div>

      </div>
    </div>
  );
};

export default Shop;
