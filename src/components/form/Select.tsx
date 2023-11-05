import React, { forwardRef, useEffect, useState } from 'react';
import cn from '@/utils/cn';
import useOutsideClick from '@/hooks/useOutsideClick';
import useId from '@/hooks/useId';
import { SelectOption } from '@/types/types';
import { useFormContext } from 'react-hook-form';

const Select = forwardRef(
  (
    {
      id,
      className = '',
      name,
      options,
      containerProps = {},
      dropdownProps = {},
    }: SelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    id = useId(id);

    const { getValues, setValue, register } = useFormContext();

    const selectedOption = options.find(
      (option) => option.value === getValues(name)
    );

    const containerRef = useOutsideClick(() => setIsDropdownOpen(false));

    className = cn([
      'w-full',
      'text-black bg-white tracking-wide font-medium',
      'border-2 border-gray-500 rounded-md px-2 py-1',
      'transition-colors duration-200 ease-in-out',
      {
        'outline-none border-primary-500 ring-1 ring-primary-500':
          isDropdownOpen,
      },
      className,
    ]);

    containerProps.className = cn(['relative w-[30ch]']);

    const handleOptionClick = (
      optionEl: React.HTMLProps<HTMLOptionElement>
    ) => {
      const option = options.find((option) => option.value === optionEl.value)!;
      setValue(name, option.value, {
        shouldDirty: true,
        shouldTouch: true,
      });
      setIsDropdownOpen(false);
    };

    useEffect(() => {
      const initialOption = options.at(0);
      register(name);
      initialOption && setValue(name, initialOption.value);
    }, [name, options, setValue, register]);

    return (
      <>
        <div ref={containerRef} {...containerProps}>
          <button
            type='button'
            id={id}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={className}
          >
            <span>{selectedOption?.label}</span>
          </button>
          <DropdownMenu
            options={options}
            handleOptionClick={handleOptionClick}
            isDropdownOpen={isDropdownOpen}
            selectedOption={selectedOption!}
            {...dropdownProps}
          />
        </div>
        <select
          ref={ref}
          name={name}
          id={id}
          defaultValue={selectedOption?.value ?? ''}
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
  }
);

function DropdownMenu({
  options,
  handleOptionClick,
  isDropdownOpen,
  dropdownProps = {},
  selectedOption,
}: {
  options: Array<SelectOption>;
  handleOptionClick: (option: React.HTMLProps<HTMLOptionElement>) => void;
  isDropdownOpen: boolean;
  dropdownProps?: React.HTMLProps<HTMLDialogElement>;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  selectedOption: SelectOption;
}) {
  return (
    <dialog
      open={isDropdownOpen}
      className={cn([
        'mt-1 rounded-md absolute w-full z-20',
        dropdownProps.className,
      ])}
      {...dropdownProps}
    >
      <div className='w-[min(auto,_100%)]'>
        <ul className='bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-20 text-black transition-all duration-200 ease-in-out'>
          {options.map((option) => (
            <li key={option.value as React.Key}>
              <button
                type='button'
                className={cn([
                  'w-full text-left px-4 py-2 hover:bg-primary-500/40',
                  option.value === selectedOption?.value && 'bg-gray-600/40',
                ])}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}

type SelectProps = {
  id?: string;
  className?: string;
  name: string;
  options: Array<SelectOption>;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  dropdownProps?: React.HTMLProps<HTMLDialogElement>;
};

export default Select;
