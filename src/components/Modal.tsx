import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Modal = ({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    open &&
    createPortal(
      <div
        className='fixed inset-0 bg-black/50 flex items-center justify-center'
        onClick={handleBackdropClick}
      >
        <div className='px-4 pb-4 pt-8 flex flex-col items-center justify-center bg-gray-700 rounded border relative'>
          <button
            className='absolute top-0 right-1 p-1 text-gray-400/50 hover:text-amber-400/50 transition'
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          <div className='flex flex-col gap-4 items-center'>{children}</div>
        </div>
      </div>,
      document.getElementById('portal') as HTMLElement
    )
  );
};

export default Modal;
