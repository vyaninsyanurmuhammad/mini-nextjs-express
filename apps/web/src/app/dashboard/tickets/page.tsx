import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  CalendarDots,
  Clock,
  MapPinLine,
  Ticket,
} from '@phosphor-icons/react/dist/ssr';
import TicketActiveCard from '@/components/ticket-active-card';

const Tickets = () => {
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
            <TicketActiveCard />
            <TicketActiveCard />
            <TicketActiveCard />
            <TicketActiveCard />
            <TicketActiveCard />
            <TicketActiveCard />
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Tickets;
