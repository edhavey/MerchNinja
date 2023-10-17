import { createContext } from 'react';
import { Brand, Category } from '../../types/types';
import {
  createBrand,
  getAllBrands as getAllProductBrands,
  getBrandByName,
} from '../../utils/services/brandService';
import { getAllCategories as getAllProductCategories } from '../../utils/services/categoryService';

interface AdminContextValue {
  getAllBrands: () => Promise<Brand[] | null>;
  getAllCategories: () => Promise<Category[] | null>;
  createNewBrand: (name: string) => Promise<Brand | null>;
}

// const mockCategories: Category[] = [
//   {
//     id: '1',
//     name: 'Category 1',
//     children: [
//       {
//         id: '1.1',
//         name: 'Category 1.1',
//         children: null,
//       },
//       {
//         id: '1.2',
//         name: 'Category 1.2',
//         children: null,
//       },
//       {
//         id: '1.3',
//         name: 'Category 1.3',
//         children: null,
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Category 2',
//     children: [
//       {
//         id: '2.1',
//         name: 'Category 2.1',
//         children: null,
//       },
//       {
//         id: '2.2',
//         name: 'Category 2.2',
//         children: null,
//       },
//       {
//         id: '2.3',
//         name: 'Category 2.3',
//         children: null,
//       },
//     ],
//   },
//   {
//     id: '3',
//     name: 'Category 3',
//     children: [
//       {
//         id: '3.1',
//         name: 'Category 3.1',
//         children: null,
//       },
//       {
//         id: '3.2',
//         name: 'Category 3.2',
//         children: null,
//       },
//       {
//         id: '3.3',
//         name: 'Category 3.3',
//         children: null,
//       },
//     ],
//   },
//   {
//     id: '4',
//     name: 'Category 4',
//     children: [
//       {
//         id: '4.1',
//         name: 'Category 4.1',
//         children: null,
//       },
//       {
//         id: '4.2',
//         name: 'Category 4.2',
//         children: null,
//       },
//       {
//         id: '4.3',
//         name: 'Category 4.3',
//         children: null,
//       },
//     ],
//   },
// ];

export const AdminContext = createContext<AdminContextValue | null>(null);

export default function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  async function getAllBrands(): Promise<Brand[] | null> {
    try {
      const brands = await getAllProductBrands();
      if (!brands) return null;
      return brands;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function getAllCategories(): Promise<Category[] | null> {
    try {
      const categories = await getAllProductCategories();
      if (!categories) return null;
      return categories as Category[];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function createNewBrand(name: string): Promise<Brand | null> {
    try {
      await createBrand(name);
      const brand = await getBrandByName(name);
      if (!brand) return null;
      return brand;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return (
    <AdminContext.Provider
      value={{
        getAllBrands,
        getAllCategories,
        createNewBrand,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
