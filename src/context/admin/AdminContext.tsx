import { createContext } from 'react';
import { Brand, Category, ParentCategory } from '../../types/types';
import {
  createBrand,
  getAllBrands as getAllProductBrands,
  getBrandByName,
} from '../../utils/services/brandService';
import {
  getAllCategories as getAllProductCategories,
  createCategory,
  getCategoryByNameAndParentId,
} from '../../utils/services/categoryService';

interface AdminContextValue {
  getAllBrands: () => Promise<Brand[] | null>;
  getAllCategories: () => Promise<ParentCategory[] | null>;
  createNewBrand: (name: string) => Promise<Brand | null>;
  createNewCategory: (
    name: string,
    parentId: number | null
  ) => Promise<Category | null>;
}

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

  async function getAllCategories(): Promise<ParentCategory[] | null> {
    try {
      const categories = await getAllProductCategories();
      if (!categories) return null;
      return categories as ParentCategory[];
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

  async function createNewCategory(
    name: string,
    parentId: number | null
  ): Promise<Category | null> {
    try {
      await createCategory(name, parentId ?? 0);
      const category = await getCategoryByNameAndParentId(name, parentId ?? 0);
      if (!category) return null;
      return category;
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
        createNewCategory,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
