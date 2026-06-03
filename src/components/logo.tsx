interface LogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
}

export function Logo({ variant = "dark", showTagline = true }: LogoProps) {
  const markFill = variant === "light" ? "#d4edda" : "#2d6a4f";
  const houseFill = variant === "light" ? "#d4edda" : "#2d6a4f";
  const circleFill = variant === "light" ? "#1a2e1a" : "#d4edda";
  const textColor = variant === "light" ? "#e8ece8" : "#1a2e1a";
  const tagColor = variant === "light" ? "#a3c4a3" : "#5a7a5a";

  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="2" y="2" width="36" height="36" rx="8" fill={markFill} />
        <path
          d="M10 26V14l10-6 10 6v12H10z"
          fill={variant === "light" ? "#1a2e1a" : "#d4edda"}
          opacity="0.9"
        />
        <circle cx="20" cy="20" r="4" fill={circleFill} />
        <path
          d="M16 28h8l-4 6-4-6z"
          fill={variant === "light" ? "#1a2e1a" : "#d4edda"}
          opacity="0.8"
        />
      </svg>
      <div>
        <p className="text-sm font-bold" style={{ color: textColor }}>
          OHOPRS
        </p>
        {showTagline && (
          <p className="text-xs" style={{ color: tagColor }}>
            National Response System
          </p>
        )}
      </div>
    </div>
  );
}
