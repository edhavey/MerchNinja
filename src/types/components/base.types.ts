export interface BaseComponentProps {
  id?: string;
}

export interface BaseFormControlProps extends BaseComponentProps {
  name: string;
  label?: string;
  error?: string;
}
