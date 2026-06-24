interface PageHeadingProps {
  title?: string;
  description?: string;
}

const PageHeading = ({ title, description }: PageHeadingProps) => {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-neutral-300 pb-6 pt-2 dark:border-neutral-800">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-4xl">
        {title}
      </h1>
      <p className="max-w-[65ch] text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
};

export default PageHeading;
