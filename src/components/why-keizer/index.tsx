

const WhyKeizer = () => {
  return (
    <section className="bg-[#2D2DC3] py-[100px] md:px-24 px-4">
      <div className="max-w-[1536px] relative mx-auto">
        <img
          src={"/assets/decoration/thick-circle.svg"}
          className="absolute -right-20 top-1/2 rotate-90 pointer-events-none"
        />
        <img
          src={"/assets/decoration/thick-circle.svg"}
          className="absolute top-0 right-1/3 pointer-events-none"
        />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 lg:pr-8 lg:pl-12">
            <header className="flex flex-col font-gb">
              <span className="font-semibold text-xl">Why</span>
              <h2 className="relative md:text-6xl text-5xl mt-2 text-black w-fit inline-block">
                <span className="z-30 relative font-bold text-black">Keizer?</span>
                <div className="inset-0 absolute bg-white z-20" />
                <div className="inset-0 absolute bg-[#1e96fc] translate-x-2 translate-y-2 z-10" />
              </h2>
            </header>
            <div className="mt-8 text-sm md:text-xl">
              <p className="leading-relaxed">
                We don't take every project.
                <br />
                We pick the ones we'd want to build ourselves.
              </p>
              <p className="mt-6 text-white/80">
                If your idea is in AI, Web3, or future-shaped, talk to us.
              </p>
            </div>
            <button className="font-sg translate-x-1 font-medium mt-8 group relative text-white px-4 md:text-lg py-2">
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-white z-0"></div>
              <div className="absolute group-active:translate-y-1 group-active:-translate-x-1 transition-all inset-0 bg-black z-10"></div>
              <a
                href="#contact"
                className="relative inline-block transition-all duration-300 z-20 group-active:-translate-x-1 group-active:translate-y-1"
              >
                Let's talk
              </a>
            </button>
          </div>

          {/* Right side - Stats */}
          <div className="lg:w-auto grid grid-cols-3 gap-3 md:gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-[#1e96fc] translate-x-1.5 translate-y-1.5 md:translate-x-2 md:translate-y-2" />
              <div className="relative bg-white px-4 py-6 md:px-8 md:py-8 flex flex-col items-center text-center">
                <span className="font-gb text-3xl md:text-5xl font-bold text-black">
                  10+
                </span>
                <span className="font-sg text-xs md:text-sm mt-2 text-black/60">
                  Companies
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff66ff] translate-x-1.5 translate-y-1.5 md:translate-x-2 md:translate-y-2" />
              <div className="relative bg-white px-4 py-6 md:px-8 md:py-8 flex flex-col items-center text-center">
                <span className="font-gb text-3xl md:text-5xl font-bold text-black">
                  $24M+
                </span>
                <span className="font-sg text-xs md:text-sm mt-2 text-black/60">
                  Valuation
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#1e96fc] translate-x-1.5 translate-y-1.5 md:translate-x-2 md:translate-y-2" />
              <div className="relative bg-white px-4 py-6 md:px-8 md:py-8 flex flex-col items-center text-center">
                <span className="font-gb text-3xl md:text-5xl font-bold text-black">
                  3
                </span>
                <span className="font-sg text-xs md:text-sm mt-2 text-black/60">
                  Continents
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyKeizer;
