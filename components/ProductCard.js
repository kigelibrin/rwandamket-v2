
// components/ProductCard.js
export default function ProductCard({ item, onOrder }) {
  return (
    <div className="flex gap-4 p-4 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all items-center">
      {/* Product Image */}
      <img 
        src={item.image_url || 'https://via.placeholder.com/150'} 
        alt={item.name}
        className="w-24 h-24 object-cover rounded-2xl flex-shrink-0"
      />
      
      {/* Product Info */}
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
        <p className="text-gray-500 text-xs line-clamp-2 mt-1 leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-black font-black text-sm">
            {item.price.toLocaleString()} {item.currency || 'RWF'}
          </span>
          <button 
            onClick={() => onOrder(item)}
            className="bg-black text-white text-[10px] font-bold px-4 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </div>
  );
}
