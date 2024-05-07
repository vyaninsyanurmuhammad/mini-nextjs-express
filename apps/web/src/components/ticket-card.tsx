import React from 'react';
import { Separator } from "./ui/separator";

const TicketCard = () => {
  return (
    <>
      <div className="w-[480px] p-2 flex-col bg-slate-600 rounded-xl overflow-hidden relative">
        <div className="bg-slate-600 rounded-full h-8 w-8 absolute -left-4 top-[184px]"></div>
        <div className="bg-slate-600 rounded-full h-8 w-8 absolute -right-4 top-[184px]"></div>
        <div className="bg-slate-600 rounded-full h-8 w-8 absolute -left-4 bottom-[184px]"></div>
        <div className="bg-slate-600 rounded-full h-8 w-8 absolute -right-4 bottom-[184px]"></div>
        <div className="w-full flex-col bg-white rounded-xl">
          <div className="w-full h-48 p-2">
            <div className="w-full h-full bg-slate-blue-800 rounded-lg flex items-end p-2">
              <div className="flex justify-center items-center gap-2 w-fit h-fit bg-white rounded-md py-2 px-4">
                <h1 className="text-2xl font-semibold tracking-tighter text-slate-800">
                  Iwan Fals Concert
                </h1>
                <p className="text-slate-blue-800 text-2xl font-bold tracking-tight">
                  #2024
                </p>
              </div>
            </div>
          </div>
          <div className="border-b-2 border-dashed mx-4"></div>
          <div className="flex h-48 w-full bg-white p-2">
            <div className="flex flex-row justify-between w-full h-full bg-white rounded-lg">
              <div className="h-full w-full flex flex-col justify-center items-center">
                <p className="text-slate-500 text-sm">seat code</p>
                <p className="text-3xl font-bold text-slate-800">A1</p>
              </div>
              <Separator orientation="vertical" />
              <div className="h-full w-full flex flex-col justify-center items-center">
                <p className="text-slate-800 text-sm font-medium">Jum'at</p>
                <p className="text-3xl font-bold text-slate-800">15 Nov</p>
                <p className="text-slate-800 text-xl font-bold">2024</p>
              </div>
              <Separator orientation="vertical" />
              <div className="h-full w-full flex flex-col justify-center items-center">
                <p className="text-3xl font-bold text-slate-800">15:00</p>
              </div>
            </div>
          </div>
          <div className="border-b-2 border-dashed mx-4"></div>
          <div className="w-full h-48 shrink-0 bg-white p-2">
            <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-lg">
              <p className="text-slate-500 text-sm">ticket code</p>
              <p className="text-slate-800 text-sm font-semibold">
                3131h3fd-313hijk3g1h-344jrij3-233fs
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketCard;
