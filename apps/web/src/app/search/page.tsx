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
import { findEventThunk } from '@/redux/features/app-thunk';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { format } from "date-fns";
import Link from 'next/link';
import { useEffect } from 'react';

export default function Search() {
  const searchText = useAppSelector((state) => state.appReducer.searchText);
  const searchEvents = useAppSelector((state) => state.appReducer.searchEvents);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      findEventThunk({
        title: searchText,
      }),
    );
  }, []);

  return (
    <>
      <div className="flex flex-col bg-slate-50 h-screen w-screen overflow-x-hidden">
        <HomeNavbar />
        <main className="h-fit w-full flex flex-col lg:flex-row gap-12 px-12 py-6">
          <HomeFilter />
          <div className="flex flex-col gap-8 w-full h-fit">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full h-full">
              {searchEvents.map((data, index) => (
                <Link className="h-auto" href={`/${data.id}`}>
                  <CardEvent
                    className="shadow-sm ring-1 ring-slate-200"
                    src={data.eventImage}
                    title={data.title}
                    location={data.eventLocation}
                    time={new Date(data.eventAt).toLocaleTimeString()}
                    date={format(
                      new Date(data.eventAt).toLocaleDateString(),
                      'PPP',
                    )}
                    price={
                      data.price === 0
                        ? 'Free'
                        : new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          })
                            .format(data.price)
                            .toString()
                    }
                    categories={data.EventCategory.map(
                      (cat) => cat.Category.title,
                    )}
                  />
                </Link>
              ))}
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
