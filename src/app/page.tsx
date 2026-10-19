// import Testimonials from "~/components/testimonials";
import ClientNotes from "~/components/client-notes";
// import AboutSection from "~/components/about";
import ContactSection from "~/components/contact";
import FAQ from "~/components/faq";
import FooterSection from "~/components/footer";
import HeroSection from "~/components/hero";
import LogoMarquee from "~/components/logo-marquee";
import NewsSection from "~/components/news";
import NewsLetter from "~/components/newsletter";
import SelectedWork from "~/components/selected-work";
// import StrategySection from "~/components/strategy";
import { ServiceList, StudioIntro } from "~/components/studio-services";
import Navbar from "~/components/ui/navbar";
import WhyKeizer from "~/components/why-keizer";
import { gotham_font, inter, spaceGrotesk } from "~/config/font";

export default function Home() {
  return (
    <main
      className={`${gotham_font.variable} ${spaceGrotesk.variable} overflow-hidden bg-black`}
    >
      <Navbar />
      <HeroSection />
      <WhyKeizer />
      <LogoMarquee />
      {/* <ProjectSection /> */}
      {/* Trying the Info page's intro + services here in place of "How we work". */}
      {/* <StrategySection /> */}
      <section
        id="services"
        className={`${inter.className} mx-auto w-full max-w-[1536px] scroll-mt-[100px] bg-black px-4 py-16 text-[#ebebeb] md:px-24 md:py-[100px]`}
      >
        <StudioIntro />
        <div className="mt-20">
          <ServiceList />
        </div>
      </section>
      <SelectedWork />
      <ClientNotes />
      <NewsSection />
      {/* <AboutSection /> */}
      <ContactSection />
      {/* Replaced by ClientNotes above. */}
      {/* <Testimonials /> */}
      <FAQ />
      {/* Textured band so the end of the page isn't another flat black. */}
      <div className="texture-weave">
        <NewsLetter />
        <FooterSection />
      </div>
    </main>
  );
}
