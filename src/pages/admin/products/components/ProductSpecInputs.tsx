import TextField from '@/components/form/old/TextField';
import { AiOutlineClose as DeleteIcon } from 'react-icons/ai';
import Checkbox from '@/components/form/checkbox/Checkbox';
import useId from '@/hooks/useId';
import TextInput from '@/components/form/TextInput';
import { NewProductSpec } from '@/types/types';

const ProductSpecInputs = ({
  id,
  spec,
  deleteSpec,
  updateSpec,
  deleteDisabled = false,
}: {
  id: string;
  spec: NewProductSpec;
  deleteSpec: (name: string) => void;
  updateSpec: (
    spec: NewProductSpec,
    key: string,
    value: string | boolean
  ) => void;
  deleteDisabled?: boolean;
}) => {
  id = useId(id);

  return (
    <div className='gap-4 subgrid col-span-full align-middle'>
      <div className='gap-8 subgrid col-span-3'>
        {/* <Checkbox
          value={id}
          name={'specVariant'}
          defaultChecked={spec.variant}
        /> */}
        <TextInput
          name='specName'
          value={spec.name}
          onChange={(value) => updateSpec(spec, 'name', value)}
          uncontrolled
        />
        <TextInput
          name='specValue'
          disabled={!spec.variant}
          value={spec.value ?? ''}
          onChange={(value) => updateSpec(spec, 'value', value)}
        />
      </div>
      <button
        className='text-xl text-gray-400/50 hover:text-amber-400/80 disabled:text-gray-400/20'
        disabled={deleteDisabled}
        onClick={() => deleteSpec(spec.name)}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default ProductSpecInputs;
