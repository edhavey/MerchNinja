import { useEffect, useReducer } from 'react';
import AdminPageHeader from '@/pages/admin/components/AdminPageHeader';
import {
  Brand,
  Category,
  NewProduct,
  NewProductAction,
  NewProductSpec,
  NewProductVariant,
} from '@/types/types';
import ProductInfoSection from './components/ProductInfoSection';
import ProductSpecsSection from './components/ProductSpecsSection';
import ProductVariantsSection from './components/ProductVariantsSection';
import Button from '@/components/Button';
import Panel from '@/pages/admin/components/Panel';
import Form from '@/components/form/Form';

export default function CreateProduct() {
  function handleCreateProduct() {
    //TODO create new product
    console.log('Creating new product');
  }

  return (
    <div className='min-h-full max-w-screen-xl flex flex-col gap-4 basis-0 grow mx-auto p-6'>
      <AdminPageHeader className=''>Create Product</AdminPageHeader>
      <Form
        id='createProductForm'
        onSubmit={handleCreateProduct}
        className='flex flex-col gap-4'
        devtools={true}
      >
        <>
          <div className='flex gap-4'>
            <Panel className='flex flex-col items-stretch gap-8 basis-0 grow'>
              <ProductInfoSection />
            </Panel>
            {/* <Panel className='basis-0 grow'>
              <div className='flex flex-col gap-2 self-stretch'>
                <ProductSpecsSection
                  specs={product.specs}
                  dispatch={dispatch}
                />
              </div>
            </Panel> */}
          </div>
          {/* <Panel className='w-full'>
            <ProductVariantsSection product={product} />
          </Panel> */}
          {/* <Panel className='flex gap-4 ml-auto'>
            <Button
              type='submit'
              form='createProductForm'
              className='bg-amber-500 text-gray-900 font-semibold px-4 py-2 rounded-md'
            >
              Create Product
            </Button>
          </Panel> */}
        </>
      </Form>
    </div>
  );
}
