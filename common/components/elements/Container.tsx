interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  [propName: string]: React.ReactNode | string | undefined;
}

const Container = ({ children, className = "", ...others }: ContainerProps) => {
  return (
    <div className={`py-2 lg:py-4 ${className} `} {...others}>
      {children}
    </div>
  );
};

export default Container;
