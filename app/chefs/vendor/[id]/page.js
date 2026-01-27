"use client"; // Required for useState and onClick
import { useEffect, useState } from 'react';
import { supabase } from 'supabaseClient.js/lib/supabase';
import ProductCard from '../../../components/ProductCard'; 
import Link from 'next/link';

export default function VendorProfile({ params }) {
  const { id } = params;
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Vendor Details
      const { data: vendorData } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', id)
        .single();

      // 2. Fetch Vendor's Menu Items
      const { data: productsData } = await supabase
        .from('products_services')
        .select('*')
        .eq('vendor_id', id);

      setVendor(vendorData);
      setProducts(productsData || []);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleWhatsAppOrder = async (item) => {
    // 1. Show the Success Message (Toast)
    setShowToast(true);

    // 2. Save the order to Supabase for tracking
    await supabase.from('orders').insert([{
      vendor_id: vendor.id,
      product_id: item.id,
      item_name: item.name,
      price: item.price
    }]);

    // 3. Wait 1.5 seconds so they see the toast, then redirect
    setTimeout(() => {
      setShowToast(false);
      const cleanPhone = vendor.whatsapp_number.replace(/\D/g, ''); 
      const message = encodeURIComponent(
        `Hello ${vendor.name}, I found your ${item.name} on Rwandamket! Is it available?`
      );
      window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    }, 1500);
  };

  if (loading) return <div className="p-20 text-center text-gray-400">Loading profile...</div>;
  if (!vendor) return <div className="p-20 text-center">Vendor not found.</div>;

  return (
    <Link 
  href="/" 
  className="absolute top-6 left-6 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold transition"
>
  ← Back to Market
</Link>
    <main className="min-h-screen bg-white relative">
      {/* Hero Header */}
      <div className="h-72 bg-gray-900 relative">
        <img 
          src={vendor.image_url || 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80'} 
          className="w-full h-full object-cover opacity-60"
          alt={vendor.name}
        />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-3">
            <h1 className="text-5xl font-black">{vendor.name}</h1>
            {vendor.is_verified && (
              <span className="bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Verified
              </span>
            )}
          </div>
          <p className="text-gray-200 mt-2 text-lg font-medium">📍 {vendor.location} • {vendor.category}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-black">About</h2>
          <p className="text-gray-600 leading-relaxed text-lg max-w-3xl">
            {vendor.bio}
          </p>
        </section>

        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">Menu & Services</h2>
            <span className="text-gray-400 text-sm">{products.length} items available</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((item) => (
              <ProductCard 
                key={item.id} 
                item={item} 
                onOrder={() => handleWhatsAppOrder(item)} 
              />
            ))}
          </div>
        </section>
      </div>

      {/* SUCCESS TOAST MESSAGE */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-black text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <span className="text-2xl">🇷🇼</span>
            <div>
              <p className="font-bold text-sm">Booking Logged!</p>
              <p className="text-[10px] text-gray-400">Opening WhatsApp conversation...</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
