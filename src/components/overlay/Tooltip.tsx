import cn from '@/utils/cn';
import React from 'react';

const Tooltip = ({
  children,
  className = '',
  text,
  position = 'bottom',
  ...rest
}: TooltipProps) => {
  const containerClassName = cn([
    'relative group inline-block',
    'focus-within:outline-indigo-500',
  ]);

  className = cn([
    'absolute',
    'bg-zinc-900 text-white text-xs rounded-md',
    'px-2 py-1',
    {
      'bottom-[calc(100%_+_0.75em)] left-1/2 -translate-x-1/2':
        position === 'top',
      'top-[calc(100%_+_0.75em)] left-1/2 -translate-x-1/2':
        position === 'bottom',
      'right-[calc(100%_+_0.75em)] left-1/2 -translate-x-1/2':
        position === 'left',
      'left-[calc(100%_+_0.75em)] left-1/2 -translate-x-1/2':
        position === 'right',
    },
    className,
  ]);

  return (
    <div className={containerClassName} {...rest}>
      {children}
      <div className={className}>{text}</div>
    </div>
  );
};

type TooltipProps = {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
} & React.HTMLProps<HTMLDivElement>;

export default Tooltip;
