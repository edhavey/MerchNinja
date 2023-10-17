import cn from '../utils/cn';

const Checkbox = ({
  id,
  isChecked,
  handleCheckboxToggle,
}: {
  id?: string;
  isChecked: boolean;
  handleCheckboxToggle: () => void;
}) => {
  return (
    <div
      id={id}
      className={cn([
        'h-[62.5%] place-self-center aspect-square border rounded-md border-amber-400/30',
        isChecked ? 'bg-amber-400/30' : 'bg-gray-900/30',
      ])}
      onClick={() => handleCheckboxToggle()}
    />
  );
};

export default Checkbox;
