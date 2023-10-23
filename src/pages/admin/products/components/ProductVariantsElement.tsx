import { NewProductVariant } from '@/types/types';
import { capitalize } from '../../../../utils/helpers';
import {
  AiFillEdit as EditIcon,
  AiOutlineClose as DeleteIcon,
} from 'react-icons/ai';

const ProductVariantsElement = ({
  variant,
  removeVariant,
  editVariant,
}: {
  variant: NewProductVariant;
  removeVariant: (variant: NewProductVariant) => void;
  editVariant: (variant: NewProductVariant) => void;
}) => {
  function formatValue(value: string | number, key: string) {
    value = value.toString();
    switch (key) {
      case 'price':
        return `$${value}`;
      case 'quantity':
        return value;
      default:
        return capitalize(value);
    }
  }

  return (
    <li className='flex items-center gap-4 rounded-lg bg-gray-500/20 p-4'>
      {Object.entries(variant).map(([key, value]) => (
        <div key={key} className='flex gap-2'>
          <span className='text-amber-400 text-lg'>{capitalize(key)}:</span>
          <span className='text-gray-100 text-lg font-medium'>
            {formatValue(value, key)}
          </span>
        </div>
      ))}
      <div className='flex gap-4 ml-auto mt-1 self-start'>
        <button
          className='text-amber-400/80 hover:text-amber-400/100'
          onClick={() => editVariant(variant)}
        >
          <EditIcon />
        </button>
        <button
          className='text-red-400/80 hover:text-red-400/100'
          onClick={() => removeVariant(variant)}
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

export default ProductVariantsElement;
