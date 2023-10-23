import React, { useId, useMemo, useRef, useState } from 'react';
import { useForm } from './useForm';
import cn from '@/utils/cn';
import useOutsideClick from '@/hooks/useOutsideClick';

const Select = ({
  id,
  className = '',
  name,
  options,
  label,
  labelProps = {},
  containerProps = {},
  dropdownProps = {},
  orientation = 'horizontal',
}: SelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const backupId = useId();
  const memoizedId = useMemo(() => id ?? backupId, [id, backupId]);

  const selectRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const field = useMemo(
    () => ({ [name]: options[0].value as string }),
    [options, name]
  );

  const { values, handleChange } = useForm(field);
  useOutsideClick(containerRef, () => setIsDropdownOpen(false));

  const selectedOption = options.find(
    (option) => option.value === values[name]
  );

  className = cn([
    'text-black bg-white tracking-wide font-medium',
    'border-2 border-gray-500 rounded-md px-2 py-1',
    'transition-colors duration-200 ease-in-out',
    {
      'outline-none border-primary-500 ring-1 ring-primary-500': isDropdownOpen,
    },
    className,
  ]);

  containerProps.className = cn([
    {
      'relative flex flex-row-reverse gap-4 items-center':
        orientation === 'horizontal',
      'flex flex-col-reverse gap-2': orientation === 'vertical',
    },
    containerProps?.className ?? '',
  ]);

  const handleOptionClick = (option: React.HTMLProps<HTMLOptionElement>) => {
    if (selectRef?.current === null) return;
    selectRef.current.name = name;
    selectRef.current.value = option.value as string;
    selectRef.current.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: true })
    );
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div ref={containerRef} {...containerProps}>
        <div className='relative'>
          <button
            type='button'
            id={memoizedId}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={className}
          >
            <span>{selectedOption?.label}</span>
          </button>
          <DropdownMenu
            options={options}
            handleOptionClick={handleOptionClick}
            isDropdownOpen={isDropdownOpen}
            dropdownProps={dropdownProps}
          />
        </div>
        {label && (
          <label
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            {...labelProps}
          >
            {label}
          </label>
        )}
      </div>
      <select
        ref={selectRef}
        name={name}
        id={memoizedId}
        onChange={handleChange}
        className='hidden'
      >
        {options.map((option) => (
          <option key={option.value as React.Key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

function DropdownMenu({
  options,
  handleOptionClick,
  isDropdownOpen,
  dropdownProps = {},
}: {
  options: Array<{ label: string; value: string | number }>;
  handleOptionClick: (option: React.HTMLProps<HTMLOptionElement>) => void;
  isDropdownOpen: boolean;
  dropdownProps?: React.HTMLProps<HTMLUListElement>;
}) {
  dropdownProps.className = cn([
    'bg-white rounded-md shadow-lg',
    'ring-1 ring-black ring-opacity-5',
    'py-1',
    'transition-all duration-200 ease-in-out',
    'z-20',
    'text-black',
    {
      '-translate-y-full': !isDropdownOpen,
      'translate-y-0': isDropdownOpen,
    },
    dropdownProps?.className ?? '',
  ]);

  return (
    <div className='absolute top-full mt-1 left-1/2 -translate-x-1/2 w-max overflow-hidden rounded-md'>
      <ul {...dropdownProps}>
        {options.map((option) => (
          <li key={option.value as React.Key}>
            <button
              type='button'
              className='w-full text-left px-4 py-2 hover:bg-primary-500/40'
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SelectProps {
  id?: string;
  className?: string;
  name: string;
  options: Array<{ label: string; value: string | number }>;
  label?: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  dropdownProps?: React.HTMLProps<HTMLUListElement>;
  orientation?: 'horizontal' | 'vertical';
}

export default Select;
