import { forwardRef, useId, useMemo } from 'react';
import { useForm } from './useForm';
import cn from '@/utils/cn';

interface TextFieldProps {
  id?: string;
  className?: string;
  name: string;
  type?: TextFieldInputTypes;
  label?: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  orientation?: 'horizontal' | 'vertical';
}

type TextFieldInputTypes = 'text' | 'password' | 'email' | 'number';

const TextField = forwardRef(
  (
    {
      id,
      className = '',
      name,
      type = 'text',
      label,
      labelProps = {},
      containerProps = {},
      orientation = 'horizontal',
    }: TextFieldProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const { values, handleChange } = useForm();
    const backupId = useId();
    const memoizedId = useMemo(() => id ?? backupId, [id, backupId]);

    className = cn([
      'peer',
      'text-black bg-white tracking-wide font-medium',
      'border-2 border-gray-500 rounded-md px-2 py-1',
      'focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
      'transition-colors duration-200 ease-in-out',
      className,
    ]);

    containerProps.className = cn([
      {
        'flex flex-row-reverse gap-4 items-center':
          orientation === 'horizontal',
        'flex flex-col-reverse gap-2': orientation === 'vertical',
      },
      containerProps?.className ?? '',
    ]);

    labelProps.className = cn([
      'peer-focus:text-primary-500',
      'text-inherit font-medium',
      labelProps?.className ?? '',
    ]);

    return (
      <div {...containerProps}>
        <input
          type={type}
          id={memoizedId}
          className={className}
          name={name}
          ref={ref}
          value={values[name]}
          onChange={handleChange}
        />
        {label && (
          <label htmlFor={id} {...labelProps}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

export default TextField;
