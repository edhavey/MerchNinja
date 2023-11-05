import { useEffect, useState } from 'react';
import { Brand } from '@/types/types';
import useAdminStore from '@/context/admin/useAdminStore';
import TextField from '@/components/form/old/TextField';
import Button from '@/components/Button';
import Modal from '@/components/overlay/Modal';
import Select from '@/components/form/Select';

const BrandSelectInput = ({ id }: { id?: string }) => {
  /* State */
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');

  /* Store */
  const { getAllBrands, createNewBrand } = useAdminStore();

  /* Effects */
  useEffect(() => {
    (async () => {
      const brands = await getAllBrands();
      brands && setBrands(brands);
    })();
  }, [getAllBrands]);

  return (
    brands && (
      <>
        <Select
          options={
            brands.map(({ id, name }) => ({
              value: '' + id,
              label: name,
            })) || []
          }
          name='brand'
          id={id}
        />
        <Modal open={modalOpen} closeModal={() => setModalOpen(false)}>
          <form
            className='flex flex-col gap-4 items-center'
            onSubmit={() => console.log('submit')}
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
    )
  );
};
export default BrandSelectInput;
