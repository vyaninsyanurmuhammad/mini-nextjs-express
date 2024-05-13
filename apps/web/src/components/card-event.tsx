import React from 'react';
import {
  CalendarDots,
  Clock,
  MapPinLine,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

const CardEvent = ({
  className,
  src,
  title,
  location,
  time,
  date,
  price,
  categories,
}: {
  className?: string;
  src: string;
  title: string;
  location: string;
  time: string;
  date: string;
  price: string;
  categories: string[];
}) => {
  return (
    <>
      <div
        className={`w-full h-full bg-white rounded-xl shadow-xl overflow-hidden ${className}`}
      >
        <div className="h-48 w-full bg-slate-blue-800 p-4 flex justify-end relative">
          <div className="w-fit h-fit bg-blue-crayola-900 rounded-full px-4 py-1 flex justify-center items-center z-10">
            <span className="text-white text-sm font-semibold tracking-tighter">
              upcoming
            </span>
          </div>
          <Image
            className="object-cover w-full h-full z-0"
            src={`http://localhost:8000/images/${src}`}
            fill
            sizes="100%"
            alt={title}
          />
        </div>
        <div className="w-full flex flex-col px-6 py-6 gap-1">
          <div className="w-full flex gap-2.5 items-center justify-between">
            <h2 className="w-full tracking-tighter truncate overflow-hidden text-lg font-semibold text-slate-800">
              {title}
            </h2>
            <span className="w-fit flex shrink-0 text-lg font-bold text-slate-800">
              {price}
            </span>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-wrap gap-2.5">
              {categories.map((data, index) => (
                <div
                  key={`${data}-${index}`}
                  className="text-xs text-slate-600 rounded-full py-1 px-3 bg-slate-100"
                >
                  {data}
                </div>
              ))}

              {/* <div className="text-xs text-slate-600 rounded-full py-1 px-3 bg-slate-100">
                Art
              </div> */}
            </div>
            <div className="flex flex-wrap gap-4 gap-y-2">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CardEvent;
