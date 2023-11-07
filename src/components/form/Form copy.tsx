import useId from '@/hooks/useId';
import cn from '@/utils/cn';
import { createContext, useCallback, useEffect, useRef } from 'react';

export const FormContext = createContext<FormContextValue | null>(null);

export default function Form({
  children,
  className = '',
  onSubmit,
  validate,
  formId,
}: FormProps) {
  formId = useId(formId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate && !validate(formFields.current)) return;
    onSubmit(formFields.current);
  };

  useEffect(() => {
    console.log(formFields.current);
  }, [formFields]);

  return (
    <FormContext.Provider
      value={{
        values: formFields.current,
        updateFormField,
      }}
    >
      <form id={formId} onSubmit={handleSubmit} className={cn([className])}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

interface FormContextValue {
  values: FormFields;
  handleSubmit?: () => void;
  updateFormField: (name: string, value: string | string[] | boolean) => void;
}

interface FormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (values: FormFields) => void;
  validate?: (values: FormFields) => string[];
  formId?: string;
}

export interface FormFields
  extends Record<string, string | string[] | boolean> {}
