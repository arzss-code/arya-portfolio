import cn from "@/common/libs/clsxm";

interface BreaklineProps {
  className?: string;
  [propName: string]: string | undefined;
}

const Breakline = ({ className = "", ...others }: BreaklineProps) => {
  return (
    <div
      className={cn(
        "my-12 border-t border-neutral-300 dark:border-neutral-700",
        className,
      )}
      {...others}
    ></div>
  );
};

export default Breakline;
