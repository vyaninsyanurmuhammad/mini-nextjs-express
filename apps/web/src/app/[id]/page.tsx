'use client';

import DetailCheckoutBox from '@/components/detail-checkout-box';
import HomeNavbar from '@/components/home-navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getDetailEventThunk, getDiscountsThunk } from '@/redux/features/app-thunk';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import {
  MapPinLine,
  CalendarDots,
  Chair,
} from '@phosphor-icons/react/dist/ssr';
import { format, intlFormat } from 'date-fns';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';

const Detail = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const event = useAppSelector((state) => state.appReducer.event);
  const isLoading = useAppSelector(
    (state) => state.appReducer.getEventsLoading,
  );

  const dispatch = useAppDispatch();

  const totalSeatsSold = () => {
    if (event) {
      let totalSeatSold = 0;
      const totalTickets = event.EventTransaction.map(
        (data) => data.TicketTransaction.length,
      );

      for (let i = 0; i < totalTickets.length; i++) {
        totalSeatSold += totalTickets[i];
      }

      return totalSeatSold;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    dispatch(getDetailEventThunk(id));
    dispatch(getDiscountsThunk());

  }, []);

  return (
    <>
      <div className="flex flex-col bg-slate-50 h-screen w-screen overflow-x-hidden">
        <HomeNavbar />
        {event && (
          <div className="h-fit w-full flex flex-row gap-12 px-12 py-6">
            <main className="h-fit w-full flex flex-col gap-8">
              <div className="w-full flex flex-col gap-8">
                <div className="h-96 w-full bg-slate-blue-800 rounded-xl overflow-hidden">
                  <Image
                    className="object-cover w-full h-full !relative"
                    src={`http://localhost:8000/images/${event.eventImage}`}
                    fill
                    sizes="100%"
                    alt={event.title}
                  />
                </div>
                <div className="w-full flex flex-col gap-2.5">
                  <div className="w-fit h-fit bg-blue-crayola-900 rounded-full px-4 py-1 flex justify-center items-center">
                    <span className="text-white text-sm font-semibold tracking-tighter">
                      upcoming
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter text-slate-800">
                    <h1 className="text-4xl font-bold tracking-tighter text-slate-800">
                      {event.title}
                    </h1>
                    <h2 className="text-2xl font-bold tracking-tighter text-slate-800/50">
                      {event.price === 0
                        ? 'Free'
                        : new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'IDR',
                          })
                            .format(event.price)
                            .toString()}
                    </h2>
                  </h1>
                  {isLoading ? (
                    <div className="flex flex-col gap-2.5">
                      <Skeleton className="w-3/4 h-[20px] bg-slate-200 rounded-full" />
                      <Skeleton className="w-2/3 h-[20px] bg-slate-200 rounded-full" />
                      <Skeleton className="w-3/5 h-[20px] bg-slate-200 rounded-full" />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap gap-8 gap-y-2">
                        <div className="flex gap-1.5 items-center text-slate-500">
                          <MapPinLine
                            size={20}
                            className="text-slate-blue-800"
                          />
                          <span className="text-sm">{event.eventLocation}</span>
                        </div>
                        <div className="flex gap-1.5 items-center text-slate-500">
                          <Clock size={20} className="text-slate-blue-800" />
                          <span className="text-sm">
                            {new Date(event.eventAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex gap-1.5 items-center text-slate-500">
                          <CalendarDots
                            size={20}
                            className="text-slate-blue-800"
                          />
                          <span className="text-sm">
                            {format(
                              new Date(event.eventAt).toLocaleDateString(),
                              'PPP',
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex flex-wrap gap-2.5">
                        {event.EventCategory.map((data, index) => (
                          <div
                            key={`${data.id}-${index}`}
                            className="text-xs text-slate-600 rounded-full py-1 px-3 bg-slate-100"
                          >
                            {data.Category.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Separator className="h-0.5" orientation="horizontal" />
              </div>
              {isLoading ? (
                <div className="flex flex-col gap-2.5">
                  <Skeleton className="w-3/4 h-[20px] bg-slate-200 rounded-full" />
                  <Skeleton className="w-2/3 h-[20px] bg-slate-200 rounded-full" />
                  <Skeleton className="w-3/5 h-[20px] bg-slate-200 rounded-full" />
                </div>
              ) : (
                <p className="text-slate-600 tracking-tighter">
                  {event.description}
                </p>
              )}
            </main>
            <DetailCheckoutBox
              id={id}
              total={(
                event.SeatEvent.dimensionX * event.SeatEvent.dimensionY -
                totalSeatsSold()
              ).toString()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
