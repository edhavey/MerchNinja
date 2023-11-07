import cn from '@/utils/cn';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Dialog = ({
  dialogRef,
  className,
  children,
  portalId = 'portal',
  onCancel,
  ...rest
}: DialogProps) => {
  const { modalLoading } = useDialog(portalId);

  className = cn(['bg-transparent backdrop:bg-black/40', className]);

  return (
    !modalLoading &&
    createPortal(
      <dialog
        ref={dialogRef}
        className={className}
        onCancel={onCancel}
        {...rest}
      >
        {children}
      </dialog>,
      document.getElementById(portalId) as HTMLElement
    )
  );
};

const useDialog = (portalId = 'portal') => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let portal = document.getElementById(portalId);
    const root = document.getElementById('root');
    if (portal || !root) return;
    portal = document.createElement('div');
    portal.id = portalId;
    root.insertAdjacentElement('afterend', portal);
    setIsLoading(false);
  }, [portalId]);
  return { modalLoading: isLoading };
};

export type DialogProps = {
  dialogRef?: React.Ref<HTMLDialogElement>;
  portalId?: string;
  onCancel?: () => void;
} & React.HTMLProps<HTMLDialogElement>;

export default Dialog;
