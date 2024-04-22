import DetailCheckoutBox from '@/components/detail-checkout-box';
import HomeNavbar from '@/components/home-navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MapPinLine,
  CalendarDots,
  Chair,
} from '@phosphor-icons/react/dist/ssr';
import { Clock } from 'lucide-react';
import React from 'react';

const Detail = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="flex flex-col bg-slate-50 h-screen w-screen overflow-x-hidden">
        <HomeNavbar />
        <div className="h-fit w-full flex flex-row gap-12 px-12 py-6">
          <main className="h-fit w-full flex flex-col gap-8">
            <div className="w-full flex flex-col gap-8">
              <div className="h-96 w-full bg-slate-blue-800 rounded-xl"></div>
              <div className="w-full flex flex-col gap-2.5">
                <div className="w-fit h-fit bg-blue-crayola-900 rounded-full px-4 py-1 flex justify-center items-center">
                  <span className="text-white text-sm font-semibold tracking-tighter">
                    upcoming
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter text-slate-800">
                  Iwan Fals Concert
                </h1>
                <div className="flex flex-wrap gap-8 gap-y-2">
                  <div className="flex gap-1.5 items-center text-slate-500">
                    <MapPinLine size={20} className="text-slate-blue-800" />
                    <span className="text-sm">Jakarta</span>
                  </div>
                  <div className="flex gap-1.5 items-center text-slate-500">
                    <Clock size={20} className="text-slate-blue-800" />
                    <span className="text-sm">15.00</span>
                  </div>
                  <div className="flex gap-1.5 items-center text-slate-500">
                    <CalendarDots size={20} className="text-slate-blue-800" />
                    <span className="text-sm">12-12-2024</span>
                  </div>
                </div>
              </div>
              <Separator className="h-0.5" orientation="horizontal" />
            </div>
            <div className="flex flex-col gap-2.5">
              <Skeleton className="w-3/4 h-[20px] bg-slate-200 rounded-full" />
              <Skeleton className="w-2/3 h-[20px] bg-slate-200 rounded-full" />
              <Skeleton className="w-3/5 h-[20px] bg-slate-200 rounded-full" />
            </div>
          </main>
          <DetailCheckoutBox />
        </div>
      </div>
    </>
  );
};

export default Detail;
