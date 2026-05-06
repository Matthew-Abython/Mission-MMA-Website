const STATS = [
  { value: "5.0 ★",       label: "Google Rating" },
  { value: "200+",         label: "5-Star Reviews" },
  { value: "4,500 sq ft",  label: "State-of-the-Art Facility" },
  { value: "Since 2016",   label: "West Loop's Original" },
  { value: "7 Disciplines", label: "All Ages & Levels" },
  { value: "Free Parking", label: "+ Steps from CTA" },
];

export function SocialProofStrip() {
  return (
    <div
      className="w-full overflow-x-auto border-y py-5"
      style={{
        backgroundColor: "#111111",
        borderColor: "rgba(200,16,46,0.15)",
      }}
    >
      <div className="mx-auto flex max-w-7xl min-w-max items-center justify-between gap-8 px-6">
        {STATS.map((stat, i) => (
          <>
            <div
              key={stat.label}
              className="flex min-w-[120px] flex-col items-center gap-1 text-center"
            >
              <span
                className="font-display font-semibold text-white"
                style={{ fontSize: "22px" }}
              >
                {stat.value}
              </span>
              <span
                className="uppercase tracking-wide"
                style={{ fontSize: "11px", color: "var(--mission-gray-500)" }}
              >
                {stat.label}
              </span>
            </div>
            {i < STATS.length - 1 && (
              <span
                key={`sep-${i}`}
                className="hidden h-6 w-px flex-shrink-0 md:block"
                style={{ backgroundColor: "var(--mission-gray-700)" }}
                aria-hidden="true"
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
}
