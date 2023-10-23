import React, { forwardRef, useId, useMemo, useRef, useState } from 'react';
import { useForm } from './useForm';
import cn from '@/utils/cn';

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

const Select = ({
  options = [],
  className = '',
  value,
  onChange,
  headerOption,
  tailOption,
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  className = cn([
    'border border-amber-400/30 rounded-lg bg-gray-100/20 text-gray-200 w-full px-4 py-2',
    'focus:border-inherit',
    className,
  ]);
  

  const selectButtonRef = useRef<HTMLButtonElement>(null);

  const handleItemClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const currentOption = options.find((option) => option.value === value);

  return (
    <div
      className='relative flex flex-col'
      role='combobox'
      aria-haspopup='listbox'
      aria-expanded={isOpen}
    >
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={cn(selectClasses, value ?? 'text-gray-400', className)}
        aria-labelledby='customSelectLabel'
        ref={selectButtonRef}
      >
        {currentOption?.name || 'Select'}
      </button>
      {isOpen && (
        <DropdownMenu
          options={options}
          handleItemClick={handleItemClick}
          headerOption={headerOption}
          tailOption={tailOption}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

const DropdownMenu = ({


export default Select;