import { useState } from 'react';
import ProductVariantsElement from './ProductVariantsElement';
import Modal from '@/components/Modal';
import {
  NewProduct,
  NewProductVariantSpec,
  NewProductVariant,
} from '@/types/types';
import ProductVariantForm from './ProductVariantForm';
import { AiOutlinePlus as PlusIcon } from 'react-icons/ai';
import Button from '@/components/Button';

const ProductVariantsSection = ({ product }: { product: NewProduct }) => {
  const [variants, setVariants] = useState<NewProductVariant[]>([]);
  const [newVariant, setNewVariant] = useState<NewProductVariant>({
    price: '',
    quantity: '',
  });

  const [isOpen, setIsOpen] = useState(false);

  const variantSpecs = product.specs.filter(
    (spec) => spec.variant
  ) as NewProductVariantSpec[];

  const handleNewVariantChange = (key: string, value: string) => {
    if (!newVariant) return;
    const newNewVariant = { ...newVariant, [key]: value };
    setNewVariant(newNewVariant);
  };

  const handleCreateNewVariant = () => {
    if (!newVariant) return;
    setVariants([...variants, newVariant]);
    setNewVariant({ price: '', quantity: '' });
    setIsOpen(false);
  };

  const handleRemoveVariant = (variant: NewProductVariant) => {
    const newVariants = variants.filter(
      (currentVariant) => currentVariant !== variant
    );
    setVariants(newVariants);
  };

  const handleEditVariant = (variant: NewProductVariant) => {
    setNewVariant(variant);
    setIsOpen(true);
  };

  return (
    <>
      <section className='w-full flex flex-col gap-2'>
        <h2 className='text-2xl text-center text-amber-400/80'>Variants</h2>
        {variants.length > 0 ? (
          <>
            <ul className='flex flex-col gap-4'>
              {variants.map((variant) => (
                <ProductVariantsElement
                  key={JSON.stringify(variant)}
                  variant={variant}
                  removeVariant={handleRemoveVariant}
                  editVariant={handleEditVariant}
                />
              ))}
            </ul>
            <Button
              type='button'
              className='w-fit self-end mt-4'
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
  newVariant: NewProductVariant;
  handleNewVariantChange: (key: string, value: string) => void;
  handleCreateNewVariant: () => void;
}) => {
  return (
    <Modal open={true} onClose={onClose}>
      <ProductVariantForm
        variant={newVariant}
        formInputs={variantSpecs}
        onChange={handleNewVariantChange}
        onSubmit={handleCreateNewVariant}
      />
    </Modal>
  );
};

export default ProductVariantsSection;
