"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import VendorCard from '../components/VendorCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [vendors, setVendors] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      setLoading(true);
      let query = supabase.from('vendors').select('*');

      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (!error) setVendors(data);
      setLoading(false);
    }

    fetchVendors();
  }, [activeCategory, searchTerm]); // <--- THE MOST IMPORTANT LINE

  return (
    <main className="min-h-screen bg-white p-6">
      <header className="max-w-7xl mx-auto mb-10 mt-6 text-center sm:text-left">
        <h1 className="text-5xl font-black text-black mb-2 italic tracking-tighter">RWANDAMKET</h1>
        <p className="text-gray-500 font-medium">Kigali's Premium Service Marketplace</p>
      </header>

      <div className="max-w-7xl mx-auto">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter activeCategory={activeCategory} setCategory={setActiveCategory} />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((n) => <div key={n} className="h-80 bg-gray-50 animate-pulse rounded-3xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {vendors.map((v) => <VendorCard key={v.id} vendor={v} />)}
          </div>
        )}
      </div>
    </main>
  );
}
