import { Outlet } from 'react-router-dom';
import AdminHeader from '../pages/admin/components/AdminHeader';
import AdminSidebar from '../pages/admin/components/AdminSidebar';
import { useRef, useState } from 'react';

export default function AdminLayout() {
  return (
    <>
      <div className='min-h-screen bg-gray-800 flex flex-col text-white'>
        <AdminHeader />
        <div className='flex grow'>
          <AdminSidebar />
          <main className='grow flex'>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
