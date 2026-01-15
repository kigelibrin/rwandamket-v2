// components/SubscriptionStatus.js
export default function SubscriptionStatus({ isPremium }) {
  return (
    <div className={`p-4 rounded-2xl border flex justify-between items-center ${isPremium ? 'bg-black text-white' : 'bg-blue-50 text-blue-900 border-blue-200'}`}>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest opacity-80">Current Plan</p>
        <p className="text-lg font-black">{isPremium ? 'Rwandamket Elite' : 'Basic Free'}</p>
      </div>
      <button className={`px-4 py-2 rounded-xl text-xs font-bold ${isPremium ? 'bg-white text-black' : 'bg-blue-600 text-white'}`}>
        {isPremium ? 'View Benefits' : 'Upgrade to Premium'}
      </button>
    </div>
  );
}
