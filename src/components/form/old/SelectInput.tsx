import { useRef, useState } from 'react';
import cn from '../../../utils/cn';

type SelectInputProps = {
  label?: string;
  options?: {
    name: string;
    value: string | number;
    options?: { name: string; value: string | number }[];
  }[];
  className?: string;
  value: string | null;
  onChange: (value: string) => void;
  headerOption?: { name: string; value: string | number };
  tailOption?: { name: string; value: string | number };
  disabled?: boolean;
};

const selectClasses = [
  'border border-amber-400/30 rounded-lg bg-gray-100/20 text-gray-200 w-full px-4 py-2',
  'focus:border-inherit',
];

const SelectInput = ({
  options = [],
  className = '',
  value,
  onChange,
  headerOption,
  tailOption,
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

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

const LiOption = ({
  option,
  handleItemClick,
  className = '',
}: {
  option: { name: string; value: string | number };
  handleItemClick: (value: string) => void;
  className?: string;
}) => {
  return (
    <li
      key={option.value}
      className={cn('px-4 py-2 hover:bg-gray-100/40 cursor-pointer', className)}
      role='option'
      onClick={() => handleItemClick(option.value as string)}
    >
      {option.name}
    </li>
  );
};

const DropdownMenu = ({
  options,
  handleItemClick,
  headerOption,
  tailOption,
  setIsOpen,
}: {
  options: { name: string; value: string | number }[];
  handleItemClick: (value: string) => void;
  headerOption?: { name: string; value: string | number };
  tailOption?: { name: string; value: string | number };
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target !== e.currentTarget) return;
    setIsOpen(false);
  };

  return (
    <>
      <ul
        className='absolute top-11/10 left-0 right-0 border rounded-lg bg-gray-600 text-gray-200 w-full z-20 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600'
        role='listbox'
      >
        {headerOption && (
          <LiOption option={headerOption} handleItemClick={handleItemClick} />
        )}
        {options.map((item) => {
          if (item.options) {
            return (
              <li key={item.name} className='px-4 py-2'>
                <h3 className='text-gray-400 text-sm'>{item.name}</h3>
                <ul className='ml-2'>
                  {(item.options as SelectOption[]).map((option) => (
                    <LiOption
                      key={option.value}
                      option={option}
                      handleItemClick={handleItemClick}
                    />
                  ))}
                </ul>
              </li>
            );
          }
          return (
            <LiOption
              key={(item as SelectOption).value}
              option={item as SelectOption}
              handleItemClick={handleItemClick}
            />
          );
        })}
        {tailOption && (
          <LiOption option={tailOption} handleItemClick={handleItemClick} />
        )}
      </ul>
      <div>
        <div
          className='fixed inset-0 z-10'
          aria-hidden='true'
          onClick={handleOutsideClick}
        ></div>
      </div>
    </>
  );
};

export default SelectInput;
