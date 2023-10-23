import { ChangeEvent } from 'react';
import cn from '../../../utils/cn';

type TextFieldProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void;
  beforeChange?: (value: string, prevValue: string) => string;
  containerClassName?: string;
  adornment?: string;
  girth?: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: 'px-2 py-1 rounded-md',
  md: 'px-3 py-2 rounded-md',
  lg: 'px-4 py-3 rounded-lg',
};

const TextField = ({
  value,
  form = '',
  onChange,
  beforeChange = (value) => value,
  className = '',
  containerClassName = '',
  type = 'text',
  id,
  adornment = '',
  disabled = false,
  girth = 'md',
  ...props
}: TextFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const modifiedValue = beforeChange(event.target.value, value as string);
    onChange(modifiedValue);
  };

  return (
    <div
      className={cn([
        sizes[girth],
        'flex gap-1 border border-amber-400/30 bg-gray-100/20 text-gray-200',
        'focus-within:border-inherit',
        disabled && 'bg-gray-700/60 border-gray-400/30',
        containerClassName,
      ])}
    >
      <span>{adornment}</span>
      <input
        id={id}
        className={cn([
          'bg-transparent border-none outline-none w-full',
          className,
        ])}
        type={type}
        form={form}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

export default TextField;
