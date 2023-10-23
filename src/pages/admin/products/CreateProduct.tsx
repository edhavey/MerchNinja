import { useEffect, useReducer } from 'react';
import AdminPageHeader from '../components/AdminPageHeader';
import {
  Brand,
  Category,
  NewProduct,
  NewProductAction,
  NewProductSpec,
  NewProductVariant,
} from '../../../types/types';
import ProductInfoSection from './components/ProductInfoSection';
import ProductSpecsSection from './components/ProductSpecsSection';
import ProductVariantsSection from './components/ProductVariantsSection';
import Button from '../../../components/Button';
import Form from '../../../components/form/old/Form';
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
  variants: [] as NewProductVariant[],
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
      return { ...state, variants: action.payload as NewProductVariant[] };
    case 'SET_PRODUCT':
      return { ...(action.payload as NewProduct) };
    case 'RESET':
      return { ...emptyProduct };
    default:
      throw new Error(`Invalid action: ${action}`);
  }
}

function initializer() {
  const product = sessionStorage.getItem('newProduct');
  if (product) {
    return JSON.parse(product);
  }
  return emptyProduct;
}

export default function CreateProduct() {
  const [product, dispatch] = useReducer(reducer, null, initializer);

  function handleCreateProduct() {
    //TODO create new product
    console.log('Creating new product');
  }

  useEffect(() => {
    sessionStorage.setItem('newProduct', JSON.stringify(product));
    console.log('Product updated', product);
  }, [product]);

  return (
    <div className='min-h-full max-w-screen-xl flex flex-col gap-4 basis-0 grow mx-auto p-6'>
      <AdminPageHeader className=''>Create Product</AdminPageHeader>
      <Form
        id='createProductForm'
        onSubmit={handleCreateProduct}
        className='flex flex-col gap-4'
      >
        {product && (
          <>
            <div className='flex gap-4'>
              <Panel className='flex flex-col items-stretch gap-8 basis-0 grow'>
                <ProductInfoSection product={product} dispatch={dispatch} />
              </Panel>
              <Panel className='basis-0 grow'>
                <div className='flex flex-col gap-2 self-stretch'>
                  <ProductSpecsSection
                    specs={product.specs}
                    dispatch={dispatch}
                  />
                </div>
              </Panel>
            </div>
            <Panel className='w-full'>
              <ProductVariantsSection product={product} />
            </Panel>
            <Panel className='flex gap-4 ml-auto'>
              <Button
                type='submit'
                form='createProductForm'
                className='bg-amber-500 text-gray-900 font-semibold px-4 py-2 rounded-md'
              >
                Create Product
              </Button>
              <Button
                color='secondary'
                onClick={() => dispatch({ type: 'RESET' })}
              >
                Reset Form
              </Button>
            </Panel>
          </>
        )}
      </Form>
    </div>
  );
}
