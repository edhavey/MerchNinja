import { useEffect } from 'react';
import TextField from '../../../../components/form/old/TextField';
import { AiOutlineClose as DeleteIcon } from 'react-icons/ai';
import Checkbox from '../../../../components/form/old/Checkbox';
import Button from '../../../../components/Button';
import { NewProductAction, NewProductSpec } from '@/types/types';

const emptySpecs: [NewProductSpec] = [
  {
    name: '',
    value: '',
    variant: false,
  },
];

const ProductSpecsSection = ({
  specs,
  dispatch,
}: {
  specs: NewProductSpec[];
  dispatch: React.Dispatch<NewProductAction>;
}) => {
  const handleSpecChange = (i: number, specProperty: string) => (
    value: string
  ) => {
    const newSpecs = [...specs];
    newSpecs[i] = { ...newSpecs[i], [specProperty]: value };
    dispatch({ type: 'SET_SPECS', payload: newSpecs });
  };

  const handleNewSpec = () => {
    dispatch({
      type: 'SET_SPECS',
      payload: [...specs, { name: '', value: '', variant: false }],
    });
  };

  const handleRemoveSpec = (i: number) => {
    if (specs.length === 1) return;
    const newSpecs = [...specs];
    newSpecs.splice(i, 1);
    dispatch({ type: 'SET_SPECS', payload: newSpecs });
  };

  const handleToggleVariant = (i: number) => () => {
    const newSpecs = [...specs];
    const currentSpec = newSpecs[i];
    newSpecs[i] = {
      ...currentSpec,
      variant: !currentSpec.variant,
      value: null,
    };
    dispatch({ type: 'SET_SPECS', payload: newSpecs });
  };

  useEffect(() => {
    if (specs.length === 0) {
      dispatch({
        type: 'SET_SPECS',
        payload: emptySpecs,
      });
    }
  }, [specs, dispatch]);

  return (
    <section className='flex flex-col gap-6 grow'>
      <h2 className='text-2xl text-center text-amber-400/80'>Specs</h2>
      <div className='grid grid-cols-[auto_4fr_3fr_auto] gap-4'>
        <div className='subgrid col-span-3 text-center text-gray-400 text-sm'>
          <span className='col-span-1'>Variant?</span>
          <span className='col-span-1'>Name</span>
          <span className='col-span-1'>Value</span>
        </div>
        {specs.map((spec, i) => (
          <div className='gap-4 subgrid col-span-full align-middle' key={i}>
            <div className='gap-8 subgrid col-span-3'>
              <Checkbox
                isChecked={spec.variant}
                handleCheckboxToggle={handleToggleVariant(i)}
              />
              <TextField
                id={i + '-name'}
                girth='sm'
                onChange={handleSpecChange(i, 'name')}
                value={spec.name}
              />
              <TextField
                id={i + '-value'}
                disabled={spec.variant}
                girth='sm'
                onChange={handleSpecChange(i, 'value')}
                value={spec.value ?? ''}
              />
            </div>
            <button
              className='text-xl text-gray-400/50 hover:text-amber-400/80 disabled:text-gray-400/20'
              disabled={specs.length === 1}
              onClick={() => handleRemoveSpec(i)}
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>
      <Button
        color='tertiary'
        size='sm'
        className='self-end mt-auto'
        onClick={handleNewSpec}
      >
        Add Spec
      </Button>
    </section>
  );
};

export default ProductSpecsSection;

/*
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='font-normal text-gray-400 text-sm'>Name</th>
            <th className='font-normal text-gray-400 text-sm'>Value</th>
            <th className='font-normal text-gray-400 text-sm'>Unit</th>
            <th className='font-normal text-gray-400 text-sm'></th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, i) => (
            <tr key={i}>
              <td>
                <TextField
                  value={spec.name}
                  onChange={handleSpecChange(i + '', 'name')}
                />
              </td>
              <td>
                <TextField
                  value={spec.value}
                  onChange={handleSpecChange(i + '', 'value')}
                />
              </td>
              <td>
                <TextField
                  value={spec.unit}
                  onChange={handleSpecChange(i + '', 'unit')}
                />
              </td>
              <td>
                <button
                  className='text-xl hover:text-amber-400/80'
                  onClick={() => handleRemoveSpec(i + '')}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
*/

/* <ul className='flex flex-col gap-2'>
        {specs.map((spec, i) => (
          <Spec
            key={i}
            id={`spec${i}`}
            spec={spec}
            handleSpecChange={handleSpecChange}
            handleRemoveSpec={handleRemoveSpec}
          />
        ))}
      </ul> */
