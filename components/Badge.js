// components/Badge.js
export default function Badge({ type }) {
  const styles = {
    verified: "bg-yellow-100 text-yellow-800 border-yellow-200",
    premium: "bg-black text-white border-black shadow-sm",
  };

  // Use the requested style, OR fall back to 'verified' if the type is unknown
  const activeStyle = styles[type] || styles.verified;

  return (
    <span className={`${activeStyle} text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1`}>
      {type === 'premium' ? '👑 PREMIUM' : '✓ VERIFIED'}
    </span>
  );
}
