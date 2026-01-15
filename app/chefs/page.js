
import { supabase } from '../lib/supabase'
import VendorCard from '../components/VendorCard'

export default async function HomePage() {
  // Fetch all vendors from your new table
  const { data: vendors, error } = await supabase
    .from('vendors')
    .select('*')
    .order('is_verified', { ascending: false }); // Show verified ones first!

  if (error) return <p>Error loading marketplace: {error.message}</p>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2">Rwandamket</h1>
        <p className="text-gray-500">National Marketplace & Tourist Services</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </section>
    </main>
  )
}
