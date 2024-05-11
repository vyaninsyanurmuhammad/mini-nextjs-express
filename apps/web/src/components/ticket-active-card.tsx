import React from 'react';
import { Separator } from './ui/separator';
import {
  CalendarDots,
  Clock,
  MapPinLine,
  Ticket,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

const TicketActiveCard = ({
  src,
  title,
  location,
  time,
  date,
  tickets,
  buyDate,
}: {
  src: string;
  title: string;
  location: string;
  time: string;
  date: string;
  buyDate?: string;
  tickets?: number;
}) => {
  return (
    <>
      <div className="h-fit relative flex flex-col sm:flex-row gap-4 rounded-xl bg-white p-2 lg:pr-8 shadow-xl">
        <div className="h-48 w-full sm:w-80 sm:shrink-0 rounded-lg bg-slate-blue-800 overflow-hidden">
          <Image
            className="object-cover w-full h-full !relative"
            src={`http://localhost:8000/images/${src}`}
            fill
            sizes="100%"
            alt={title}
          />
        </div>
        <div className="h-auto relative shrink grow justify-center flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-800 tracking-tighter">
            {title}
          </h2>
          <div className="flex flex-col gap-2.5">
            {buyDate && (
              <div className="w-full h-fit grid grid-cols-5 gap-3 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">buy date</p>
                <p className="col-span-4 text-slate-800 text-sm break-words font-semibold">
                  {buyDate}
                </p>
              </div>
            )}
            <div className="w-full flex flex-wrap gap-4 gap-y-2">
              <div className="flex gap-1.5 items-center text-slate-500">
                <MapPinLine size={20} />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex gap-1.5 items-center text-slate-500">
                <Clock size={20} />
                <span className="text-sm">{time}</span>
              </div>
              <div className="flex gap-1.5 items-center text-slate-500">
                <CalendarDots size={20} />
                <span className="text-sm">{date}</span>
              </div>
            </div>
            {tickets && (
              <div className="flex flex-wrap gap-4 gap-y-2">
                <div className="flex gap-1.5 items-center text-slate-500">
                  <Ticket size={20} />
                  <span className="text-sm">{tickets} tickets</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketActiveCard;
