import cn from '../utils/cn';

const layoutClasses = {
  vertical: 'flex flex-col gap-1',
  horizontal: 'flex gap-2 items-center',
};

const FormControl = ({
  label,
  children,
  htmlFor,
  className = '',
  labelClassName = '',
  layout = 'vertical',
}: {
  label?: string;
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  labelClassName?: string;
  layout?: 'vertical' | 'horizontal';
}) => {
  const classes = cn(layoutClasses[layout] ?? '', className);

  return (
    <div className={classes}>
      <label
        className={cn('text-gray-400 text-sm', labelClassName)}
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormControl;
