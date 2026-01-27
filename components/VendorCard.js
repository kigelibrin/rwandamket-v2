
import Link from 'next/link';
import Badge from './Badge'; // Import your new badge!

export default function VendorCard({ vendor }) {
  return (
    <Link href={`/vendor/${vendor.id}`} className="group">
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden transition-all hover:shadow-xl">
        <div className="relative h-56 w-full">
          <img 
            src={vendor.image_url || 'https://via.placeholder.com/400x300?text=Rwandamket'} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
<div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5 max-w-[70%]">
  {vendor.is_premium && <Badge type="premium" />}
  {vendor.is_verified && <Badge type="verified" />}
</div>
    {/* ------------------------------------------- */}
    </div>
        
        <div className="p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{vendor.category}</p>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{vendor.name}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{vendor.bio}</p>
          <div className="mt-4 flex items-center text-sm font-medium text-gray-900">
            <span>📍 {vendor.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
