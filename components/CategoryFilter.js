
const categories = [
  { id: 'all', label: 'All', icon: '🌍' },
  { id: 'signature-food', label: 'Rwandamket Food', icon: '🍲' },
  { id: 'chef', label: 'Private Chefs', icon: '👨‍🍳' },
  { id: 'decor', label: 'Home Decor', icon: '🛋️' },
  { id: 'music', label: 'Music Bands', icon: '🎸' },
  { id: 'cleaning', label: 'Cleaning', icon: '✨' }
];

export default function CategoryFilter({ activeCategory, setCategory }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.id)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full whitespace-nowrap border transition-all ${
            activeCategory === cat.id
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          <span>{cat.icon}</span>
          <span className="font-medium text-sm">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
