import { HTMLProps } from 'react';

export type InputOption = {
  value: string | null;
  name: string;
  [key: string]: string | null;
};
export type InputGroup = {
  name: string;
  options: InputOption[];
};

export type Category = {
  id: string;
  name: string;
  children: Category[] | null;
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
  variants: Variant[];
};

export type NewProductSpec = {
  name: string;
  value: string;
  unit: string;
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
  | { type: 'SET_VARIANTS'; payload: Variant[] }
  | { type: 'SET_PRODUCT'; payload: NewProduct };

export type Variant = {
  price: string;
  quantity: string;
  [key: string]: string | number;
};
