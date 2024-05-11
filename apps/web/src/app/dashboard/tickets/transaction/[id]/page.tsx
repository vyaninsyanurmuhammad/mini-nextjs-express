'use client';

import TicketTransactionCard from '@/components/ticket-transaction-card';
import {
  getTicketsActiveDetailThunk,
  getTicketsTransactionThunk,
  getTicketTransactionDetailThunk,
} from '@/redux/features/myticket-thunk';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { format } from 'date-fns';
import React, { useEffect } from 'react';

const TransactionTicketDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const event = useAppSelector(
    (state) => state.myticketReducer.eventTransaction,
  );

  const dispatch = useAppDispatch();

  const hitungBill = (
    totalHarga: number,
    totalPoint: number,
    diskonPersen: number,
  ): number => {
    const diskon: number = totalHarga * (diskonPersen / 100);
    let totalBayar: number = totalHarga - diskon;

    if (totalPoint > totalHarga) {
      totalBayar = 0;
      const sisaPoint: number = totalPoint - totalHarga;
    } else {
      totalBayar -= totalPoint;
    }

    return totalBayar;
  };

  useEffect(() => {
    dispatch(getTicketTransactionDetailThunk(id));
  }, []);

  return (
    <>
      <div className="p-12 w-full h-full flex flex-col items-center shrink-0">
        <div className="w-full lg:w-[720px] h-full flex flex-col gap-4 shrink-0">
          {event && (
            <TicketTransactionCard
              src={event.Event.eventImage}
              title={event.Event.title}
              location={event.Event.eventLocation}
              time={new Date(event.Event.eventAt).toLocaleTimeString()}
              date={format(
                new Date(event.Event.eventAt).toLocaleDateString(),
                'PPP',
              )}
              year={new Date(event.Event.eventAt).getFullYear().toString()}
              ticketId={event.id}
              seatCode={event.TicketTransaction.map((data) => {
                return {
                  y: data.seatNumberY,
                  x: data.seatNumberX,
                };
              })}
              price={
                event.Event.price === 0
                  ? 'Free'
                  : new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })
                      .format(event.Event.price)
                      .toString()
              }
              total={new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })
                .format(event.total)
                .toString()}
              points={event.pointsReduce}
              discount={event.discountReduce}
              totalBill={new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })
                .format(
                  hitungBill(
                    event.TicketTransaction.length * event.Event.price,
                    event.pointsReduce,
                    event.discountReduce,
                  ),
                )
                .toString()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionTicketDetail;
