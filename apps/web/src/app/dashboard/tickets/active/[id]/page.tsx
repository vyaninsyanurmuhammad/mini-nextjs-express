'use client';

import TicketActiveDetailCard from '@/components/ticket-active-detail-card';
import {
  getTicketsActiveDetailThunk,
  getTicketsActiveThunk,
  getTicketsTransactionThunk,
} from '@/redux/features/myticket-thunk';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { format } from 'date-fns';
import React, { useEffect } from 'react';

const ActiveTicketDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const event = useAppSelector((state) => state.myticketReducer.event);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTicketsActiveDetailThunk(id));
  }, []);

  return (
    <>
      <div className="p-12 w-full h-full flex flex-col items-center shrink-0">
        <div className="w-[720px] h-fit flex flex-col gap-4 shrink-0">
          {event &&
            event.TicketTransaction.map((data, index) => (
              <TicketActiveDetailCard
                key={`${data.id}-${index}`}
                src={event.Event.eventImage}
                title={event.Event.title}
                seatCode={`${data.seatNumberY}${data.seatNumberX}`}
                ticketId={data.id}
                year={new Date(event.Event.eventAt).getFullYear().toString()}
                time={new Date(event.Event.eventAt).toLocaleTimeString()}
                date={format(
                  new Date(event.Event.eventAt).toLocaleDateString(),
                  'PPP',
                )}
                location={event.Event.eventLocation}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ActiveTicketDetail;
