// components/AddItemForm.js
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AddItemForm({ vendorId, onComplete }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('products_services')
      .insert([
        { 
          name, 
          price: parseInt(price), 
          description, 
          vendor_id: vendorId,
          type: 'service' // This should ideally match the vendor's main category
        }
      ]);

    if (!error) {
      // Clear form for next item
      setName('');
      setPrice('');
      setDescription('');
      onComplete(); 
    } else {
      alert("Error saving: " + error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
      <h3 className="font-bold text-lg text-black">Add New Listing</h3>
      
      <input 
        type="text" placeholder="Name (e.g., Private Chef Service)" required
        value={name}
        className="w-full p-4 rounded-2xl border bg-white focus:ring-2 focus:ring-black outline-none transition"
        onChange={(e) => setName(e.target.value)}
      />
      
      <input 
        type="number" placeholder="Price (RWF)" required
        value={price}
        className="w-full p-4 rounded-2xl border bg-white focus:ring-2 focus:ring-black outline-none transition"
        onChange={(e) => setPrice(e.target.value)}
      />
      
      <textarea 
        placeholder="Describe what is included..." 
        value={description}
        className="w-full p-4 rounded-2xl border bg-white focus:ring-2 focus:ring-black outline-none transition min-h-[100px]"
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full p-4 rounded-2xl font-bold transition shadow-lg ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {isSubmitting ? 'Saving...' : 'Confirm & Save'}
      </button>
    </form>
  );
}
