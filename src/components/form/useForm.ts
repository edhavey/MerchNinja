import { useContext, useEffect } from 'react';
import { FormContext } from './Form';

export const useForm = (fields?: Record<string, string>) => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  const { register } = context;

  useEffect(() => {
    if (!fields) return;
    console.log('Registering fields: ', fields);

    register(fields);
  }, [fields, register]);
  return context;
};
