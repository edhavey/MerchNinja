import useId from '@/hooks/useId';
import cn from '../../../utils/cn';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

const Checkbox = ({
  name,
  value,
  defaultChecked = false,
  id,
  label,
  className = '',
  children,
}: {
  name: string;
  value: string;
  defaultChecked?: boolean;
  id?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  id = useId(id);
  const { register, getValues, setValue } = useFormContext();
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const formKey = `${name}.${value}`;

  const handleClick = () => {
    const isChecked = getValues(formKey);
    setValue(formKey, !isChecked, {
      shouldDirty: true,
      shouldTouch: true,
    });
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    register(formKey, { value: defaultChecked });
  }, [formKey, register, defaultChecked]);

  return (
    id && (
      <>
        <div className='flex gap-4'>
          {(label || children) && (
            <label onClick={handleClick}>{label ?? children}</label>
          )}
          <div
            id={id}
            tabIndex={0}
            className={cn([
              'h-6 place-self-center aspect-square border rounded-md border-amber-400/30 cursor-pointer ',
              isChecked ? 'bg-amber-400/30' : 'bg-gray-900/30',
              className,
            ])}
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')
                handleClick();
            }}
          />
          <input
            type='checkbox'
            name={name}
            value={value}
            id={id + '-element'}
            defaultChecked={isChecked}
            className='hidden'
          />
        </div>
      </>
    )
  );
};

export default Checkbox;
