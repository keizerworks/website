
import StrategyCard from "./strategy-card";

const strategies = [
  {
    number: "1",
    label: "BUILD",
    title: "Full-stack product engineering.",
    description:
      "Web. Desktop. iOS. Android. AI agents. Simulation engines. Complex systems most teams say no to.",
  },
  {
    number: "2",
    label: "DESIGN",
    title: "Brand, product, and UX.",
    description:
      "Identity systems, product UI, motion, and the small details that make the difference between \"made by an agency\" and \"made by people who care.\"",
  },
  {
    number: "3",
    label: "BACK",
    title: "Fee-based or equity-backed.",
    description:
      "Most work is fee-based. When the full build amount is not possible, we can selectively reduce the fee for 3-7% equity.",
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

      <div className="max-w-[1536px] relative mx-auto md:px-24 px-4 md:py-[150px] gap-[50px] py-[60px] grid-cols-1 grid md:grid-cols-2">
        <img
          className="absolute z-[0] top-[68%] lg:block hidden left-[118px] scale-[1.05] -translate-y-1/2 "
          src="/assets/decoration/decoration-text.svg"
          alt="decoration-text"
        />

        <div className="w-fit">
          <div className="w-fit">
            <p className="uppercase font-gb text-[16px] font-semibold pb-[10px]">
              Keizer Works
            </p>

            <h2 className="md:text-[50px] w-fit font-gb text-[32px] font-bold leading-tight">
              We build what most
              <br />
              studios won't touch.
            </h2>

            <p className="font-sg text-[15px] md:text-[18px] mt-6 text-white/80 leading-relaxed">
              Desktop, web, mobile, AI, simulation engines.
              <br />
              If it's complex, new, or hasn't been built yet
              <br />
              that's where we come in.
            </p>
          </div>

          <button className="font-sg translate-x-1 mt-8 group relative text-black font-semibold px-4 text-lg py-2">
            <div className="absolute -bottom-1 -left-1 w-full h-full bg-black z-0"></div>
            <div className="absolute group-active:translate-y-1 group-active:-translate-x-1 transition-all inset-0 bg-white z-10"></div>
            <a
              href="#contact"
              className="relative inline-block transition-all  duration-300 z-20 group-active:-translate-x-1 group-active:translate-y-1"
            >
              Let's talk
            </a>
          </button>
        </div>

        <div className="lg:w-[500px] flex-1 flex-shrink-0 lg:pt-[0px] pt-[50px] w-full lg:ml-auto">
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
