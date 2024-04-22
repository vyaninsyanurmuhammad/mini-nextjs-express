'use client';

import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Chair } from '@phosphor-icons/react/dist/ssr';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const DetailCheckoutBox = () => {
  const listSeats = [30, 30];

  const listSeatsView = () => {
    const seatsA = [];
    for (let i = 0; i < listSeats[0]; i++) {
      const seatsB = [];

      for (let j = 0; j < listSeats[1]; j++) {
        seatsB.push([i, j]);
      }

      seatsA.push(seatsB);
    }

    return seatsA;
  };

  return (
    <>
      <div className="sticky top-24 w-96 h-fit flex flex-col gap-8 justify-between items-center bg-white ring-1 ring-slate-200 rounded-xl shadow-xl px-8 py-4">
        <div className="w-full flex flex-col gap-2.5">
          <span className="tracking-tighter text-slate-800 font-semibold">
            Set your seat
          </span>
          <div className="flex flex-col gap-2.5">
            <p className="tracking-tighter text-slate-800 text-sm font-normal">
              Available :&nbsp;
              <span className="font-semibold text-base">100</span>&nbsp;seat
            </p>
          </div>
        </div>
        <Button className="w-full rounded-full tracking-tight bg-blue-crayola-900 hover:bg-blue-crayola-800">
          Buy ticket
        </Button>
      </div>
    </>
  );
};

export default DetailCheckoutBox;