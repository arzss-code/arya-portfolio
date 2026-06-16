export interface GlassIconProps {
  name: string;
  icon: JSX.Element;
  background: string;
}

const GlassIcon: React.FC<GlassIconProps> = ({
  name,
  icon,
  background,
}: GlassIconProps) => {
  return (
    <button
      type="button"
      aria-label={name}
      className={`group relative h-[2.6em] w-[2.6em] bg-transparent outline-none [-webkit-tap-highlight-color:transparent] [perspective:24em] [transform-style:preserve-3d] focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[1.25em] md:h-[3em] md:w-[3em]`}
    >
      <span
        className={`absolute left-0 top-0 block h-full w-full origin-[100%_100%] rotate-[15deg] rounded-[1.25em] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)] ${background}`}
      ></span>

      <span
        className="absolute left-0 top-0 flex h-full w-full origin-[80%_50%] transform rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] backdrop-blur-[0.75em] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] [-webkit-backdrop-filter:blur(0.75em)] group-hover:[transform:translateZ(2em)]"
        style={{
          boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
        }}
      >
        <span
          className="m-auto flex h-[1.5em] w-[1.5em] items-center justify-center"
          aria-hidden="true"
        >
          {icon}
        </span>
      </span>

      <span className="absolute left-0 right-0 top-full translate-y-[10%] whitespace-nowrap text-center text-xs md:text-sm font-medium leading-[2] text-neutral-600 dark:text-neutral-400 transition-[transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:[transform:translateY(20%)] group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
        {name}
      </span>
    </button>
  );
};

export default GlassIcon;
