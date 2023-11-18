import React from 'react';
import Sidebar from './_components/Sidebar';
import NavBar from './_components/NavBar';

const DashboardLayout = (
  {
    children
  }:
    {
      children: React.ReactNode;
    }) => {
  return (
    <div className='h-full'>
      <div className='h-20 md:pl-56 fixed inset-y-0 w-full z-50'>
        <NavBar />
      </div>
      <div className='hidden md:flex flex-col h-full w-56 fixed inset-y-0 z-50'>
        <Sidebar />
      </div>
      <main className='md:pl-56 pt-20 h-full'>
      {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
