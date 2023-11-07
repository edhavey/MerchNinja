import cn from '@/utils/cn';

const Box = ({
  children,
  className = '',
  ...rest
}: React.HTMLProps<HTMLDivElement>) => {
  className = cn([
    // add your own classes here
    className,
  ]);

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export default Box;
