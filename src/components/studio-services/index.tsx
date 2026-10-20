import StringList from "./string-list";

// The home page's intro and services list. Draft copy: to be corrected.
export const services = [
  "Web Design",
  "Web Development",
  "Product Design (UI/UX)",
  "MVP Development",
  "AI Products",
  "iOS & Android Apps",
  "SaaS Development",
  "Web3 Development",
  "Product Strategy",
  "Maintenance & Support",
];

export const sectionTitle = "mb-6 text-2xl leading-[1.2] text-[#d9d9d9]";

export function StudioIntro({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <>
      <Heading className="max-w-[880px] text-[32px] leading-[1.1] md:text-[40px]">
        Product studio building meaningful websites, MVPs, and full-scale
        products.
      </Heading>
      <p className="mt-8 max-w-[720px] text-base leading-[1.5] text-[#ebebeb]/80">
        We work with founders from the first idea to a product people use and
        pay for. Design, engineering, and launch under one roof, and we stay on
        after it ships.
      </p>
    </>
  );
}

export function ServiceList() {
  return (
    <>
      <h2 className={sectionTitle}>Services</h2>
      <StringList items={services} />
    </>
  );
}
