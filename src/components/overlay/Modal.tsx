import { useEffect, useRef } from 'react';
import Dialog, { DialogProps } from './Dialog';
import cn from '@/utils/cn';

const Modal = ({
  dialogRef,
  open,
  closeModal,
  children,
  className,
  ...rest
}: ModalProps) => {
  dialogRef = useModal(dialogRef);

  className = cn(['open:animate-slidein-top', className]);

  const handleCancel = () => {
    console.log('cancel');
    closeModal();
  };

  useEffect(() => {
    if (!dialogRef) return;
    if (open === true) {
      console.log('open');

      dialogRef.current?.showModal();
    } else {
      console.log('close');
      dialogRef.current?.close();
    }
  }, [open, dialogRef]);

  return (
    <Dialog
      dialogRef={dialogRef}
      className={className}
      onCancel={handleCancel}
      {...rest}
    >
      {children}
    </Dialog>
  );
};

const useModal = (
  dialogRef?: React.RefObject<HTMLDialogElement>
): React.RefObject<HTMLDialogElement> => {
  const backupRef = useRef<HTMLDialogElement>(null);
  dialogRef ??= backupRef;
  return dialogRef;
};

export type ModalProps = {
  open: boolean;
  closeModal: () => void;
  dialogRef?: React.RefObject<HTMLDialogElement>;
} & DialogProps;

export default Modal;
