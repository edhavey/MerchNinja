import Button from '@/components/Button';
import Page from '@/components/Page';
import Form from '@/components/form/Form';
import NumberInput from '@/components/form/NumberInput';
import PriceInput from '@/components/form/PriceInput';
import Select from '@/components/form/Select';
import Switch from '@/components/form/Switch';
import TextInput from '@/components/form/TextInput';
import Textarea from '@/components/form/Textarea';
import Checkbox from '@/components/form/checkbox/Checkbox';
import Modal from '@/components/overlay/Modal';

const SELECT_OPTIONS = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const TestPage = () => {
  const onSubmit = (data: Record<string, unknown>) => {
    console.log('Form Submitted');
    console.log(data);
  };

  return (
    <Page className='bg-gray-800 flex flex-col gap-8 text-white justify-center items-center'>
      <h1>Test Page</h1>
      <div>
        <Form onSubmit={onSubmit} className='flex flex-col gap-4'>
          {true && <TextInput name='textTest' />}
          {true && <NumberInput name='numberTest' />}
          {true && <PriceInput name='priceTest' />}
          {true && <Select options={SELECT_OPTIONS} name='selectTest' />}
          {true && (
            <div>
              <Checkbox value='val1' name='textCheckbox1' label='CB Test 1' />
              <Checkbox
                value='val2'
                name='textCheckbox1'
                label='CB Test 2'
                defaultChecked={true}
              />
            </div>
          )}
          {true && <Textarea name='textareaTest' />}
          {/* {false && <Switch name='switchTest' />} */}
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
      {/* <div>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal open={isOpen} closeModal={() => setIsOpen(false)}>
          <div className='bg-white p-4 rounded'>
            <h2>Modal</h2>
            <p>Modal Content</p>
            <button onClick={() => setIsOpen(false)}>Close Modal</button>
          </div>
        </Modal>
      </div> */}
    </Page>
  );
};

export default TestPage;
