import useId from '@/hooks/useId';
import cn from '@/utils/cn';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

export default function Form({
  children,
  className = '',
  onSubmit,
  formId,
  devtools = false,
}: FormProps) {
  formId = useId(formId);
  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <form
          id={formId}
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn([className])}
        >
          {children}
        </form>
      </FormProvider>
      {devtools && <DevTool control={methods.control} />}
    </>
  );
}

type FormProps = Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> & {
  onSubmit: (values: Record<string, unknown>) => void;
  formId?: string;
  devtools?: boolean;
};
