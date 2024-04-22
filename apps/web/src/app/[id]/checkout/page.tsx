'use client';

import CheckoutOrderBox from '@/components/checkout-order-box';
import HomeNavbar from '@/components/home-navbar';
import { Button } from '@/components/ui/button';
import { SeatPositionType } from '@/models/seat-position-model';
import React, { useState } from 'react';

const CheckOutPage = () => {
  const seatDimemsion = [25, 40];
  const [selectedSeats, setSelectedSeats] = useState<SeatPositionType[]>([]);

  const seatsArray = () => {
    const seatsA = [];
    for (let i = 0; i < seatDimemsion[0]; i++) {
      const seatsB = [];

      for (let j = 0; j < seatDimemsion[1]; j++) {
        seatsB.push({ y: numberToTitle(i + 1), x: j + 1 });
      }
      seatsA.push(seatsB);
    }

    return seatsA;
  };

  const numberToTitle = (num: number): string => {
    const charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let result = '';

    while (num > 0) {
      let remainder = num % charList.length;
      if (remainder === 0) {
        remainder = charList.length;
        num = Math.floor(num / charList.length) - 1;
      } else {
        num = Math.floor(num / charList.length);
      }
      result = charList[remainder - 1] + result;
    }

    return result;
  };

  const titleToNumber = (s: string) => {
    const charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    let result = 0;
    let pow = 0;

    for (let i = s.length - 1; i >= 0; i--) {
      const charNum = charList.findIndex((data) => data === s[i]) + 1;

      result += charNum * Math.pow(charList.length, pow);

      pow++;
    }

    return result;
  };

  const waysY = [7, 15, 23, 31];
  const waysX = [4, 9, 14, 19];
  const unavailableSeats = [
    { y: 'A', x: 12 },
    { y: 'D', x: 20 },
  ];

  const onSelectedSeatClick = (data: { y: string; x: number }) =>
    selectedSeats.some((obj) => obj.y === data.y && obj.x === data.x)
      ? setSelectedSeats([
          ...selectedSeats.filter(
            (obj) => !(obj.y === data.y && obj.x === data.x),
          ),
        ])
      : setSelectedSeats([...selectedSeats, data]);

  const sortSeats = (array: SeatPositionType[]): SeatPositionType[] =>
    array.slice().sort((a, b) => {
      const valueA = a.y + a.x;
      const valueB = b.y + b.x;
      return valueA.localeCompare(valueB);
    });

  return (
    <>
      <div className="flex flex-col bg-slate-50 h-screen w-screen overflow-hidden">
        <HomeNavbar />
        <div className="h-[calc(100vh-73px)] w-screen relative flex flex-row gap-12 px-12 py-6">
          <main className="h-full w-full flex flex-col gap-8 relative overflow-auto">
            <div className="flex flex-col gap-2.5">
              <h2 className="tracking-tighter text-xl font-semibold text-slate-800">
                Select your seat
              </h2>
            </div>
            <div className="h-full w-full flex flex-col gap-8 relative overflow-auto rounded-xl border-[1px] border-slate-200">
              <div className="w-fit flex flex-col items-center gap-8">
                <div className="flex justify-center items-center text-white w-1/2 h-12 rounded-xl bg-slate-blue-800">
                  Stage
                </div>
                <div className="flex flex-col gap-3 w-full h-full p-1">
                  {seatsArray().map((dataA, indexA) => {
                    return (
                      <div
                        key={indexA}
                        className={`flex gap-3 items-end ${
                          waysX.includes(indexA) ? 'mb-8' : ''
                        }`}
                      >
                        <div className="h-12 w-12 flex shrink-0 justify-center items-center text-slate-blue-800 font-semibold">
                          {numberToTitle(indexA + 1)}
                        </div>
                        {dataA.map((dataB, indexB) => {
                          return (
                            <div
                              key={`${indexA}-${indexB}`}
                              className="flex flex-col"
                            >
                              {indexA === 0 && (
                                <div className="w-12 h-12 shrink-0 flex justify-center items-centerr text-slate-blue-800 font-semibold">
                                  {dataB.x}
                                </div>
                              )}
                              <Button
                                className={`shrink-0 w-12 h-12 ring-1 rounded-md flex justify-center items-center text-xs ${
                                  waysY.includes(dataB.x) ? 'mr-8' : ''
                                } ${
                                  selectedSeats.some(
                                    (obj) =>
                                      obj.y === dataB.y && obj.x === dataB.x,
                                  )
                                    ? 'bg-blue-crayola-900 hover:bg-blue-crayola-900/70 text-white'
                                    : unavailableSeats.some(
                                          (obj) =>
                                            obj.y === dataB.y &&
                                            obj.x === dataB.x,
                                        )
                                      ? 'bg-primary text-white'
                                      : 'bg-white text-slate-800 hover:bg-slate-100'
                                }`}
                                disabled={unavailableSeats.some(
                                  (obj) =>
                                    obj.y === dataB.y && obj.x === dataB.x,
                                )}
                                onClick={() => onSelectedSeatClick(dataB)}
                              >
                                {dataB.y}
                                {dataB.x}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
          <CheckoutOrderBox selectedSeats={sortSeats(selectedSeats)} />
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
