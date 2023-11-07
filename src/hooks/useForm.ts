import { useContext, useEffect } from 'react';
import { FormContext } from '../components/form/Form';

export const useForm = (
  name: string,
  initialValue: string | string[] | boolean
) => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  const { updateFormField, values } = context;
  const handleChange = (value: string | string[] | boolean) => {
    updateFormField(name, value);
  };
  useEffect(() => {
    if (values[name]) return;
    updateFormField(name, initialValue);
  }, [updateFormField, name, initialValue]);

  return {
    updateFormField: handleChange,
  };
};
