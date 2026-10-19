// Shared by the home page and /v2/info. Draft copy: to be corrected.
export const services = [
  "Web Design",
  "Web Development",
  "Product Design (UI/UX)",
  "MVP Development",
  "AI Products",
  "MCP Servers",
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
      <ol className="flex flex-col gap-0.5">
        {services.map((service, index) => (
          <li
            key={service}
            className="flex items-center justify-between border border-[#d9d9d9]/80 px-2 py-2.5 text-xl leading-5 hover:bg-white/5"
          >
            <span>{service}</span>
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
