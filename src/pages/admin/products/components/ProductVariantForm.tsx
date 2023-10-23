import Button from '@/components/Button';
import Form from '@/components/form/old/Form';
import FormControl from '@/components/form/old/FormControl';
import TextField from '@/components/form/old/TextField';
import { NewProductVariant } from '@/types/types';
import { useId } from 'react';

const ProductVariantForm = ({
  variant,
  formInputs,
  onChange,
  onSubmit,
  id,
}: {
  variant: NewProductVariant;
  formInputs: { name: string }[];
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  id?: string;
}) => {
  const backupId = useId();
  id = id ?? backupId;
  return (
    <Form
      onSubmit={onSubmit}
      id={id}
      propogateSubmit={false}
      className='flex flex-col gap-2'
    >
      <div className='flex gap-4'>
        <FormControl label='Price' htmlFor={id + '__price'}>
          <TextField
            id={id + '__price'}
            className='w-[10ch]'
            girth='sm'
            value={variant.price ?? ''}
            onChange={(value: string) => onChange('price', value)}
            adornment='$'
          />
        </FormControl>
        <FormControl label='Quantity' htmlFor={id + '__quantity'}>
          <TextField
            id={id + '__quantity'}
            className='w-[8ch]'
            girth='sm'
            containerClassName='p-1 pl-2'
            value={variant.quantity ?? ''}
            onChange={(value: string) => onChange('quantity', value)}
          />
        </FormControl>
      </div>
      <div className='flex flex-col gap-4'>
        {formInputs.map((input: { name: string }) => (
          <FormControl
            key={`${id}__${input.name}`}
            label={input.name}
            layout='vertical'
          >
            <TextField
              id={`${id}__${input.name}`}
              girth='sm'
              value={variant[input.name] ?? ''}
              onChange={(value: string) => onChange(input.name, value)}
            />
          </FormControl>
        ))}
      </div>
      <div className='w-full mt-6'>
        <Button type='submit' form={id} className='w-full'>
          Create Variant
        </Button>
      </div>
    </Form>
  );
};

export default ProductVariantForm;
