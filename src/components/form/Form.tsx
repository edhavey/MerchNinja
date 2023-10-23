import useId from '@/hooks/useId';
import { HTMLFormField } from '@/types/types';
import { createContext, useCallback, useEffect, useReducer } from 'react';

const reducer = (
  state: Record<string, string>,
  action: typeof state & { type: string }
) => {
  switch (action.type) {
    case 'register':
      return { ...state, [action.name]: action.initialValue ?? '' };
    case 'update':
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
};

export const FormContext = createContext<FormContextValue | null>(null);

export default function Form({
  children,
  onSubmit,
  validate,
  formId,
}: FormProps) {
  const [fields, dispatch] = useReducer(reducer, {});

  formId = useId(formId);

  const handleChange = (e: React.ChangeEvent<HTMLFormField>) => {
    dispatch({ type: 'update', name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate && !validate(fields)) return;
    onSubmit(fields);
  };

  const register = useCallback((fields: Record<string, string>) => {
    for (const [name, initialValue] of Object.entries(fields)) {
      if (fields[name] === undefined) continue;
      dispatch({ type: 'register', name, initialValue });
    }
  }, []);

  const setFieldValue = (name: string, value: string) => {
    dispatch({ type: 'update', name, value });
  };

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <FormContext.Provider
      value={{
        values: fields,
        handleChange,
        register,
        setFieldValue,
      }}
    >
      <form id={formId} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

interface FormContextValue {
  values: Record<string, string | number | readonly string[] | undefined>;
  handleChange: (e: React.ChangeEvent<HTMLFormField>) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  register: (fields: Record<string, string>) => void;
  setFieldValue: (name: string, value: string) => void;
}

interface FormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> {
  children: React.ReactNode;
  onSubmit: (
    values: Record<string, string | number | readonly string[] | undefined>
  ) => void;
  validate?: (
    values: Record<string, string | number | readonly string[] | undefined>
  ) => Record<string, string>;
  formId?: string;
}
