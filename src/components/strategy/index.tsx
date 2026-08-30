
import StrategyCard from "./strategy-card";

const strategies = [
  {
    number: "1",
    label: "BUILD",
    title: "The product goes live.",
    description:
      "From first screen to a production-ready product customers can use and pay for.",
  },
  {
    number: "2",
    label: "DESIGN",
    title: "Brand, product, and UX.",
    description:
      "Interfaces and experiences built around how people actually use the product.",
  },
  {
    number: "3",
    label: "MAINTAIN",
    title: "We stay after it ships.",
    description:
      "Fixes, improvements, infrastructure, and the next version.",
  },
];

const StrategySection = () => {
  return (
    <section
      id="services"
      className="overflow-hidden h-auto relative bg-[#161619]"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "13px 13px",
        }}
      />

      <div className="max-w-[1536px] relative mx-auto md:px-24 px-4 md:py-[150px] gap-12 lg:gap-[50px] py-[60px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <img
          className="absolute z-[0] top-[68%] lg:block hidden left-[118px] scale-[1.05] -translate-y-1/2 "
          src="/assets/decoration/decoration-text.svg"
          alt="decoration-text"
        />

        <div className="w-full min-w-0">
          <div className="w-full min-w-0">
            <p className="uppercase font-gb text-[16px] font-semibold pb-[10px]">
              How we work
            </p>

            <h2 className="font-gb font-bold leading-[1.1] text-[clamp(1.75rem,4.5vw,3.125rem)] max-w-[15em]">
              We build products that people can use, pay for, and come back to.
            </h2>

            <p className="font-sg text-[15px] md:text-[18px] mt-6 max-w-[34rem] text-white/80 leading-relaxed">
              Design, development, AI systems, and ongoing product engineering
              from first screen to production.
            </p>
          </div>

          <button className="font-sg translate-x-1 mt-8 group relative text-black font-semibold px-4 text-lg py-2">
            <div className="absolute -bottom-1 -left-1 w-full h-full bg-black z-0"></div>
            <div className="absolute group-active:translate-y-1 group-active:-translate-x-1 transition-all inset-0 bg-white z-10"></div>
            <a
              href="#contact"
              className="relative inline-block transition-all  duration-300 z-20 group-active:-translate-x-1 group-active:translate-y-1"
            >
              Start a project →
            </a>
          </button>
        </div>

        <div className="w-full min-w-0 lg:pt-0 pt-[50px]">
          <div className="flex flex-col gap-[40px]">
            {strategies.map((strategy, index) => (
              <StrategyCard
                key={index}
                label={strategy.label}
                number={strategy.number}
                title={strategy.title}
                description={strategy.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
