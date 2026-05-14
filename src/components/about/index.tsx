const AboutSection = () => {
  return (
    <section id="aboutus" className="bg-[#17171A]">
      <div className="max-w-[1536px] flex flex-col xl:gap-0 mx-auto relative md:p-[100px] px-[24px] py-[60px]">
        <header className="w-full relative">
          <span className="text-[15px] uppercase">About us</span>
          <h2 className="relative font-gb capitalize sm:pt-[0px] pt-[10px] z-50 font-bold text-[clamp(1.5rem,5vw,5rem)] leading-[1.1] xl:max-w-[55%]">
            <span className="relative z-10">
              We save <br />
              businesses <br /> from ineffective <br /> & ugly designs.
            </span>

            <img
              src="/assets/decoration/paint-brush.svg"
              className="absolute bottom-0 xl:w-auto w-[80%] translate-y-[40%] z-0"
              alt="paint-decoration"
            />
          </h2>

          <img
            className="absolute xl:block aspect-square object-cover w-[650px] z-10 hidden top-0 right-0"
            src="/assets/decoration/keizer-grid.svg"
            alt="keizer-grid"
          />
        </header>

        <img
          className="w-full mt-[70px]  xl:hidden block"
          src="/assets/decoration/keizer-grid.svg"
          alt="keizer-grid"
        />

        <div className="xl:mt-[80px] md:w-1/3 relative z-40 mt-[33px] md:text-[16px] text-[14px] space-y-4 text-white/80">
          <p>
            Startups fail when the build is slow, the design is off, the team is stretched. Most studios make it worse.
          </p>
          <p className="font-semibold text-white">We fix that.</p>
          <p>
            Early involvement. Fast shipping. Equity when it matters.
          </p>
          <p>
            Built by{" "}
            <a
              href="https://x.com/rahulsainlll"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white hover:text-[#ff66ff] transition-colors"
            >
              Rahul Sain
            </a>
            {" "}and{" "}
            <a
              href="https://www.linkedin.com/in/mayank-dhokal-5a11a7327/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white hover:text-[#ff66ff] transition-colors"
            >
              Mayank Dhokal
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
