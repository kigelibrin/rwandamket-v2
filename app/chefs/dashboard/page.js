"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
// These are the imports that bring your custom tools into the page
import SubscriptionStatus from '../../components/SubscriptionStatus'; 
import AddItemForm from '../../components/AddItemForm'; 
import Badge from '../../components/Badge';

export default function ChefDashboard() {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    async function loadDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: vendorData } = await supabase
          .from('vendors')
          .select('*')
          .eq('owner_id', user.id)
          .single();
        
        setVendor(vendorData);

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

  if (!vendor) return <div className="p-20 text-center">Loading your kitchen...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* 1. Subscription Status (The component you moved) */}
      <SubscriptionStatus isPremium={vendor.is_premium} />

      <div className="mt-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black">Hello, {vendor.name}</h1>
          <p className="text-gray-500">Manage your National Market presence</p>
        </div>
        {vendor.is_verified && <Badge type="verified" />}
      </div>

      {/* 2. Notifications Area */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
        <span className="text-xl">🔔</span>
        <div>
          <p className="text-sm font-bold text-blue-900">New Achievement!</p>
          <p className="text-xs text-blue-700">You've reached 10 orders. Your "Top Chef" badge is being processed.</p>
        </div>
      </div>

      {/* 3. Menu Management */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Menu</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm"
          >
            {showAddForm ? 'Close' : '+ Add New Dish'}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-8">
            <AddItemForm vendorId={vendor.id} onComplete={() => {
              setShowAddForm(false);
              // Logic to refresh the list would go here
            }} />
          </div>
        )}

        <div className="grid gap-4">
          {products.map(item => (
            <div key={item.id} className="p-4 border rounded-2xl flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-4">
                <img src={item.image_url} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.price.toLocaleString()} RWF</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 text-sm">Remove</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
