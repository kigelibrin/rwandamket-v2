"use client"; // This makes the page interactive
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import VendorCard from '../components/VendorCard';
import CategoryFilter from '../components/CategoryFilter';

export default function HomePage() {
  const [vendors, setVendors] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      setLoading(true);
      let query = supabase.from('vendors').select('*').order('is_verified', { ascending: false });

      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      const { data } = await query;
      setVendors(data || []);
      setLoading(false);
    }
    fetchVendors();
  }, [activeCategory]); // Re-run whenever the category changes!

  return (
    <main className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-black text-black tracking-tight">Rwandamket</h1>
        <p className="text-gray-500 mt-2">National Market & Premium Services</p>
      </header>

      <CategoryFilter activeCategory={activeCategory} setCategory={setActiveCategory} />

      {loading ? (
        <div className="text-center py-20 text-gray-400">Searching the market...</div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </section>
      )}

      {vendors.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No partners in this category yet.</p>
          <button className="text-blue-600 mt-2 text-sm underline">Apply to join as a partner</button>
        </div>
      )}
    </main>
  );
}
