import HeroSection from "~/components/hero";
import StrategySection from "~/components/strategy";
import NewsSection from "~/components/news";
import AboutSection from "~/components/about";
import ContactSection from "~/components/contact";
import Testimonials from "~/components/testimonials";
import NewsLetter from "~/components/newsletter";
import FAQ from "~/components/faq";
import { gotham_font, spaceGrotesk } from "~/config/font";
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
      <StrategySection />
      <NewsSection />
      <AboutSection />
      <ContactSection />
      <Testimonials />
      <FAQ />
      <NewsLetter />
      <FooterSection />
    </main>
  );
}
