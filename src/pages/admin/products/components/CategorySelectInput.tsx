import SelectInput from '../../../../components/SelectInput';
import { Category, InputGroup } from '../../../../types/types';
import useAdminStore from '../../../../context/admin/useAdminStore';
import { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';
import TextField from '../../../../components/TextField';
import Checkbox from '@/components/Checkbox';

type CategorySelectInputProps = {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category) => void;
};

const CategorySelectInput = ({
  selectedCategory,
  onCategoryChange,
}: CategorySelectInputProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<{
    name: string;
    parentId: string | null;
  }>({
    name: '',
    parentId: categories[0]?.id || null,
  });

  const { getAllCategories } = useAdminStore();

  const categoryOptions: InputGroup[] = categories.map((category) => ({
    name: category.name,
    options:
      category.children?.map((child) => ({
        name: child.name,
        value: child.id,
      })) || [],
  }));

  const handleCategoryChange = (value: string) => {
    if (value === '__create') {
      setIsOpen(true);
      return;
    }

    const category: Category | undefined = categories
      .find((category) =>
        category.children?.some((child) => child.id === value)
      )
      ?.children?.find((child) => child.id === value);

    category && onCategoryChange(category);
  };

  const handleNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newCategory);
  };

  useEffect(() => {
    (async () => {
      const categories = await getAllCategories();
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
  categories: Category[];
  newCategory: {
    name: string;
    parentId: string | null;
  };
  setNewCategory: (value: { name: string; parentId: string | null }) => void;
  handleNewCategory: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const [isParent, setIsParent] = useState(false);

  const handleCheckboxClick = () => {
    setIsParent(!isParent);
    setNewCategory({ ...newCategory, parentId: null });
  };

  const options = categories.map((category) => ({
    name: category.name,
    value: category.id,
  }));

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <form onSubmit={handleNewCategory}>
        <h2>Create Category</h2>
        <div className='flex'>
          <SelectInput
            options={options}
            value={newCategory.parentId}
            label='Parent Category'
            onChange={(value) =>
              setNewCategory({ ...newCategory, parentId: value })
            }
            disabled={isParent}
          />
          <div>
            <label onClick={handleCheckboxClick}></label>
            <Checkbox
              isChecked={isParent}
              handleCheckboxToggle={handleCheckboxClick}
            />
          </div>
        </div>
        <TextField label='Category Name' value='' onChange={() => {}} />
        <div className='flex gap-4 justify-center'>
          <button
            type='button'
            className='px-4 py-2 border rounded-lg bg-gray-100/20 text-gray-200 hover:bg-gray-200/20 transition'
            onClick={() => {}}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 border rounded-lg bg-gray-100/20 text-gray-200 hover:bg-gray-200/20 transition'
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategorySelectInput;
