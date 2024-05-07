'use client';

import TicketActiveCard from '@/components/ticket-active-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSession } from '@/lib/jwt';
import { signUpOrganizerThunk } from '@/redux/features/auth-thunk';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useEffect } from 'react';

const Store = () => {
  const user = useAppSelector((state) => state.authReducer.user);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="w-full h-full flex justify-center p-12">
        {user &&
          (user.role.includes(2) ? (
            <>
              <Tabs defaultValue="account" className="w-[720px]">
                <TabsList className="!p-0">
                  <TabsTrigger value="account">
                    <span className="px-3">Active Event</span>
                  </TabsTrigger>
                  <TabsTrigger value="password">
                    <span className="px-3">History Event</span>
                  </TabsTrigger>
                </TabsList>
                <Separator orientation="horizontal" />
                <TabsContent
                  className="pt-6 gap-4 flex flex-col"
                  value="account"
                >
                  <div className="">
                    <Button>Add Event</Button>
                  </div>
                  <TicketActiveCard />
                  <TicketActiveCard />
                  <TicketActiveCard />
                  <TicketActiveCard />
                  <TicketActiveCard />
                  <TicketActiveCard />
                </TabsContent>
                <TabsContent
                  className="pt-6 gap-4 flex flex-col"
                  value="password"
                >
                  <TicketActiveCard />
                  <TicketActiveCard />
                  <TicketActiveCard />
                  <TicketActiveCard />
                  <TicketActiveCard />
                  <TicketActiveCard />
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <>
              <div className="h-full w-fit flex flex-col items-center gap-2.5">
                <span>You are not an organizer yet</span>
                <Button onClick={() => dispatch(signUpOrganizerThunk())}>
                  I wanna be an organizer
                </Button>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default Store;
