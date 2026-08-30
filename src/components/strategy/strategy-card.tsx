interface StrategyCardProps {
  number: string;
  label: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

const StrategyCard = ({
  number,
  label,
  title,
  description,
}: StrategyCardProps) => {
  return (
    <div className="relative w-full flex flex-col justify-between">
      <span className="text-white/80 text-[14px] pb-[20px] font-medium border-b border-neutral-600 tracking-wide">
        {number}. {label}
      </span>

      <div className="space-y-6 pt-[20px]">
        <h2 className="text-white md:text-[25px] text-[20px] font-bold leading-tight">
          {title}
        </h2>

        <p className="text-white/80 text-[16px] leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StrategyCard;

// Example usage:
export function Example() {
  return (
    <div className="bg-black min-h-screen p-8 md:p-12">
      <StrategyCard
        number="1"
        label="Strategy"
        title="Brand Strategy & Art Direction"
        description="Creating a higher spacing and how people move through a unique and impactful campaign."
        linkText="Read More"
        linkHref="/strategy"
      />
    </div>
  );
}