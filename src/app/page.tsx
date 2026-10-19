import HeroSection from "~/components/hero";
// import StrategySection from "~/components/strategy";
import { ServiceList, StudioIntro } from "~/components/studio-services";
import NewsSection from "~/components/news";
// import AboutSection from "~/components/about";
import ContactSection from "~/components/contact";
// import Testimonials from "~/components/testimonials";
import ClientNotes from "~/components/client-notes";
// import SelectedWork from "~/components/selected-work";
import NewsLetter from "~/components/newsletter";
import FAQ from "~/components/faq";
import { gotham_font, inter, spaceGrotesk } from "~/config/font";
import WhyKeizer from "~/components/why-keizer";
import LogoMarquee from "~/components/logo-marquee";
import Navbar from "~/components/ui/navbar";
import FooterSection from "~/components/footer";

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
        className={`${inter.className} mx-auto w-full max-w-[1536px] scroll-mt-[100px] bg-black px-4 py-[100px] text-[#ebebeb] md:px-24`}
      >
        <StudioIntro />
        <div className="mt-20">
          <ServiceList />
        </div>
      </section>
      {/* Hidden for now. */}
      {/* <SelectedWork /> */}
      <ClientNotes />
      <NewsSection />
      {/* <AboutSection /> */}
      <ContactSection />
      {/* Replaced by ClientNotes above. */}
      {/* <Testimonials /> */}
      <FAQ />
      <NewsLetter />
      <FooterSection />
    </main>
  );
}
