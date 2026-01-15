"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import VendorCard from '../components/VendorCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar'; // Import the new search bar

export default function HomePage() {
  const [vendors, setVendors] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState(''); // New State for Search
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      setLoading(true);
      
      // Start the query
      let query = supabase.from('vendors').select('*');

      // Filter 1: By Category
      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      // Filter 2: By Search Term (Searches name, bio, and location)
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
      }

      // Order by Verification
      query = query.order('is_verified', { ascending: false });

      const { data } = await query;
      setVendors(data || []);
      setLoading(false);
    }

    // Debounce search slightly to avoid too many database calls
    const delayDebounceFn = setTimeout(() => {
      fetchVendors();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [activeCategory, searchTerm]); // Re-runs when either changes

  return (
    <main className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-black text-black tracking-tight">Rwandamket</h1>
        <p className="text-gray-500 mt-2">Discover the best of Rwanda</p>
      </header>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryFilter activeCategory={activeCategory} setCategory={setActiveCategory} />

      {loading ? (
        <div className="text-center py-20 text-gray-400">Updating market results...</div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </section>
      )}
      
      {/* Empty State */}
      {vendors.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-500">No results found for "{searchTerm || activeCategory}"</p>
        </div>
      )}
    </main>
  );
}

// components/SearchBar.js
export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-400">🔍</span>
      </div>
      <input
        type="text"
        placeholder="Search chefs, decor, or locations (e.g. Vision City)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-sm transition-all shadow-sm"
      />
    </div>
  );
}

const handleWhatsAppOrder = async (item, vendor) => {
  // 1. Log the order in Supabase for your records
  const { error } = await supabase
    .from('orders')
    .insert([{
      vendor_id: vendor.id,
      product_id: item.id,
      item_name: item.name,
      price: item.price,
      customer_name: 'Marketplace User' 
    }]);

  if (error) console.error("Order logging failed:", error);

  // 2. Format the phone number (remove spaces/pluses)
  const cleanPhone = vendor.whatsapp_number.replace(/\D/g, ''); 

  // 3. Create the professional message
  const message = encodeURIComponent(
    `Hello ${vendor.name}, I found your ${item.name} on Rwandamket! 
    
Item: ${item.name}
Price: ${item.price.toLocaleString()} RWF

Is this available for booking?`
  );

  // 4. Redirect to WhatsApp
  window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
};
