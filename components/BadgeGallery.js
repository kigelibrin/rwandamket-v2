
// components/BadgeGallery.js
const allPossibleBadges = [
  { id: 'verified', label: 'Verified Partner', icon: '✅', hint: 'Auto-granted after ID check' },
  { id: 'top_rated', label: 'Top Rated', icon: '⭐', hint: 'Maintain a 4.8+ rating' },
  { id: 'local_pro', label: 'Vision City Local', icon: '📍', hint: 'Located in Vision City' },
  { id: 'fast_responder', label: 'Fast Responder', icon: '⚡', hint: 'Average WhatsApp reply < 10 mins' },
  { id: 'signature_chef', label: 'Signature Menu', icon: '🍲', hint: 'Has 5+ dishes in Signature Food' }
];

export default function BadgeGallery({ activeBadges = [] }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mt-6">
      <h3 className="font-bold text-gray-900 mb-4">Your Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {allPossibleBadges.map((badge) => {
          const isUnlocked = activeBadges.includes(badge.id);
          return (
            <div 
              key={badge.id} 
              className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all ${
                isUnlocked 
                ? 'border-yellow-200 bg-yellow-50 opacity-100 scale-100' 
                : 'border-gray-100 bg-gray-50 opacity-50 grayscale scale-95'
              }`}
            >
              <span className="text-2xl mb-1">{badge.icon}</span>
              <p className="text-[10px] font-black uppercase tracking-tighter leading-none">{badge.label}</p>
              {!isUnlocked && <p className="text-[8px] mt-1 text-gray-400 leading-tight">{badge.hint}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
