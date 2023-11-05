import { NewCategory, ParentCategory } from '@/types/types';
import useAdminStore from '../../../../context/admin/useAdminStore';
import React, { useEffect, useState } from 'react';
import CreateCategoryForm from './CreateCategoryForm';
import Button from '@/components/Button';
import Modal from '@/components/overlay/Modal';
import Select from '@/components/form/Select';

const CategorySelectInput = ({ id }: { id?: string }) => {
  const [categories, setCategories] = useState<ParentCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<NewCategory>({
    name: '',
    parentId: categories[0]?.id || null,
  });

  const { getAllCategories } = useAdminStore();

  const categoryOptions =
    categories.map((category: ParentCategory) => ({
      label: category.name,
      value: '' + category.id,
      options:
        category.children?.map((child) => ({
          label: child.name,
          value: '' + child.id,
        })) || [],
    })) || [];

  const handleNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newCategory);
  };

  useEffect(() => {
    (async () => {
      const categories: ParentCategory[] | null = await getAllCategories();
      categories && setCategories(categories);
    })();
  }, [getAllCategories]);

  return (
    <>
      <Select id={id} name='category' options={categoryOptions} />
      <CategoryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        categories={categories}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleNewCategory={handleNewCategory}
      />
    </>
  );
};

const CategoryModal = ({
  isOpen,
  setIsOpen,
  categories,
  newCategory,
  setNewCategory,
  handleNewCategory,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  categories: ParentCategory[];
  newCategory: NewCategory;
  setNewCategory: (value: NewCategory) => void;
  handleNewCategory: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <Modal
      className='flex flex-col gap-4'
      open={isOpen}
      id='modal'
      closeModal={() => setIsOpen(false)}
    >
      <CreateCategoryForm
        handleNewCategory={handleNewCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        categories={categories}
      />
      <div className='flex gap-4'>
        <Button
          type='button'
          color='secondary'
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button type='submit' color='primary' form='createCategoryForm'>
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default CategorySelectInput;
