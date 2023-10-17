import { capitalize } from '../../../../utils/helpers';
import {
  AiFillEdit as EditIcon,
  AiOutlineClose as DeleteIcon,
} from 'react-icons/ai';
import { Variant } from './ProductVariantsSection';

const ProductVariantsElement = ({ variant }: { variant: Variant }) => {
  return (
    <li className='flex items-center space-x-4'>
      {Object.entries(variant).map(([key, value]) => (
        <div key={key}>
          <span className='text-gray-200'>{capitalize(key)}:</span>
          <span className='text-gray-100'>{value}</span>
        </div>
      ))}
      <button className='text-amber-400/80 hover:text-amber-400/100'>
        <EditIcon />
      </button>
      <button className='text-red-400/80 hover:text-red-400/100'>
        <DeleteIcon />
      </button>
    </li>
  );
};

export default ProductVariantsElement;
