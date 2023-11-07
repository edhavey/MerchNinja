import Button from '@/components/Button';
import { NewProductSpec } from '@/types/types';
import ProductSpecInputs from './ProductSpecInputs';

const emptySpec: NewProductSpec = {
  name: '',
  value: '',
  variant: false,
};

const ProductSpecsSection = ({
  specs,
  updateSpecs,
}: {
  specs: NewProductSpec[];
  updateSpecs: (specs: NewProductSpec[]) => void;
}) => {
  const addSpec = () => {
    updateSpecs([...specs, emptySpec]);
  };

  const deleteSpecByName = (specName: string) => {
    updateSpecs(specs.filter((spec) => spec.name !== specName));
  };

  const updateSpec = (
    spec: NewProductSpec,
    key: string,
    value: string | boolean
  ) => {
    updateSpecs(
      specs.map((s) => (s.name === spec.name ? { ...s, [key]: value } : s))
    );
  };

  return (
    <section className='flex flex-col gap-6 grow'>
      <h2 className='text-2xl text-center text-amber-400/80'>Specs</h2>
      <div className='grid grid-cols-[auto_4fr_3fr_auto] gap-4'>
        <div className='subgrid col-span-3 text-center text-gray-400 text-sm'>
          <span className='col-span-1'>Variant?</span>
          <span className='col-span-1'>Name</span>
          <span className='col-span-1'>Value</span>
        </div>
        {specs.map((spec) => (
          <ProductSpecInputs
            id={spec.name}
            updateSpec={updateSpec}
            deleteSpec={deleteSpecByName}
            deleteDisabled={specs.length === 1}
            spec={spec}
          />
        ))}
      </div>
      <Button
        color='tertiary'
        size='sm'
        className='self-end mt-auto'
        onClick={addSpec}
      >
        Add Spec
      </Button>
    </section>
  );
};

export default ProductSpecsSection;
