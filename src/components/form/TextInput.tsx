import cn from '@/utils/cn';
import useId from '@/hooks/useId';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

const TextInput = ({
  id,
  disabled = false,
  uncontrolled = false,
  onChange = () => {},
  ...rest
}: TextFieldProps) => {
  id = useId(id);

  rest.className = cn([
    'w-[30ch]',
    'text-black bg-white tracking-wide font-medium',
    'border-2 border-gray-500 rounded-md px-2 py-1',
    'focus-within:outline-none focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500',
    'transition-colors duration-200 ease-in-out',
    {
      'outline-none border-primary-500 ring-1 ring-primary-500': disabled,
    },
    rest.className,
  ]);

  rest.containerProps ||= {};
  rest.containerProps.className = cn([
    'flex flex-col gap-2',
    rest.containerProps?.className ?? '',
  ]);

  return uncontrolled ? (
    <RegisteredTextInput id={id} className={rest.className} {...rest} />
  ) : (
    <UnregisteredTectInput
      id={id}
      className={rest.className}
      onChange={onChange}
      {...rest}
    />
  );
};

const RegisteredTextInput = ({
  id,
  className,
  type = 'text',
  name,
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: __onChange, // to prevent passing it to inputProps
  containerProps = {},
  ...inputProps
}: Partial<TextFieldProps> & {
  className: string;
  name: string;
}) => {
  const { register } = useFormContext();

  return (
    <div {...containerProps}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={className}
        type={type}
        id={id}
        {...register(name)}
        {...inputProps}
      />
    </div>
  );
};

const UnregisteredTectInput = ({
  id,
  className,
  onChange,
  type = 'text',
  name,
  label,
  containerProps = {},
  ...inputProps
}: Partial<TextFieldProps> & {
  className: string;
  name: string;
  onChange: (value: string) => void;
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div {...containerProps}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={className}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  );
};

type TextFieldProps = {
  id?: string;
  className?: string;
  name: string;
  onChange?: (value: string) => void;
  value?: string;
  label?: string;
  type?: TextInputType;
  disabled?: boolean;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  uncontrolled?: boolean;
};

export type TextInputType = 'text' | 'password' | 'email' | 'number';

export default TextInput;
