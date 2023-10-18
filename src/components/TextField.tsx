import { ChangeEvent } from 'react';
import cn from '../utils/cn';

type TextFieldProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void;
  beforeChange?: (value: string, prevValue: string) => string;
  containerClassName?: string;
  adornment?: string;
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
  ...props
}: TextFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const modifiedValue = beforeChange(event.target.value, value as string);
    onChange(modifiedValue);
  };

  return (
    <div
      className={cn([
        'px-3 py-2 flex gap-1 border border-amber-400/30 rounded-lg bg-gray-100/20 text-gray-200',
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
