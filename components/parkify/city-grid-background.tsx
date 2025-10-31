"use client"

/* Animated “futuristic map” background using CSS gradients and subtle motion */
export function CityGridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          animation: "grid-pan 40s linear infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 400px at 20% 30%, rgba(57,255,20,0.08), transparent 60%), radial-gradient(600px 300px at 80% 70%, rgba(57,255,20,0.06), transparent 60%)",
          filter: "blur(2px)",
        }}
      />
      <style jsx>{`
        @keyframes grid-pan {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 200px 200px, 200px 200px; }
        }
      `}</style>
    </div>
  )
}
