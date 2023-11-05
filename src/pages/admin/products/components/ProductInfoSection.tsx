import FormControl from '@/components/form/old/FormControl';
import BrandSelectInput from './BrandSelectInput';
import TextInput from '@/components/form/TextInput';
import CategorySelectInput from './CategorySelectInput';

const ProductInfoSection = () => {
  return (
    <section className='flex flex-col gap-2'>
      <h2 className='text-2xl text-center text-amber-400/80'>Details</h2>
      <FormControl label='Product Name'>
        <TextInput id='nameInput' name='name' />
      </FormControl>
      <FormControl label='Brand'>
        <BrandSelectInput id='brandSelect' />
      </FormControl>
      <FormControl label='Category'>
        <CategorySelectInput id='categorySelect' />
      </FormControl>
      {/* <FormControl label='Description'>
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
      </FormControl> */}
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
    <TextInput
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
    <TextInput
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

export default ProductInfoSection;
