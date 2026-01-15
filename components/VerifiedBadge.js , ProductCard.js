
export default function VendorCard({ vendor }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
      <img 
        src={vendor.image_url || 'https://via.placeholder.com/300?text=Rwandamket'} 
        alt={vendor.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{vendor.name}</h3>
          <p className="text-sm text-gray-500 uppercase tracking-widest">{vendor.category}</p>
        </div>
        {vendor.is_verified && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-yellow-200">
            ★ VERIFIED
          </span>
        )}
      </div>
      <p className="mt-2 text-gray-600 line-clamp-2 text-sm">{vendor.bio}</p>
      <button className="w-full mt-4 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800">
        View Menu
      </button>
    </div>
  )
}
