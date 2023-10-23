import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Panel from '@/pages/admin/components/Panel';
import React from 'react';
import cn from '@/utils/cn';

const Modal = ({
  className = '',
  backdropClassName = '',
  children,
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  backdropClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  className = cn(['flex flex-col pt-0 text-white', className]);
  backdropClassName = cn([
    'fixed inset-0 bg-black/50 flex items-center justify-center',
    backdropClassName,
  ]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    open &&
    createPortal(
      <div className={backdropClassName} onClick={handleBackdropClick}>
        <Panel className={className}>
          <button
            className='self-end text-gray-400/50 mt-1 -mr-4 hover:text-amber-400/50 transition'
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          {children}
        </Panel>
      </div>,
      document.getElementById('portal') as HTMLElement
    )
  );
};

export default Modal;
