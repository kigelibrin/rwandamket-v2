
"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ChefDashboard() {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadDashboardData() {
      // 1. Get the logged-in user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 2. Fetch the vendor profile linked to this user
        const { data: vendorData } = await supabase
          .from('vendors')
          .select('*')
          .eq('owner_id', user.id)
          .single();
        
        setVendor(vendorData);

        // 3. Fetch that vendor's products
        if (vendorData) {
          const { data: productData } = await supabase
            .from('products_services')
            .select('*')
            .eq('vendor_id', vendorData.id);
          setProducts(productData);
        }
      }
    }
    loadDashboardData();
  }, []);

  if (!vendor) return <p className="p-10">Loading your kitchen...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Chef Dashboard</h1>
        <div className="flex gap-2">
           {vendor.is_premium && <span className="bg-black text-white px-3 py-1 rounded-full text-xs">PREMIUM PLAN</span>}
           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">ONLINE</span>
        </div>
      </div>

      {/* Profile Update Section */}
      <section className="bg-white p-6 rounded-3xl border mb-6 shadow-sm">
        <h2 className="font-bold mb-4">Your Profile</h2>
        <div className="flex gap-4 items-center">
          <img src={vendor.image_url} className="w-16 h-16 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-bold text-lg">{vendor.name}</p>
            <p className="text-gray-500 text-sm">{vendor.location}</p>
          </div>
          <button className="border px-4 py-2 rounded-xl text-sm hover:bg-gray-50">Edit Profile</button>
        </div>
      </section>

      {/* Menu Management */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">Your Menu Items</h2>
          <button className="bg-black text-white px-4 py-2 rounded-xl text-sm">+ Add Item</button>
        </div>
        <div className="grid gap-3">
          {products.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
               <div>
                 <p className="font-bold">{item.name}</p>
                 <p className="text-xs text-gray-500">{item.price.toLocaleString()} RWF</p>
               </div>
               <div className="flex gap-2">
                 <button className="text-sm text-blue-600">Update</button>
                 <button className="text-sm text-red-600">Delete</button>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
