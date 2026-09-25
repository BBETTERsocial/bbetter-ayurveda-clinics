/** Ayurvedic leaf + mortar mark — placeholder until real logo. */
export function AyurvedaMark({
  className = "",
  title = "BBETTER Ayurveda",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Outer ring */}
      <circle
        cx="40"
        cy="40"
        r="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
      {/* Leaf */}
      <path
        d="M40 14c12 10 18 22 18 34-0.2 10-8 18-18 18S22 58 22 48c0-12 6-24 18-34Z"
        fill="currentColor"
        opacity="0.92"
      />
      {/* Leaf vein */}
      <path
        d="M40 20v38M40 32c-5 4-8 9-9 14M40 32c5 4 8 9 9 14M40 44c-4 3-6 6-7 9M40 44c4 3 6 6 7 9"
        fill="none"
        stroke="#0B1F18"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Small pestle accent */}
      <circle cx="40" cy="48" r="3.5" fill="#0B1F18" opacity="0.35" />
    </svg>
  );
}
