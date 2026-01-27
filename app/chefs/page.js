"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import VendorCard from '../components/VendorCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
  const [vendors, setVendors] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      setLoading(true);
      
      let query = supabase.from('vendors').select('*');

      // Filter by category if one is selected
      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      const { data, error } = await query;

      if (!error) {
        setVendors(data);
      }
      setLoading(false);
    }

    fetchVendors();
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-white p-6">
      {/* Header Area */}
      <header className="max-w-7xl mx-auto mb-10 mt-6">
        <h1 className="text-4xl font-black text-black mb-2 italic">RWANDAMKET</h1>
        <p className="text-gray-500 font-medium">Discover Rwanda's finest chefs, decor, and services.</p>
      </header>

      {/* Category Filter Component */}
      <div className="max-w-7xl mx-auto">
        <CategoryFilter 
          activeCategory={activeCategory} 
          setCategory={setActiveCategory} 
        />

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-gray-100 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          /* Vendor Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400 text-lg font-medium tracking-tight">
                  No vendors found in this category yet. 🇷🇼
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
