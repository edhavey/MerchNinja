import { useRef } from 'react';
import cn from '../../../utils/cn';

const ImageUploadInput = ({
  onImageUpload,
  images,
  className = '',
}: {
  onImageUpload: (images: File[]) => void;
  images: File[];
  className?: string;
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    onImageUpload(files);
  };

  return (
    <>
      <button
        onClick={() => fileInput.current?.click()}
        className={cn(
          'grow p-6 border border-dashed border-amber-400/60 rounded flex flex-col items-center justify-center bg-gray-100/20',
          'transition-colors duration-200 ease-in-out',
          'hover:border-amber-400',
          className
        )}
      >
        <span className='font-medium text-sm text-center max-w-[50%]'>
          Click, to upload an image or drag and drop it here
        </span>
        <span className='bg-gray-500 text-amber-400 border border-amber-400/30 px-4 py-2 rounded-md mt-4'>
          Upload Image(s)
        </span>
      </button>
      <input
        type='file'
        accept='image/*'
        multiple
        value={images.map((image) => image.name)}
        className='hidden'
        ref={fileInput}
        onChange={handleFileUpload}
      />
    </>
  );
};

export default ImageUploadInput;
