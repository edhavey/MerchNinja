import { useEffect, useState } from 'react';
import SelectInput from '../../../../components/form/old/SelectInput';
import { Brand, SelectOption } from '../../../../types/types';
import useAdminStore from '../../../../context/admin/useAdminStore';
import Modal from '../../../../components/Modal';
import TextField from '../../../../components/form/old/TextField';
import Button from '../../../../components/Button';

type BrandSelectInputProps = {
  selectedBrand: Brand | null;
  onBrandChange: (value: Brand) => void;
};

const BrandSelectInput = ({
  selectedBrand,
  onBrandChange,
}: BrandSelectInputProps) => {
  /* State */
  const [brands, setBrands] = useState<Brand[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');

  /* Store */
  const { getAllBrands, createNewBrand } = useAdminStore();

  /* Handlers */
  const handleBrandChange = (value: string): void => {
    if (value === 'create') {
      setModalOpen(true);
      return;
    }
    const brand: Brand | undefined = brands.find(
      (brand) => brand.id === +value
    );
    brand && onBrandChange(brand);
  };

  const handleNewBrand = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    setModalOpen(false);
    const newBrand: Brand = (await createNewBrand(newBrandName)) as Brand;

    if (!newBrand) {
      return;
    }
    setBrands([...brands, newBrand]);
    onBrandChange(newBrand);
    setNewBrandName('');
  };

  /* Effects */
  useEffect(() => {
    (async () => {
      const brands = await getAllBrands();
      brands && setBrands(brands);
    })();
  }, [getAllBrands]);

  return (
    <>
      <SelectInput
        options={
          brands.map(({ id, name }) => ({
            value: '' + id,
            name,
          })) as SelectOption[]
        }
        value={selectedBrand?.name || null}
        label='Product Brand'
        headerOption={{ name: 'Select Brand', value: null }}
        tailOption={{ name: 'Create Brand', value: 'create' }}
        onChange={handleBrandChange}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <form
          className='flex flex-col gap-4 items-center'
          onSubmit={handleNewBrand}
          id='newBrandForm'
        >
          <h2 className='text-xl font-semibold'>Create New Brand</h2>
          <TextField
            onChange={(value: string) => setNewBrandName(value)}
            value={newBrandName}
            label='Brand Name'
          />
          <div className='flex gap-4 justify-center'>
            <Button color='secondary' onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type='submit' form='newBrandForm'>
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default BrandSelectInput;
