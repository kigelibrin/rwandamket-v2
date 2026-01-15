
import { supabase } from '../../../lib/supabase';

export default async function VendorProfile({ params }) {
  const { id } = params;

  // 1. Fetch Vendor Details
  const { data: vendor } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', id)
    .single();

  // 2. Fetch Vendor's Menu Items/Products
  const { data: products } = await supabase
    .from('products_services')
    .select('*')
    .eq('vendor_id', id);

  if (!vendor) return <div className="p-10 text-center">Vendor not found.</div>;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="h-64 bg-gray-900 relative">
        <img 
          src={vendor.image_url || 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80'} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold">{vendor.name}</h1>
            {vendor.is_verified && <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">VERIFIED</span>}
          </div>
          <p className="text-gray-200 mt-1">📍 {vendor.location} • {vendor.category}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">{vendor.bio}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Menu & Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products?.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-2xl items-center">
                <img src={item.image_url} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p className="text-gray-500 text-sm line-clamp-1">{item.description}</p>
                  <p className="text-black font-bold mt-2">{item.price.toLocaleString()} {item.currency}</p>
                </div>
                <button className="bg-gray-100 p-2 rounded-full hover:bg-black hover:text-white transition">
                  ➕
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

// Add this state at the top of your component
const [showToast, setShowToast] = useState(false);

const handleWhatsAppOrder = async (item, vendor) => {
  // 1. Save to Supabase
  await supabase.from('orders').insert([{
    vendor_id: vendor.id,
    item_name: item.name,
    price: item.price
  }]);

  // 2. Show the Success Message
  setShowToast(true);
  
  // 3. Wait 1.5 seconds then redirect to WhatsApp
  setTimeout(() => {
    setShowToast(false);
    const cleanPhone = vendor.whatsapp_number.replace(/\D/g, ''); 
    const message = encodeURIComponent(`Hello ${vendor.name}, I want to order ${item.name}...`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  }, 1500);
};
