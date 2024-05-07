import React from 'react';
import { Separator } from './ui/separator';
import {
  CalendarDots,
  Clock,
  MapPinLine,
  Ticket,
} from '@phosphor-icons/react/dist/ssr';

const TicketActiveCard = () => {
  return (
    <>
      <div className="h-fit relative flex gap-4 rounded-xl bg-white p-2 shadow-xl">
        <div className="h-48 w-80 shrink-0 rounded-lg bg-slate-blue-800"></div>
        <div className="h-auto relative shrink grow justify-center flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-800 tracking-tighter">
            Iwan Fals Concert
          </h2>
          <div className="flex flex-col gap-2.5">
            <div className="w-full flex flex-wrap gap-4 gap-y-2">
              <div className="flex gap-1.5 items-center text-slate-500">
                <MapPinLine size={20} />
                <span className="text-sm">Jakarta</span>
              </div>
              <div className="flex gap-1.5 items-center text-slate-500">
                <Clock size={20} />
                <span className="text-sm">15.00</span>
              </div>
              <div className="flex gap-1.5 items-center text-slate-500">
                <CalendarDots size={20} />
                <span className="text-sm">12-12-2024</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 gap-y-2">
              <div className="flex gap-1.5 items-center text-slate-500">
                <Ticket size={20} />
                <span className="text-sm">3 tickets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketActiveCard;
