import { useRef } from 'react';
import cn from '../../../utils/cn';

const layoutClasses = {
  vertical: 'flex flex-col gap-1',
  horizontal: 'flex gap-2 items-center',
};

const FormControl = ({
  label,
  children,
  className = '',
  labelClassName = '',
  layout = 'vertical',
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  layout?: 'vertical' | 'horizontal';
}) => {
  const labelRef = useRef<HTMLLabelElement>(null);

  const classes = cn(layoutClasses[layout] ?? '', className);

  return (
    <div className={classes}>
      <label
        ref={labelRef}
        className={cn('text-gray-400 text-sm', labelClassName)}
      >
        {label}
        {children}
      </label>
    </div>
  );
};

export default FormControl;
