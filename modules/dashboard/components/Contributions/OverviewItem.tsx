import AnimateCounter from "@/common/components/elements/AnimateCounter";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

interface OverviewItemProps {
  label: string;
  value: number;
  unit?: string;
}

const OverviewItem = ({ label, value, unit = "" }: OverviewItemProps) => (
  <SpotlightCard className="flex flex-col items-center justify-center gap-1.5 p-5 text-center">
    <span className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
      {label}
    </span>
    <div className="flex items-baseline gap-1">
      <AnimateCounter
        className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 lg:text-3xl"
        total={value}
      />
      {unit && (
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {unit}
        </span>
      )}
    </div>
  </SpotlightCard>
);

export default OverviewItem;
