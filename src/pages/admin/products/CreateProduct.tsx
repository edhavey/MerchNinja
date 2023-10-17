import { useEffect, useReducer } from 'react';
import AdminPageHeader from '../components/AdminPageHeader';
import {
  Brand,
  Category,
  NewProduct,
  NewProductAction,
  NewProductSpec,
  Variant,
} from '../../../types/types';
import ProductInfoSection from './components/ProductInfoSection';
import ProductImagesSection from './components/ProductImagesSection';
import ProductSpecsSection from './components/ProductSpecsSection';
import ProductVariantsSection from './components/ProductVariantsSection';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import Panel from '../components/Panel';

const emptyProduct: NewProduct = {
  name: '',
  price: '',
  stock: 0,
  description: '',
  brand: null,
  category: null,
  images: [] as File[],
  specs: [] as NewProductSpec[],
  variants: [] as Variant[],
};

function reducer(
  state: NewProduct | null,
  action: NewProductAction
): NewProduct | null {
  if (!state) return null;
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload as string };
    case 'SET_PRICE':
      return { ...state, price: action.payload as string };
    case 'SET_STOCK':
      return { ...state, stock: action.payload as number };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload as string };
    case 'SET_BRAND':
      return { ...state, brand: action.payload as Brand };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload as Category };
    case 'SET_IMAGES':
      return { ...state, images: action.payload as File[] };
    case 'SET_SPECS':
      return { ...state, specs: action.payload as NewProductSpec[] };
    case 'SET_VARIANTS':
      return { ...state, variants: action.payload as Variant[] };
    case 'SET_PRODUCT':
      return { ...(action.payload as NewProduct) };
    default:
      throw new Error(`Invalid action: ${action}`);
  }
}

function loadCachedProduct() {
  const cachedProduct = sessionStorage.getItem('newProduct');
  if (cachedProduct) {
    return JSON.parse(cachedProduct);
  }
  return emptyProduct;
}

export default function CreateProduct() {
  const [product, dispatch] = useReducer(reducer, null, loadCachedProduct);

  function handleCreateProduct() {
    //TODO create new product
    console.log('Creating new product');
  }

  useEffect(() => {
    sessionStorage.setItem('newProduct', JSON.stringify(product));
  }, [product]);

  return (
    <div className='min-h-full max-w-screen-xl flex flex-col gap-2 basis-0 grow mx-auto py-6 '>
      <AdminPageHeader className=''>Create Product</AdminPageHeader>
      <Panel
        as={Form}
        id='createProductForm'
        onSubmit={handleCreateProduct}
        className='bg-gray-900 border-amber-400/30 border rounded-lg p-6 flex flex-col gap-4'
      >
        {product && (
          <>
            <div className='grid grid-cols-[1fr,.6fr] gap-20'>
              <div className='flex flex-col gap-8'>
                <ProductImagesSection
                  images={product.images}
                  dispatch={dispatch}
                />
                <ProductSpecsSection
                  specs={product.specs}
                  dispatch={dispatch}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <ProductInfoSection product={product} dispatch={dispatch} />
              </div>
            </div>
            <div className='w-full'>
              <ProductVariantsSection product={product} />
            </div>
            <div className='flex gap-4 ml-auto'>
              <Button
                type='submit'
                form='createProductForm'
                className='bg-amber-500 text-gray-900 font-semibold px-4 py-2 rounded-md'
              >
                Create Product
              </Button>
              <Button
                color='secondary'
                onClick={() =>
                  dispatch({ type: 'SET_PRODUCT', payload: emptyProduct })
                }
              >
                Reset Form
              </Button>
            </div>
          </>
        )}
      </Panel>
    </div>
  );
}
