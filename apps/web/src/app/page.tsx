'use client';

import CardEvent from '@/components/card-event';
import HomeNavbar from '@/components/home-navbar';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getLatestEventsThunk } from '@/redux/features/app-thunk';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { format } from 'date-fns';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  const event = useAppSelector((state) => state.appReducer.events);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLatestEventsThunk());
  }, []);

  return (
    <>
      <div className="flex flex-col bg-slate-50 h-screen w-screen overflow-x-hidden">
        <HomeNavbar />
        <main className="h-fit w-full flex flex-col gap-12 py-6">
          <div className="mx-12 overflow-hidden rounded-xl bg-blue-crayola-900">
            <Carousel
              className="group"
              opts={{ loop: true }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
            >
              <CarouselContent className="m-0">
                <CarouselItem className="pl-0">
                  <div className="h-96 w-full bg-slate-blue-800 text-5xl text-white flex justify-center items-center ">
                    <Image
                      src={'/_198d4dc8-f357-4309-891f-2ff172fe01e9.jpeg'}
                      className="h-full w-full object-cover !relative"
                      fill
                      sizes="100%"
                      alt="1"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-0">
                  <div className="h-96 w-full bg-slate-blue-700 text-5xl text-white flex justify-center items-center ">
                  <Image
                      src={'/_c95899db-a3b0-4a60-adf6-f3919e0aaa29.jpeg'}
                      className="h-full w-full object-cover !relative"
                      fill
                      sizes="100%"
                      alt="2"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-0">
                  <div className="h-96 w-full bg-slate-blue-600 text-5xl text-white flex justify-center items-center ">
                  <Image
                      src={'/_e428a5e8-6584-4b04-bae0-1fe1c8656fc4.jpeg'}
                      className="h-full w-full object-cover !relative"
                      fill
                      sizes="100%"
                      alt="3"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-0">
                  <div className="h-96 w-full bg-slate-blue-600 text-5xl text-white flex justify-center items-center ">
                  <Image
                      src={'/_7dfc835a-a22f-431a-b377-cde91a754e2c.jpeg'}
                      className="h-full w-full object-cover !relative"
                      fill
                      sizes="100%"
                      alt="4"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselDots className="left-4 translate-x-0" />
              <div className="absolute bottom-4 right-4 flex gap-2 group-hover:opacity-100 opacity-0 transition-all">
                <CarouselPrevious className="relative -left-4 group-hover:left-0 transition-all top-auto bottom-0 translate-x-0 translate-y-0" />
                <CarouselNext className="relative -right-4 group-hover:right-0 transition-all top-auto bottom-0 translate-x-0 translate-y-0" />
              </div>
            </Carousel>
          </div>

          <div className="flex flex-col gap-2.5 px-12">
            <h2 className="text-xl tracking-tighter font-bold text-slate-800">
              Latest Event For You
            </h2>
            <div>
              <Carousel
                className="group"
                // opts={{ loop: true }}
                // plugins={[
                //   Autoplay({
                //     delay: 4000,
                //   }),
                // ]}
              >
                <CarouselContent>
                  {event.map((data, index) => (
                    <CarouselItem
                      key={`${data.id}-${index}`}
                      className="basis-full md:basis-1/3 xl:basis-1/5 py-2"
                    >
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
                    </CarouselItem>
                  ))}

                  {/* <CarouselItem className="basis-full md:basis-1/3 xl:basis-1/5">
                    <CardEvent className="shadow-sm ring-1 ring-slate-200 my-1" />
                  </CarouselItem>
                  <CarouselItem className="basis-full md:basis-1/3 xl:basis-1/5">
                    <CardEvent className="shadow-sm ring-1 ring-slate-200 my-1" />
                  </CarouselItem> */}
                </CarouselContent>
                <CarouselPrevious className="left-0 group-hover:-left-4 !opacity-0 group-hover:!opacity-100 transition-all" />
                <CarouselNext className="right-0 group-hover:-right-4 !opacity-0 group-hover:!opacity-100 transition-all" />
              </Carousel>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 px-12">
            <div className="rounded-xl h-64 w-full bg-slate-blue-800 p-12 flex flex-col gap-3 justify-end">
              <h2 className="text-white text-4xl font-bold tracking-tighter">
                Get Special Discounts For You
              </h2>
              <Button className="tracking-tighter rounded-full w-fit">
                Check now
              </Button>
            </div>
            <div className="rounded-xl h-64 w-full bg-blue-crayola-800 p-12 flex flex-col gap-3 justify-end">
              <h2 className="text-white text-4xl font-bold tracking-tighter">
                Get More Points by Using Reveral Code
              </h2>
              <Button className="tracking-tighter rounded-full w-fit">
                Redem now
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
