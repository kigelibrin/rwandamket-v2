// components/ProductCard.js
export default function ProductCard({ item, onOrder }) {
  const isService = item.type === 'service';

  return (
    <div className="flex gap-4 p-4 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all items-center relative overflow-hidden">
      {/* Type Badge */}
      <div className="absolute top-2 left-2 z-10">
         <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter ${isService ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
            {item.type}
         </span>
      </div>

      <img 
        src={item.image_url || 'https://via.placeholder.com/150'} 
        alt={item.name}
        className="w-24 h-24 object-cover rounded-2xl flex-shrink-0"
      />
      
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h4>
        <p className="text-gray-500 text-xs line-clamp-2 mt-1 italic">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-400 uppercase font-bold">Price</span>
             <span className="text-black font-black text-sm">
               {item.price.toLocaleString()} {item.currency || 'RWF'}
             </span>
          </div>
          <button 
            onClick={() => onOrder(item)}
            className="bg-black text-white text-[10px] font-bold px-4 py-2 rounded-xl hover:bg-gray-800 transition shadow-lg active:scale-95"
          >
            {isService ? 'BOOK NOW' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </div>
  );
}
