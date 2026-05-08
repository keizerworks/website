const logos = [
  { name: "Edulume", src: "/assets/logos/edulume.svg" },
  { name: "BetterIdea", src: "/assets/logos/betterIdea.svg" },
  { name: "Arlink", src: "/assets/logos/arlink.svg" },
  { name: "Chem0", src: "/assets/logos/chem0.svg" },
  { name: "Square", src: "/assets/logos/square.svg" },
];

const LogoMarquee = () => {
  // Duplicate logos to fill the marquee (minimum 8 items for smooth loop)
  const duplicatedLogos = [
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
  ];

  return (
    <section className="relative z-10 md:-mt-10 md:-mb-10">
      <div className="max-w-[1200px] mx-auto px-0 md:px-8">
        {/* Bordered container box */}
        <div className="relative border-y-2 md:border-2 border-[#e6edf4] overflow-hidden bg-white">
          {/* Gradient fade on edges inside the box */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee track */}
          <div className="flex animate-marquee hover:[animation-play-state:paused] py-5 md:py-6">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 mx-8 md:mx-14 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-6 md:h-8 w-auto object-contain grayscale opacity-60"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
