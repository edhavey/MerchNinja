import useId from '@/hooks/useId';
import cn from '@/utils/cn';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const Textarea = ({
  id,
  name,
  label,
  className = '',
}: {
  id?: string;
  name: string;
  label?: string;
  className?: string;
}) => {
  id = useId(id);
  const { register, setValue, getValues } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(name, e.target.value);
  };

  useEffect(() => {
    register(name, { value: '' });
  }, [name, register]);

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        name={name}
        id={id}
        className={cn([
          'text-black bg-white tracking-wide font-medium',
          'border-2 border-gray-500 rounded-md px-2 py-1',
          'focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
          'transition-colors duration-200 ease-in-out',
          className,
        ])}
        value={getValues(name)}
        onChange={handleChange}
      />
    </div>
  );
};

export default Textarea;
