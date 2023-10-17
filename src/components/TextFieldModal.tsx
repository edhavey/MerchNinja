import { useState } from 'react';
import TextField from './TextField';

const TextInputModal = ({
  isOpen = true,
  onClose,
  onSubmit,
  label,
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  label?: string;
}) => {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(value);
    setValue('');
    onClose();
    console.log('Modal form submitted');
  }

  return (
    isOpen && (
      <div className='absolute inset-0 bg-black/50 z-50 flex items-center justify-center'>
        <div className='border rounded px-8 py-4 bg-gray-700' {...props}>
          <h2 className='text-xl font-semibold'>{label}</h2>
          <form
            className='flex flex-col gap-4 mt-4'
            onSubmit={handleSubmit}
            id='modalForm'
          >
            <TextField
              value={value}
              onChange={(value) => setValue(value)}
              autoFocus={true}
            />
            <div className='flex gap-4 w-full'>
              <button
                type='button'
                className='basis-0 grow border rounded py-1 px-2 bg-gray-600'
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='basis-0 grow border rounded py-1 px-2 bg-amber-600'
                form='modalForm'
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default TextInputModal;
