// components/SubscriptionStatus.js
export default function SubscriptionStatus({ isPremium }) {
  // Guard against missing data
  if (isPremium === undefined) return <div className="p-8 animate-pulse bg-gray-100 rounded-2xl" />;

  return (
    <div className={`p-5 rounded-3xl border transition-all duration-500 ${
      isPremium 
      ? 'bg-black text-white border-black shadow-xl' 
      : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 border-blue-100'
    }`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
            Account Standing
          </p>
          <p className="text-xl font-black italic">
            {isPremium ? '🇷🇼 RWANDAMKET ELITE' : 'Basic Member'}
          </p>
          {!isPremium && (
            <p className="text-[10px] mt-1 font-medium text-blue-600">
              Upgrade to get the "Verified" badge & 0% booking fees
            </p>
          )}
        </div>
        
        <button className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-tight transition shadow-sm active:scale-95 ${
          isPremium 
          ? 'bg-white text-black hover:bg-gray-100' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}>
          {isPremium ? 'Membership Info' : 'Go Premium'}
        </button>
      </div>
    </div>
  );
}
