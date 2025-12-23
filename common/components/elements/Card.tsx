interface CardProps {
  children: React.ReactNode;
  className?: string;
  [propName: string]: unknown;
}

const Card = ({ children, className = "", ...others }: CardProps) => {
  return (
    <div className="rounded-2xl w-full border border-white/20 dark:border-neutral-700/50 p-1 shadow-xl shadow-black/5 dark:shadow-black/20 backdrop-blur-xl bg-white/60 dark:bg-neutral-900/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 hover:-translate-y-0.5">
      <div
        className={`rounded-xl bg-gradient-to-b
        from-white/80 to-white/40 dark:from-neutral-800/80 dark:to-neutral-900/60 backdrop-blur-sm transition-all duration-300 ${className}`}
        {...others}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;

