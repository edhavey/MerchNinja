import SelectInput from '@/components/form/old/SelectInput';
import TextField from '@/components/form/old/TextField';
import { NewCategory, ParentCategory } from '@/types/types';
import cn from '@/utils/cn';
import { FormEvent, HTMLAttributes, useState } from 'react';

const CreateCategoryForm = ({
  className = '',
  categories,
  newCategory,
  setNewCategory,
  handleNewCategory,
}: {
  categories: ParentCategory[];
  newCategory: NewCategory;
  setNewCategory: (value: NewCategory) => void;
  handleNewCategory: (e: FormEvent<HTMLFormElement>) => void;
} & HTMLAttributes<HTMLFormElement>) => {
  const [currentParent, setCurrentParent] = useState<Partial<
    ParentCategory
  > | null>(null);
  const [isNewParent, setIsNewParent] = useState(false);

  const parentCategoryOptions: React.HTMLProps<
    HTMLOptionElement
  >[] = categories.map((category: ParentCategory) => ({
    name: category.name,
    value: '' + category.id,
  })) as React.HTMLAttributes<HTMLOptionElement>[];

  function handleCategoryChange(value: string) {
    if (value === '__create') {
      setIsNewParent(true);
      setCurrentParent({
        name: '',
        id: undefined,
      });
      return;
    }
    const foundCategory = categories.find(
      (category: ParentCategory) => category.id === parseInt(value)
    );

    if (!foundCategory) {
      console.error('Category not found for value: ', value);
      return;
    }
    setIsNewParent(false);
    setCurrentParent(foundCategory);
  }

  parentCategoryOptions.push({
    name: 'Create New Category',
    value: '__create',
  });

  return (
    <form
      id='createCategoryForm'
      className={cn(['flex flex-col gap-4', className])}
      onSubmit={handleNewCategory}
    >
      <h2 className='text-2xl text-center text-amber-400'>Create Category</h2>
      <div className='grid grid-cols-2 gap-8'>
        <div className='flex flex-col gap-4'>
          <h3 className='text-lg text-center'>Parent Category</h3>
          <SelectInput
            options={parentCategoryOptions}
            value={currentParent?.name || '__create'}
            label='Parent Category'
            onChange={handleCategoryChange}
          />
          {isNewParent && (
            <TextField
              label='Parent Category Name'
              value={currentParent?.name}
              onChange={(value) => {
                setCurrentParent({
                  ...currentParent,
                  name: value,
                });
              }}
            />
          )}
        </div>
        <div className='flex flex-col gap-4'>
          <h3 className='text-lg text-center'>Subcategory</h3>
          <TextField label='Category Name' value='' onChange={() => {}} />
        </div>
      </div>
    </form>
  );
};

export default CreateCategoryForm;
