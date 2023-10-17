import { useRef } from 'react';

type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  id: string;
  onSubmit: () => void;
};

const Form = ({ onSubmit, id, children, ...props }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} id={id} {...props}>
      {children}
    </form>
  );
};

export default Form;
