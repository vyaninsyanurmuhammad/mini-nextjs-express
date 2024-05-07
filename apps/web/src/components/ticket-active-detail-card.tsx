import React from 'react';
import { Separator } from './ui/separator';

const TicketActiveDetailCard = () => {
  return (
    <>
      <div className="w-full h-fit relative group rounded-xl shrink-0 overflow-hidden">
        {/* <div className="absolute z-10 bg-slate-800/50 h-full w-full">
              <Button>share</Button>
            </div> */}
        <div className="h-fit relative flex flex-col bg-slate-600 p-2 overflow-hidden">
          <div className="h-fit w-full rounded-t-xl bg-white relative overflow-hidden">
            <div className="h-fit p-2 w-full bg-white">
              <div className="h-fit p-2 w-full shrink-0 bg-slate-blue-800 rounded-lg">
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

            <div className="h-fit w-full flex flex-col gap-2 shrink-0 p-2 pb-6 bg-white">
              <div className="w-full h-fit grid grid-cols-5 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm">ticket code</p>
                <p className="col-span-4 text-slate-800 text-sm font-semibold">
                  3131h3fd-313hijk3g1h-344jrij3-233fs
                </p>
              </div>
              <div className="w-full h-fit grid grid-cols-5 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm">date</p>
                <p className="col-span-4 text-slate-800 text-sm font-semibold">
                  12/12/2024
                </p>
              </div>
              <div className="w-full h-fit grid grid-cols-5 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm">time</p>
                <p className="col-span-4 text-slate-800 text-sm font-semibold">
                  15:00
                </p>
              </div>
              <div className="w-full h-full grid grid-cols-5 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm">seat code</p>
                <p className="col-span-4 text-slate-800 text-sm font-bold p-2 bg-slate-100 rounded-md w-fit">
                  A1
                </p>
              </div>
            </div>
            <div className="absolute -bottom-2 w-full flex justify-around">
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
              <div className="h-4 w-4 rounded-full bg-slate-600"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketActiveDetailCard;
