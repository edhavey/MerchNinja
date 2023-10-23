/**
 * Component Props: columns, data, headers
 *
 */

import cn from '@/utils/cn';
import React from 'react';

type TableProps = React.HTMLProps<HTMLDivElement> & {
  columns: number | string;
  data: string[][];
  headers?: string[];
};

const Table = ({ columns, data, headers, className, ...props }: TableProps) => {
  const tableClasses = cn([
    tableColumnsClassName(columns),
    'border border-gray-400/30 rounded-lg bg-gray-100/20 text-gray-200',
    'focus-within:border-inherit',
    className,
  ]);

  if (headers) {
    if (headers.length > data[0].length) {
      throw new Error(
        'Headers length must be less than or equal to data length'
      );
    }
    for (let i = headers.length; i < data[0].length; i++) {
      headers.push('');
    }
  }

  return (
    <div className='grid grid-cols-[auto_4fr_3fr_auto] gap-4' {...props}>
      {headers && (
        <TableRow className='col-span-3 text-gray-400 text-sm'>
          {headers.map((header, i) => (
            <TableCell key={i}>{header}</TableCell>
          ))}
        </TableRow>
      )}
      {data.map((d, i) => (
        <div className='gap-4 subgrid col-span-full align-middle' key={i}>
          <div className='gap-8 subgrid col-span-3'>
            <Checkbox
              isChecked={spec.variant}
              handleCheckboxToggle={handleToggleVariant(i)}
            />
            <TextField
              id={i + '-name'}
              containerClassName='py-1 px-2'
              onChange={handleSpecChange(i, 'name')}
              value={spec.name}
            />
            <TextField
              id={i + '-value'}
              disabled={spec.variant}
              className=''
              containerClassName='py-1 px-2'
              onChange={handleSpecChange(i, 'value')}
              value={spec.value}
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
  );
};

function TableRow({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn('subgrid col-span-full', className)} {...props}>
      {children}
    </div>
  );
}

function TableCell({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

function tableColumnsClassName(columns: number | string): string {
  switch (typeof columns) {
    case 'number':
      return `grid-cols-[repeat(${columns},_1fr)]`;
    case 'string':
      return `grid-cols-[${columns}]`;
    default:
      return '';
  }
}

export default Table;
