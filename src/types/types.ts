import React, { HTMLProps } from 'react';

export type Category = {
  id: number;
  name: string;
  parentId: number | null;
};

export type ParentCategory = {
  id: number;
  name: string;
  children: Category[];
};

export type Brand = {
  id: number;
  name: string;
};

export type InputComponentProps = HTMLProps<HTMLFormElement> & {
  label: string;
  width?: 'full' | 'default';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

export type NewProduct = {
  name: string;
  price: string;
  stock: number;
  description: string;
  brand: Brand | null;
  category: Category | null;
  images: File[];
  specs: NewProductSpec[];
  variants: NewProductVariant[];
};

export type NewProductSpec = {
  name: string;
  value: string | null;
  variant: boolean;
};

export type NewProductVariantSpec = NewProductSpec & {
  variant: true;
};

export type NewProductAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_PRICE'; payload: string }
  | { type: 'SET_STOCK'; payload: number }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'SET_BRAND'; payload: Brand }
  | { type: 'SET_CATEGORY'; payload: Category }
  | { type: 'SET_IMAGES'; payload: File[] }
  | { type: 'SET_SPECS'; payload: NewProductSpec[] }
  | { type: 'SET_VARIANTS'; payload: NewProductVariant[] }
  | { type: 'SET_PRODUCT'; payload: NewProduct }
  | { type: 'RESET'; payload?: undefined };

export type NewProductVariant = {
  price: string;
  quantity: string;
  [key: string]: string | number;
};

export type UUID = string;

export type NewCategory = Omit<Category, 'id'>;

export type HTMLFormField =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
