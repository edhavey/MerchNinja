import Button from '@/components/Button';
import Form from '@/components/Form';
import FormControl from '@/components/FormControl';
import TextField from '@/components/TextField';
import { Variant } from '@/types/types';
import { useId } from 'react';
import Panel from '../../components/Panel';

const ProductVariantForm = ({
  variant,
  formInputs,
  onChange,
  onSubmit,
  id,
}: {
  variant: Variant;
  formInputs: { name: string }[];
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  id?: string;
}) => {
  const backupId = useId();
  id = id ?? backupId;
  return (
    <Panel>
      <Form
        onSubmit={onSubmit}
        id={id}
        propogateSubmit={false}
        className='flex flex-col gap-4'
      >
        <div className='flex gap-4'>
          <FormControl
            label='Price'
            htmlFor={id + '__price'}
            className='flex-row gap-4 items-center'
          >
            <TextField
              id={id + '__price'}
              className='w-[10ch]'
              containerClassName='p-1 pl-2'
              value={variant.price ?? ''}
              onChange={(value: string) => onChange('price', value)}
              adornment='$'
            />
          </FormControl>
          <FormControl
            label='Quantity'
            htmlFor={id + '__quantity'}
            className='flex-row gap-4 items-center'
          >
            <TextField
              id={id + '__quantity'}
              className='w-[8ch]'
              containerClassName='p-1 pl-2'
              value={variant.quantity ?? ''}
              onChange={(value: string) => onChange('quantity', value)}
            />
          </FormControl>
        </div>
        <div className='grid grid-cols-[auto,1fr] gap-4 p-2'>
          {formInputs.map((input: { name: string }) => (
            <FormControl
              key={`${id}__${input.name}`}
              className='subgrid col-span-full'
              labelClassName='text-end'
              label={input.name}
              layout='horizontal'
            >
              <TextField
                id={`${id}__${input.name}`}
                containerClassName='p-1'
                value={variant[input.name] ?? ''}
                onChange={(value: string) => onChange(input.name, value)}
              />
            </FormControl>
          ))}
        </div>
        <div className='w-full'>
          <Button type='submit' form={id} className='w-full'>
            Create Variant
          </Button>
        </div>
      </Form>
    </Panel>
  );
};

export default ProductVariantForm;
