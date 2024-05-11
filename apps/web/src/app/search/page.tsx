'use client';

import CardEvent from '@/components/card-event';
import HomeFilter from '@/components/home-filter';
import HomeNavbar from '@/components/home-navbar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { useEffect } from 'react';

export default function Search() {
  const searchText = useAppSelector((state) => state.appReducer.searchText);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch()
  // }, []);

  return (
    <>
      <div className="flex flex-col bg-slate-50 h-screen w-screen overflow-x-hidden">
        <HomeNavbar />
        <main className="h-fit w-full flex gap-12 px-12 py-6">
          <HomeFilter />
          <div className="flex flex-col gap-8 w-full h-fit">
            <div className="grid grid-cols-4 gap-8 w-full h-full">
              {/* <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent /> */}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="?page=0" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="?page=1">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="?page=1" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>
      </div>
    </>
  );
}
