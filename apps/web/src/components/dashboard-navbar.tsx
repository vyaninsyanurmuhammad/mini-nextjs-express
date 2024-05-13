import { Confetti } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const DashboardNavbar = () => {
  return (
    <>
      <div className="sticky px-12 py-6 bg-white flex flex-row items-center justify-between border-b-[1px] border-b-slate-300 shadow-lg">
        <div className="inline-flex flex-row gap-2 text-slate-blue-800">
          <span className="text-2xl font-extrabold tracking-tighter">
            ShowTime!
          </span>
          <Confetti weight="bold" size={32} />
        </div>

        <div className="flex flex-row gap-2">
          <div className="w-12 h-12 rounded-full bg-slate-blue-800 flex flex-shrink-0 justify-center items-center">
            <span className="font-bold text-white">VY</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800">Vyan Insya Nur Muhammad</span>
            <span className="text-sm text-slate-400">vyaninsya.nurmuhammad@gmail.com</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
