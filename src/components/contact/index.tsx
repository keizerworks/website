import ContactForm from "./contact-form";

const ContactSection = () => {
  return (
    <section className="project bg-[#F7F8FF] text-[#07070A]" id="contact">
      <div className="max-w-[1536px] flex flex-col gap-[36px] mx-auto md:p-[100px] px-[24px] py-[60px]">
        <div className="flex items-center w-full justify-between">
          <header className="font-gb">
            <span className="uppercase font-semibold text-xs">
              Collaboration
            </span>
            <h2 className="md:text-[48px] leading-[32px] mt-8 px-2 pb-4 relative font-bold pt-[15px] text-[30px] md:leading-[102%]">
              <span className="relative z-40 text-white">
                Have a Vision?
                <br />
                Time to make it a reality
              </span>
              <div className="inset-0 absolute bg-[#2D2DC3] z-20" />
              <div className="inset-0 absolute bg-[#1e96fc] -translate-x-2 translate-y-2 z-10" />
            </h2>
          </header>
        </div>

        <div className="w-full h-[1px] bg-black" />

        <p className="max-w-[716px]">
          Get your product to market fast. We help startups build, scale, and launch
          with the right strategy, resources, and execution.
        </p>
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;
