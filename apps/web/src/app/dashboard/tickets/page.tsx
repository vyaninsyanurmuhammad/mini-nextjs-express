'use client';

import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  CalendarDots,
  Clock,
  MapPinLine,
  Ticket,
} from '@phosphor-icons/react/dist/ssr';
import TicketActiveCard from '@/components/ticket-active-card';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import {
  getTicketsActiveThunk,
  getTicketsTransactionThunk,
} from '@/redux/features/myticket-thunk';
import { format } from 'date-fns';
import Link from 'next/link';

const Tickets = () => {
  const events = useAppSelector((state) => state.myticketReducer.events);
  const eventTransactions = useAppSelector(
    (state) => state.myticketReducer.eventsTransaction,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTicketsActiveThunk());
    dispatch(getTicketsTransactionThunk());
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center p-12">
        <Tabs defaultValue="account" className="w-[720px]">
          <TabsList className="!p-0">
            <TabsTrigger value="account">
              <span className="px-3">Active Tickets</span>
            </TabsTrigger>
            <TabsTrigger value="password">
              <span className="px-3">Transactions List</span>
            </TabsTrigger>
          </TabsList>
          <Separator orientation="horizontal" />
          <TabsContent className="pt-6 gap-4 flex flex-col" value="account">
            {events.map((data, index) => (
              <Link
                key={`${data.id}-${index}`}
                href={`/dashboard/tickets/active/${data.id}`}
              >
                <TicketActiveCard
                  src={data.Event.eventImage}
                  title={data.Event.title}
                  location={data.Event.eventLocation}
                  time={new Date(data.Event.eventAt).toLocaleTimeString()}
                  date={format(
                    new Date(data.Event.eventAt).toLocaleDateString(),
                    'PPP',
                  )}
                  tickets={data.TicketTransaction.length}
                />
              </Link>
            ))}
          </TabsContent>
          <TabsContent value="password" className="pt-6 gap-4 flex flex-col">
            {eventTransactions.map((data, index) => (
              <Link
                key={`${data.id}-${index}`}
                href={`/dashboard/tickets/transaction/${data.id}`}
              >
                <TicketActiveCard
                  src={data.Event.eventImage}
                  title={data.Event.title}
                  buyDate={format(
                    new Date(data.createdAt),
                    'PPpp',
                  )}
                  location={data.Event.eventLocation}
                  time={new Date(data.Event.eventAt).toLocaleTimeString()}
                  date={format(
                    new Date(data.Event.eventAt).toLocaleDateString(),
                    'PPP',
                  )}
                  tickets={data.TicketTransaction.length}
                />
              </Link>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Tickets;
