import { useId } from 'react';
import cn from '../../../../utils/cn';

type PriceInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  onPriceChange: (value: string) => void;
};

const PriceInput = ({
  label = '',
  className = '',
  id,
  onPriceChange,
  ...props
}: PriceInputProps) => {
  id = id ?? useId();

  const containerClasses = cn([
    'flex gap-2 items-center rounded-md bg-gray-500',
    'focus-within:ring-2 focus-within:ring-amber-400 focus-within:ring-offset-2',
  ]);

  const inputClasses = cn([
    'bg-transparent border-none outline-none placeholder-gray-200 text-right',
  ]);

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    const cursorPosition = e.target.selectionStart;

    if (value.length < (props.value as string).length) {
      onPriceChange(value);
      return;
    }

    if (value === '') {
      onPriceChange('');
      return;
    }
    onPriceChange(formatPrice(value, props.value as string));
    setTimeout(() => {
      e.target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  }

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={containerClasses}>
        <input
          id={id}
          className={inputClasses}
          onChange={handlePriceChange}
          placeholder='0.00'
          {...props}
        />
      </div>
    </>
  );
};

export default PriceInput;

function formatPrice(price: string, oldPrice: string) {
  if (price.startsWith(oldPrice)) {
    const priceParts = price.split('.');
    if (priceParts.length === 1) {
      return price;
    }
    const dollars = priceParts[0];
    const cents = priceParts[1];
    if (cents.length > 2) {
      return dollars + '.' + cents.slice(0, 2);
    }
    return price;
  }
  for (let i = 0; i < oldPrice.length; i++) {
    if (price[i] !== oldPrice[i]) {
      return (
        price
          .split('')
          // @ts-ignore
          .toSpliced(i + 1, 1)
          .join('')
      );
    }
  }
  return price;
}
