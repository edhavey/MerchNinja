import { NewProductAction } from '@/types/types';
import ImageUploadInput from '../../../../components/form/old/ImageUploadInput';

const ProductImagesSection = ({
  dispatch,
  images,
}: {
  dispatch: React.Dispatch<NewProductAction>;
  images: File[];
}) => {
  return (
    <section className='flex flex-col gap-4 w-full'>
      <h2 className='text-lg text-center text-amber-400/80'>Images</h2>
      <ImageUploadInput
        images={images}
        onImageUpload={(uploadedImages) =>
          dispatch({ type: 'SET_IMAGES', payload: uploadedImages })
        }
      />
    </section>
  );
};

export default ProductImagesSection;
