import HomeNavbar from '@/components/home-navbar';
import React, { ReactNode } from 'react';

const layoutDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col bg-slate-100 h-screen w-screen overflow-x-hidden">
        <HomeNavbar />
        <main className="h-fit w-full shrink-0 flex">{children}</main>
      </div>
    </>
  );
};

export default layoutDashboard;
