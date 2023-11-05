import { useEffect, useState } from 'react';
import cn from '@/utils/cn';
import { FiRefreshCcw as RefreshIcon } from 'react-icons/fi';
import Panel from './Panel';

export default function AdminPageHeader({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    function formatDate(date = Date.now()) {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
        date
      );
      return formattedDate;
    }
    const formattedDate = formatDate();
    setLastUpdated(formattedDate);
  }, []);
  return (
    <Panel as='header' className={cn(className)}>
      <h1 className='text-3xl tracking-wide'>{children}</h1>
      <div className='ml-auto flex gap-4 p-2 bg-gray-800 border border-amber-400/30 rounded-lg'>
        <span>Last updated:</span>
        <span className='text-amber-400'>{lastUpdated}</span>
        <button className='hover:text-amber-400'>
          <RefreshIcon />
        </button>
      </div>
    </Panel>
  );
}
