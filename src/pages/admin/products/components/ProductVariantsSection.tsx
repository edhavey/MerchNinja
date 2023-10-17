import { useId, useState } from 'react';
import ProductVariantsElement from './ProductVariantsElement';
import Modal from '@/components/Modal';
import TextField from '@/components/TextField';
import FormControl from '@/components/FormControl';
import Button from '@/components/Button';
import { NewProduct, NewProductVariantSpec, Variant } from '@/types/types';

const ProductVariantsSection = ({ product }: { product: NewProduct }) => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [newVariant, setNewVariant] = useState<Variant>({
    price: '',
    quantity: '',
  });

  const [isOpen, setIsOpen] = useState(false);

  const variantSpecs = (product?.specs.filter(
    (spec) => spec.variant
  ) as unknown) as NewProductVariantSpec[];

  const handleNewVariantChange = (key: string, value: string) => {
    if (!newVariant) return;
    const newNewVariant = { ...newVariant, [key]: value };
    setNewVariant(newNewVariant);
  };

  const handleCreateNewVariant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!newVariant) return;
    setVariants([...variants, newVariant]);
    setNewVariant({ price: '', quantity: '' });
    setIsOpen(false);
  };

  return (
    <>
      <section className='w-full'>
        <h2 className='text-lg text-center text-amber-400/80'>
          Product Variants
        </h2>
        {variants.length > 0 ? (
          <>
            <ul>
              {variants.map((variant) => (
                <ProductVariantsElement
                  key={JSON.stringify(variant)}
                  variant={variant}
                />
              ))}
            </ul>
            <Button
              size='sm'
              color='tertiary'
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Add Variant
            </Button>
          </>
        ) : (
          <button
            type='button'
            className='flex justify-center items-center w-full h-32 bg-gray-500/20 rounded-lg'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p>Click here to add your first variant</p>
          </button>
        )}
      </section>
      {isOpen && (
        <ProductVariantModal
          onClose={() => setIsOpen(false)}
          variantSpecs={variantSpecs}
          newVariant={newVariant}
          handleNewVariantChange={handleNewVariantChange}
          handleCreateNewVariant={handleCreateNewVariant}
        />
      )}
    </>
  );
};

const ProductVariantModal = ({
  onClose,
  variantSpecs,
  newVariant,
  handleNewVariantChange,
  handleCreateNewVariant,
}: {
  onClose: () => void;
  variantSpecs: NewProductVariantSpec[];
  newVariant: Variant;
  handleNewVariantChange: (key: string, value: string) => void;
  handleCreateNewVariant: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const id = useId();
  const formInputs: { name: string }[] = [
    { name: 'Price' },
    { name: 'Quantity' },
    ...variantSpecs,
  ];

  return (
    <Modal open={true} onClose={onClose}>
      <form
        onSubmit={handleCreateNewVariant}
        id={id}
        className='flex flex-col gap-4'
      >
        <div className='grid grid-cols-[auto,1fr] gap-4 p-2'>
          {formInputs.map((input: { name: string }) => (
            <FormControl
              key={input.name}
              className='subgrid col-span-full'
              labelClassName='text-end'
              label={input.name}
              layout='horizontal'
            >
              <TextField
                id={input.name}
                containerClassName='p-1'
                value={newVariant[input.name] ?? ''}
                onChange={(value: string) =>
                  handleNewVariantChange(input.name, value)
                }
              />
            </FormControl>
          ))}
        </div>
        <div className='w-full'>
          <Button type='submit' form={id} className='w-full'>
            Create Variant
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductVariantsSection;
