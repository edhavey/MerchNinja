import { HTMLAttributes, createElement, forwardRef } from 'react';
import cn from '../../../utils/cn';

type PanelProps = HTMLAttributes<HTMLElement> & {
  as?:
    | 'div'
    | 'header'
    | 'footer'
    | 'section'
    | 'article'
    | 'aside'
    | 'main'
    | 'nav'
    | 'form'
    | React.ComponentType<any>;
};

const Panel = forwardRef<HTMLElement, PanelProps>(
  ({ children, className = '', as = 'div', ...props }, ref) => {
    return createElement(
      as,
      {
        className: cn([
          'flex border-amber-400/30 border rounded-lg bg-gray-900 p-6 items-center',
          className,
        ]),
        ref,
        ...props,
      },
      children
    );
  }
);

export default Panel;
