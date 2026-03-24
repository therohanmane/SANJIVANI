import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

const Shop = () => {
  const products = [
    { id: 1, name: 'Logitech Wireless Keyboard & Mouse', price: '₹1,500', cat: 'Peripherals', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80' },
    { id: 2, name: 'HP LaserJet Pro Printer', price: '₹18,000', cat: 'Printers', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&q=80' },
    { id: 3, name: 'CP Plus 2MP CCTV Camera', price: '₹1,200', cat: 'Security', image: 'https://images.unsplash.com/photo-1557805174-8664ecad71da?w=500&q=80' },
    { id: 4, name: 'SanDisk 64GB Pendrive', price: '₹450', cat: 'Storage', image: 'https://images.unsplash.com/photo-1601004818451-b0dbb88339dc?w=500&q=80' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Tech Accessories</h1>
            <p className="text-slate-600">Premium quality products at the best prices.</p>
          </div>
          <button className="mt-4 md:mt-0 p-3 bg-white text-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 border border-slate-200">
            <ShoppingCart className="w-5 h-5"/>
            <span>Cart (0)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group flex flex-col">
              <div className="h-48 bg-slate-100 overflow-hidden p-4">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover mix-blend-multiply rounded-lg group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-primary-600 mb-2 tracking-wider uppercase">{p.cat}</div>
                  <h3 className="font-bold text-slate-900 leading-snug mb-2">{p.name}</h3>
                </div>
                <div className="flex items-center justify-between mt-4 pb-2">
                  <span className="text-lg font-extrabold text-slate-900">{p.price}</span>
                  <button className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
                    <ShoppingCart className="w-5 h-5"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Shop;
