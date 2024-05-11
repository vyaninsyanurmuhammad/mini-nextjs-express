import React from 'react';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { SeatPositionType } from '@/models/seat-position-model';

const TicketTransactionCard = ({
  title,
  year,
  ticketId,
  buyDate,
  date,
  time,
  seatCode,
  location,
  src,
  price,
  total,
  points,
  discount,
  totalBill,
}: {
  title: string;
  year: string;
  ticketId: string;
  buyDate: string;
  date: string;
  time: string;
  seatCode: SeatPositionType[];
  location: string;
  src: string;
  price: number | string;
  total: number | string;
  points: number;
  discount: number;
  totalBill: string;
}) => {
  return (
    <>
      <div className="w-full h-full p-2 flex-col bg-slate-600 rounded-xl overflow-hidden relative">
        <div className="w-full flex-col bg-white rounded-xl">
          <div className="w-full h-48 p-2">
            <div className="w-full h-full bg-slate-blue-800 rounded-lg flex items-end p-2 relative">
              <Image
                className="object-cover w-full h-full z-0"
                src={`http://localhost:8000/images/${src}`}
                fill
                sizes="100%"
                alt={title}
              />
              <div className="flex justify-center items-center gap-2 w-fit h-fit bg-white rounded-md py-2 px-4 relative">
                <h1 className="text-2xl font-semibold tracking-tighter text-slate-800">
                  {title}
                </h1>
                <p className="text-slate-blue-800 text-2xl font-bold tracking-tight">
                  #{year}
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full">
            <div className="border-b-2 border-dashed mx-4 relative"></div>
            <div className="bg-slate-600 rounded-full h-8 w-8 absolute -left-4 -top-4"></div>
            <div className="bg-slate-600 rounded-full h-8 w-8 absolute -right-4 -top-4"></div>
          </div>
          <div className="flex h-fit w-full bg-white px-4 py-8 items-center justify-center">
            <div className="h-fit w-full flex flex-col gap-2 shrink-0 bg-white">
              <div className="w-full h-fit grid grid-cols-5 gap-3 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">transaction code</p>
                <p className="col-span-4 text-slate-800 text-sm break-words font-semibold">
                  {ticketId}
                </p>
              </div>
              <div className="w-full h-fit grid grid-cols-5 gap-3 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">buy date</p>
                <p className="col-span-4 text-slate-800 text-sm break-words font-semibold">
                  {buyDate}
                </p>
              </div>
              <div className="w-full h-fit grid grid-cols-5 gap-3 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">event date</p>
                <p className="col-span-4 text-slate-800 text-sm break-words font-semibold">
                  {date}
                </p>
              </div>
              <div className="w-full h-fit grid grid-cols-5 gap-3 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">time</p>
                <p className="col-span-4 text-slate-800 text-sm break-words font-semibold">
                  {time}
                </p>
              </div>
              <div className="w-full h-fit grid grid-cols-5 gap-3 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">location</p>
                <p className="col-span-4 text-slate-800 text-sm break-words font-semibold">
                  {location}
                </p>
              </div>
              <div className="w-full h-full grid grid-cols-5 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">seat code</p>

                <p className="col-span-4 w-fit flex gap-2">
                  {seatCode.map((data, index) => (
                    <p
                      className="text-slate-800 text-sm break-words font-bold p-2 bg-slate-100 rounded-md w-fit"
                      key={`${data.y}${data.x}-${index}`}
                    >{`${data.y}${data.x}`}</p>
                  ))}{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full">
            <div className="border-b-2 border-dashed mx-4 relative"></div>
            <div className="bg-slate-600 rounded-full h-8 w-8 absolute -left-4 -top-4"></div>
            <div className="bg-slate-600 rounded-full h-8 w-8 absolute -right-4 -top-4"></div>
          </div>

          <div className="w-full h-fit flex bg-white px-4 py-8 justify-center items-center">
            <div className="h-fit w-full flex flex-col gap-2 shrink-0 bg-white">
              <div className="w-full h-fit grid grid-cols-5 gap-3 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">total</p>
                <div className="col-span-4 w-full h-fit flex flex-col gap-2">
                  <p className="text-slate-800 text-sm break-words font-semibold">
                    {price} <span className="text-slate-500 text-sm break-words">x</span>{' '}
                    <span className="text-slate-500 text-sm break-words">
                      {seatCode.length}
                    </span>
                  </p>
                  <Separator orientation="horizontal" />
                  <p className="text-slate-800 text-sm break-words font-semibold">
                    {total}
                  </p>
                </div>
              </div>
              <div className="w-full h-fit grid grid-cols-5 gap-3 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">ponit reduce</p>
                <p className="col-span-4 text-slate-800 text-sm break-words font-semibold">
                  -{points}
                </p>
              </div>
              <div className="w-full h-fit grid grid-cols-5 gap-3 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">discount reduce</p>
                <p className="col-span-4 text-slate-800 text-sm break-words font-semibold">
                  -{discount} <span className="text-slate-500 text-sm break-words">%</span>
                </p>
              </div>
              <Separator orientation="horizontal" />
              <div className="w-full h-fit grid grid-cols-5 gap-3 justify-start items-start bg-white rounded-lg">
                <p className="text-slate-500 text-sm break-words">total payment</p>
                <p className="col-span-4 text-slate-800 text-sm break-words font-semibold">
                  {totalBill}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketTransactionCard;
