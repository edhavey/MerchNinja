import SelectInput from '../../../../components/form/old/SelectInput';
import { Category, NewCategory, ParentCategory } from '@/types/types';
import useAdminStore from '../../../../context/admin/useAdminStore';
import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';
import CreateCategoryForm from './CreateCategoryForm';
import Button from '@/components/Button';

type CategorySelectInputProps = {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category) => void;
};

const CategorySelectInput = ({
  selectedCategory,
  onCategoryChange,
}: CategorySelectInputProps) => {
  const [categories, setCategories] = useState<ParentCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<NewCategory>({
    name: '',
    parentId: categories[0]?.id || null,
  });

  const { getAllCategories } = useAdminStore();

  const categoryOptions: React.HTMLAttributes<
    HTMLOptionElement
  >[] = categories.map((category: ParentCategory) => ({
    name: category.name,
    value: '' + category.id,
    options:
      category.children?.map((child) => ({
        name: child.name,
        value: '' + child.id,
      })) || [],
  })) as React.HTMLAttributes<HTMLOptionElement>[];

  const handleCategoryChange = (value: string) => {
    if (value === '__create') {
      setIsOpen(true);
      return;
    }

    const category: Category | undefined = categories
      .find((category) =>
        category.children?.some((child) => '' + child.id === value)
      )
      ?.children?.find((child) => '' + child.id === value);

    category && onCategoryChange(category);
  };

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
      <SelectInput
        options={categoryOptions}
        value={selectedCategory?.name || null}
        label='Category'
        headerOption={{ name: 'Select Category', value: '' }}
        tailOption={{ name: 'Create Category', value: '__create' }}
        onChange={handleCategoryChange}
      />
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
      open={true}
      onClose={() => setIsOpen(false)}
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
