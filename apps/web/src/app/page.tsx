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
import Autoplay from 'embla-carousel-autoplay';

export default function Home() {
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
                    1
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-0">
                  <div className="h-96 w-full bg-slate-blue-700 text-5xl text-white flex justify-center items-center ">
                    2
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-0">
                  <div className="h-96 w-full bg-slate-blue-600 text-5xl text-white flex justify-center items-center ">
                    3
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
                  <CarouselItem className="basis-1/5">
                    <CardEvent className="shadow-sm ring-1 ring-slate-200 my-1" />
                  </CarouselItem>
                  <CarouselItem className="basis-1/5">
                    <CardEvent className="shadow-sm ring-1 ring-slate-200 my-1" />
                  </CarouselItem>
                  <CarouselItem className="basis-1/5">
                    <CardEvent className="shadow-sm ring-1 ring-slate-200 my-1" />
                  </CarouselItem>
                  <CarouselItem className="basis-1/5">
                    <CardEvent className="shadow-sm ring-1 ring-slate-200 my-1" />
                  </CarouselItem>
                  <CarouselItem className="basis-1/5">
                    <CardEvent className="shadow-sm ring-1 ring-slate-200 my-1" />
                  </CarouselItem>
                  <CarouselItem className="basis-1/5">
                    <CardEvent className="shadow-sm ring-1 ring-slate-200 my-1" />
                  </CarouselItem>
                  <CarouselItem className="basis-1/5">
                    <CardEvent className="shadow-sm ring-1 ring-slate-200 my-1" />
                  </CarouselItem>
                  <CarouselItem className="basis-1/5">
                    <CardEvent className="shadow-sm ring-1 ring-slate-200 my-1" />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-0 group-hover:-left-4 !opacity-0 group-hover:!opacity-100 transition-all" />
                <CarouselNext className="right-0 group-hover:-right-4 !opacity-0 group-hover:!opacity-100 transition-all" />
              </Carousel>
            </div>
          </div>
          <div className="flex flex-row gap-8 px-12">
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
