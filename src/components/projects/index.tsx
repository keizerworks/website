import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  categories: string[];
  href: string;
  className?: string;
}

const ProjectSection = () => {
  const projects: Project[] = [
    {
      title: "Invoicen",
      categories: ["SAAS"],
      href: "https://invoicen.keizerworks.com/",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Keizer Auth",
      categories: ["SAAS"],
      href: "https://github.com/keizerworks/keizer-auth",
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Plastic Credit Card",
      categories: ["Stories", "Branding"],
      href: "#",
      className: "hidden md:col-span-1 md:row-span-1",
    },
    {
      title: "Diseño de Moda",
      categories: ["Stories", "Branding"],
      href: "#",
      className: "hidden md:col-span-1 md:row-span-1",
    },
    {
      title: "Dinámica Lifestyle",
      categories: ["Stories", "Branding"],
      href: "#",
      className: "hidden md:col-span-1 md:row-span-1",
    },
    {
      title: "Uni DAO",
      categories: ["Metaverse", "DAO"],
      href: "https://youtu.be/idODK_SqBSg",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Knight Fall",
      categories: ["Gaming", "Blockchain"],
      href: "http://knight-fall.vercel.app/",
      className: "md:col-span-2 md:row-span-1",
    },
  ];

  return (
    <section id="ourprojects" className="bg-white text-black project-keizer">
      <div className="md:p-[100px] px-[24px] py-[60px] mx-auto max-w-[1536px] ">
        <div className=" tracking-[-1%] flex md:flex-row flex-col justify-between md:items-center">
          <div className="font-gb">
            <h2 className="md:text-[54px] tracking-tight text-[32px] font-bold leading-[100%]">
              The portfolio.
            </h2>
          </div>

          <div className="md:w-[640px] font-sg w-full md:text-[20px] mt-[24px] md:leading-[24px] leading-[18px] md:mt-0 text-[15px]">
            <p>
              Our clients raised millions. Some shipped.
              <br />
              Some pivoted. All are still building.
            </p>
          </div>
        </div>

        <div className="grid pt-[60px] grid-cols-1 md:grid-cols-3 gap-[30px] py-8">
          {projects.map((project, index) => (
            <Link
              key={project.title}
              href={project.href}
              target="_blank"
              className={`group relative  h-[220px] sm:h-[280px] md:h-[422px] overflow-hidden rounded-[5px] ${project.className}`}
            >
              <Image
                src={`/assets/project/project-${index + 1}.webp`}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                width={400}
                height={400}
                unoptimized
              />

              <div className="absolute bottom-0 left-0 right-0 h-[50%] opacity-60 w-full bg-gradient-to-t from-black to-transparent" />

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-[20px] md:p-[40px]">
                <h3 className="text-xl font-medium text-zinc-100 md:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-[5px] text-sm text-zinc-300">
                  {project.categories.join(", ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
