import FormControl from '@/components/FormControl';
import BrandSelectInput from './BrandSelectInput';
import CategorySelectInput from './CategorySelectInput';
import { NewProduct, NewProductAction } from '@/types/types';
import TextField from '@/components/TextField';

type ProductDetailsPanelProps = {
  product: NewProduct;
  dispatch: ({ type, payload }: NewProductAction) => void;
};

const ProductDetailsPanel = ({
  product,
  dispatch,
}: ProductDetailsPanelProps) => {
  return (
    <section className='flex flex-col gap-2'>
      <h2 className='text-lg text-center text-amber-400/80'>Product Details</h2>
      <FormControl className='' label='Product Name' htmlFor='nameInput'>
        <TextField
          id='nameInput'
          value={product.name}
          onChange={(value: string) =>
            dispatch({ type: 'SET_NAME', payload: value })
          }
        />
      </FormControl>
      <FormControl label='Brand'>
        <BrandSelectInput
          selectedBrand={product.brand}
          onBrandChange={(value) =>
            dispatch({ type: 'SET_BRAND', payload: value })
          }
        />
      </FormControl>
      <FormControl label='Category'>
        <CategorySelectInput
          selectedCategory={product.category}
          onCategoryChange={(value) =>
            dispatch({ type: 'SET_CATEGORY', payload: value })
          }
        />
      </FormControl>
      <FormControl label='Description' htmlFor='descriptionInput'>
        <textarea
          id='descriptionInput'
          className='bg-gray-100/20 p-2 border border-amber-400/30 rounded-md'
          value={product.description}
          onChange={(event) =>
            dispatch({
              type: 'SET_DESCRIPTION',
              payload: event.target.value,
            })
          }
          rows={5}
        />
      </FormControl>
    </section>
  );
};

/*
const validatePrice = (value: string, prevPrice: string): string => {
  if (value.length < prevPrice.length) {
    return value;
  }

  if (!value.at(-1)?.match(/[0-9.]/)) {
    return prevPrice;
  }
  const firstDotIndex = value.indexOf('.');
  const lastDotIndex = value.lastIndexOf('.');

  if (firstDotIndex !== lastDotIndex) {
    return prevPrice;
  }

  if (firstDotIndex === 0) {
    value = '0' + value;
  }

  if (firstDotIndex === -1) {
    return value;
  }

  return value.slice(0, lastDotIndex + 3);
};

<div className='flex gap-4'>
  <FormControl label='Price' htmlFor='priceInput'>
    <TextField
      id='priceInput'
      className='text-right'
      value={product.price}
      onChange={(value: string) =>
        dispatch({ type: 'SET_PRICE', payload: value })
      }
      beforeChange={validatePrice}
      adornment='$'
    />
  </FormControl>
  <FormControl label='Quantity' htmlFor='quantityInput'>
    <TextField
      id='quantityInput'
      className='text-right'
      value={'' + product.stock}
      placeholder='0.00'
      onChange={(value: string) =>
        dispatch({ type: 'SET_STOCK', payload: parseInt(value) })
      }
    />
  </FormControl>
</div>
*/

export default ProductDetailsPanel;
