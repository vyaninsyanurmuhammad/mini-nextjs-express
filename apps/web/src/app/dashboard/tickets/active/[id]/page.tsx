import TicketActiveDetailCard from '@/components/ticket-active-detail-card';
import React from 'react';

const ActiveTicketDetail = () => {
  return (
    <>
      <div className="p-12 w-full h-full flex flex-col items-center shrink-0">
        <div className="w-[720px] h-fit flex flex-col gap-4 shrink-0">
          <TicketActiveDetailCard />
          <TicketActiveDetailCard />
          <TicketActiveDetailCard />
          <TicketActiveDetailCard />
          <TicketActiveDetailCard />
          <TicketActiveDetailCard />
          <TicketActiveDetailCard />
        </div>
      </div>
    </>
  );
};

export default ActiveTicketDetail;
