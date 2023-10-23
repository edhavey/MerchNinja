import cn from '../../../utils/cn';

const Checkbox = ({
  id,
  isChecked,
  handleCheckboxToggle,
  className = '',
}: {
  id?: string;
  isChecked: boolean;
  handleCheckboxToggle: () => void;
  className?: string;
}) => {
  return (
    <div
      id={id}
      className={cn([
        'h-6 place-self-center aspect-square border rounded-md border-amber-400/30 cursor-pointer',
        isChecked ? 'bg-amber-400/30' : 'bg-gray-900/30',
        className,
      ])}
      onClick={() => handleCheckboxToggle()}
    />
  );
};

export default Checkbox;
