import { forwardRef, useId } from 'react';

type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  id?: string;
  onSubmit: () => void;
  propogateSubmit?: boolean;
};

const Form = forwardRef(
  (
    { onSubmit, id, children, propogateSubmit = true, ...props }: FormProps,
    ref: React.Ref<HTMLFormElement>
  ) => {
    const backupId = useId();
    id = id ?? backupId;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      !propogateSubmit && e.stopPropagation();
      onSubmit();
    };

    return (
      <form ref={ref} onSubmit={handleSubmit} id={id} {...props}>
        {children}
      </form>
    );
  }
);

export default Form;
