
// components/AddItemForm.js
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AddItemForm({ vendorId, onComplete }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('products_services')
      .insert([
        { 
          name, 
          price: parseInt(price), 
          description, 
          vendor_id: vendorId,
          type: 'food' // Defaulting to food for chefs
        }
      ]);

    if (!error) {
      alert("Item added to your menu!");
      onComplete(); // Refresh the list
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-200">
      <h3 className="font-bold text-lg">Add New Menu Item</h3>
      <input 
        type="text" placeholder="Dish Name" required
        className="w-full p-3 rounded-xl border"
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="number" placeholder="Price (RWF)" required
        className="w-full p-3 rounded-xl border"
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea 
        placeholder="Short description..." 
        className="w-full p-3 rounded-xl border"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="w-full bg-black text-white p-3 rounded-xl font-bold">
        Save to Menu
      </button>
    </form>
  );
}
