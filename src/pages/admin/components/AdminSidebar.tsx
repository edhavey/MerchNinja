import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { ReactNode, useEffect, useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import adminSidebarLinks from '../constants/adminSidebarLinks';
import cn from '../../../utils/cn';

export default function AdminSidebar() {
  return (
    <aside className='bg-gray-900 text-gray-200 text-lg w-64 flex-shrink-0'>
      <nav className='flex flex-col gap-2 py-4 px-4'>
        {adminSidebarLinks.map(({ text, to, icon, children }) => {
          if (children) {
            return (
              <AdminSidebarSubmenu
                icon={icon && '/icons/' + icon}
                key={text}
                text={text}
                links={children}
              />
            );
          } else {
            return (
              <AdminSidebarLink icon={icon} key={to} to={to} text={text} />
            );
          }
        })}
      </nav>
    </aside>
  );
}

function AdminSidebarLink({
  text = '',
  icon = '',
  className = '',
  ...props
}: LinkProps & { text?: string; icon?: string }) {
  return (
    <AdminSidebarItem icon={icon}>
      <Link className={cn('w-full', className)} {...props}>
        <span>{text}</span>
      </Link>
    </AdminSidebarItem>
  );
}

function AdminSidebarSubmenu({
  text = '',
  links = [],
  icon = undefined,
}: {
  text: string;
  icon: string | undefined;
  links?: { text: string; to: string }[];
}) {
  const [open, setOpen] = useState(false);

  // const buttonClasses = cn([
  //   "flex items-center gap-2 px-4 py-2",
  //   "hover:bg-gray-800 rounded",
  //   "transition-colors duration-200",
  // ]);

  const caretClasses = cn([
    'ml-auto',
    open ? 'text-amber-400' : 'text-gray-400',
    'transition-transform duration-200',
    'transform',
    open ? 'rotate-180' : '',
  ]);

  return (
    <div className='flex flex-col gap-2 grow'>
      <AdminSidebarItem icon={icon}>
        <button
          className='grow flex items-center'
          onClick={() => setOpen(!open)}
        >
          <span>{text}</span>
          <FontAwesomeIcon icon={faCaretUp} className={caretClasses} />
        </button>
      </AdminSidebarItem>
      {open && (
        <div className='flex flex-col ml-8'>
          {links.map(({ text, to }) => (
            <AdminSidebarLink
              to={to}
              text={text}
              key={to}
              className='text-base'
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AdminSidebarItem({
  icon: iconName,
  children,
  className,
}: {
  icon?: string | undefined;
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [icon, setIcon] = useState<string>();

  const classes = cn([
    'flex gap-4 px-4 py-2',
    'hover:bg-gray-800 rounded',
    'transition-colors duration-200',
    className,
  ]);

  useEffect(() => {
    if (icon || !iconName) {
      return;
    }

    (async () => {
      const image = await import(/* @vite-ignore */ iconName.toLowerCase());
      image && setIcon(image.default);
    })();
  }, [iconName, icon]);

  return (
    <div className={classes}>
      {icon && (
        <span>
          <img src={icon} alt='' className='w-6 h-6' />
        </span>
      )}
      {children}
    </div>
  );
}
