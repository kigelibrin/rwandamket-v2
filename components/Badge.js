
// components/Badge.js
export default function Badge({ type }) {
  const styles = {
    verified: "bg-yellow-100 text-yellow-800 border-yellow-200",
    premium: "bg-black text-white border-black shadow-sm",
  };

  return (
    <span className={`${styles[type]} text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1`}>
      {type === 'premium' ? '👑 PREMIUM' : '✓ VERIFIED'}
    </span>
  );
}
