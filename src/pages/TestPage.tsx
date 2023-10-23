import Page from '@/components/Page';
import Form from '@/components/form/Form';
import Select from '@/components/form/Select';

const SELECT_OPTIONS = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const TestPage = () => {
  const onSubmit = (values: Record<string, unknown>) => {
    console.log(values);
  };

  const validate = (values: Record<string, unknown>) => {
    const errors: Record<string, string> = {};
    if (!values.test) {
      errors.test = 'Required';
    }
    return errors;
  };

  return (
    <Page className='bg-gray-800 flex flex-col gap-8 text-white justify-center items-center'>
      <h1>Test Page</h1>
      <Form
        className='flex justify-center items-center'
        onSubmit={onSubmit}
        validate={validate}
      >
        <Select options={SELECT_OPTIONS} name='test' label='Test' />
        {/* <TextField
          orientation='vertical'
          labelProps={{ className: 'text-center' }}
          label='Test'
          name='test'
        /> */}
      </Form>
    </Page>
  );
};

export default TestPage;
