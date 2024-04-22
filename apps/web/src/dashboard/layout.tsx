import HomeNavbar from "@/components/home-navbar";
import React, { ReactNode } from 'react';

const layoutDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col bg-slate-50 h-screen w-screen overflow-x-hidden">
        <HomeNavbar />
        <main className="h-full bg-slate-100">{children}</main>
      </div>
    </>
  );
};

export default layoutDashboard;
