interface LogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
}

export function Logo({ variant = "dark", showTagline = true }: LogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#1C2024";
  const tagColor = variant === "light" ? "#9CA3AF" : "#5a7a5a";

  return (
    <div className="flex items-center gap-3">
      <img
        src="https://res.cloudinary.com/daqmbfctv/image/upload/v1780564102/OHO-Logo_ktn0ab.png"
        alt="OHOPRS Logo"
        className="h-10 w-auto"
      />
      {showTagline && (
        <div className="leading-tight">
          <p className="text-sm font-bold" style={{ color: textColor }}>
            OHOPRS
          </p>
          <p className="text-xs" style={{ color: tagColor }}>
            One-Humanitarian–One-Poverty Response System
          </p>
        </div>
      )}
    </div>
  );
}
