'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Chair,
  PiggyBank,
  SealPercent,
  Ticket,
} from '@phosphor-icons/react/dist/ssr';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SeatPositionType } from '@/models/seat-position-model';
import { Separator } from './ui/separator';
import { DiscountType } from '@/models/discount-model';

const CheckoutOrderBox = ({
  selectedSeats,
}: {
  selectedSeats: SeatPositionType[];
}) => {
  const [isPointUsed, setIsPointUsed] = useState(false);
  const [isDiscount, setIsDiscount] = useState<DiscountType | null | undefined>(
    null,
  );

  const harga = 250000;
  const points = 20000;

  const discounts: DiscountType[] = [
    {
      id: '1231313131',
      title: 'Discount akhir tahun',
      total: 50,
      owner: 'Vyan Insya Nur M',
      expiredAt: '12/12/2024',
    },
    {
      id: '1331442322443',
      title: 'Discount awal tahun',
      total: 30,
      owner: 'Vyan Insya Nur M',
      expiredAt: '12/12/2024',
    },
  ];

  const onSetIsPointUsedClick = () => setIsPointUsed(!isPointUsed);
  const onSetIsDiscountClick = (discount: DiscountType) =>
    setIsDiscount(discount.id === isDiscount?.id ? null : discount);

  const hitungBill = (
    totalHarga: number,
    totalPoint: number,
    diskonPersen: number,
  ): number => {
    const diskon: number = totalHarga * (diskonPersen / 100);
    let totalBayar: number = totalHarga - diskon;

    if (totalPoint > totalHarga) {
      totalBayar = 0;
      const sisaPoint: number = totalPoint - totalHarga;
      console.log(`Total point yang tersisa: ${sisaPoint}`);
    } else {
      totalBayar -= totalPoint;
    }

    return totalBayar;
  };

  return (
    <>
      <div className="sticky top-24 w-fit h-fit flex flex-col gap-8 justify-between items-center">
        <div className="w-[480px] h-fit flex flex-col gap-4 justify-between items-center bg-white ring-1 ring-slate-200 rounded-xl shadow-lg px-8 py-4">
          <Button
            className={`w-full flex justify-start gap-2.5 rounded-full tracking-tight ring-[1px] ring-slate-300 ${
              isPointUsed
                ? 'bg-slate-blue-800 hover:bg-slate-blue-800/90 text-white'
                : 'text-slate-800 bg-white hover:bg-slate-50'
            }`}
            onClick={onSetIsPointUsedClick}
          >
            <PiggyBank size={24} />
            <span>
              {isPointUsed ? '' : 'Use'}&nbsp;
              <span
                className={`font-semibold ${
                  isPointUsed
                    ? 'text-blue-crayola-100 line-through'
                    : 'text-blue-crayola-900'
                }`}
              >
                {points}
              </span>
              &nbsp;points&nbsp;{isPointUsed ? 'used' : ''}
            </span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className={`w-full flex justify-start gap-2.5 rounded-full tracking-tight ring-[1px] ring-slate-300 ${
                  isDiscount
                    ? 'bg-slate-blue-800 hover:bg-slate-blue-800/90 text-white'
                    : 'text-slate-800 bg-white hover:bg-slate-50'
                }`}
              >
                <SealPercent size={24} />
                <span>
                  {isDiscount
                    ? `${isDiscount.total}% discount selected`
                    : 'Select discount'}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="grid gap-4 py-4">
                <div className="flex flex-row items-center gap-4">
                  <Input
                    id="discount-code"
                    placeholder="Type your redeem code here..."
                  />
                  <Button>Redeem</Button>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="tracking-tighter font-semibold text-slate-800">
                    Your discount vouchers
                  </h3>
                  {discounts.map((discount, index) => (
                    <Button
                      key={`${discount.id}-${index}`}
                      className={`w-full h-fit rounded-lg p-4 flex flex-col items-start gap-2.5 ring-[1px] ring-slate-200 ${
                        isDiscount?.id === discount.id
                          ? 'bg-blue-crayola-900 hover:bg-blue-crayola-800'
                          : 'bg-white hover:bg-slate-100'
                      }`}
                      onClick={() => onSetIsDiscountClick(discount)}
                    >
                      <div className="flex flex-col items-start gap-1">
                        <p
                          className={`tracking-tight font-semibold text-lg ${
                            isDiscount?.id === discount.id
                              ? 'text-white'
                              : 'text-slate-800'
                          }`}
                        >
                          {discount.title}&nbsp;{discount.total}%
                        </p>
                        <p
                          className={`tracking-tighter text-sm font-normal ${
                            isDiscount?.id === discount.id
                              ? 'text-slate-200'
                              : 'text-slate-600'
                          }`}
                        >
                          from&nbsp;{discount.owner}
                        </p>
                      </div>

                      <p
                        className={`tracking-tighter font-light text-sm ${
                          isDiscount?.id === discount.id
                            ? 'text-white'
                            : 'text-slate-800'
                        }`}
                      >
                        expired at&nbsp;{discount.expiredAt}
                      </p>
                    </Button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-[480px] h-fit flex flex-col gap-8 justify-between items-center bg-white ring-1 ring-slate-200 rounded-xl shadow-xl px-8 py-4">
          <div className="w-full flex flex-col gap-4">
            <span className="tracking-tighter text-slate-800 font-semibold">
              Shopping summary
            </span>
            <div className="flex flex-col gap-2.5 transition-all ease-in-out delay-75">
              {selectedSeats.length !== 0 && (
                <p className="tracking-tighter text-slate-800 text-sm font-normal">
                  Total selected seat :&nbsp;
                  <span className="font-semibold text-base">
                    {selectedSeats.length}
                  </span>
                  &nbsp;seat
                </p>
              )}
              {selectedSeats.length !== 0 && (
                <p className="tracking-tighter text-slate-800 text-sm font-normal">
                  Selected seat :&nbsp;
                  <span className="font-semibold text-base">
                    {selectedSeats
                      .map((data) => `${data.y}${data.x}`)
                      .join(', ')}
                  </span>
                  &nbsp;
                </p>
              )}
            </div>

            {selectedSeats.length > 0 && (
              <div className="w-full flex flex-col gap-2.5">
                <Separator orientation="horizontal" />

                <p className="w-full flex justify-between tracking-tight text-slate-800 text-sm font-semibold">
                  Total price :&nbsp;
                  <span className="font-semibold text-sm">
                    {(selectedSeats.length * harga).toLocaleString('id-ID', {
                      currency: 'IDR',
                    })}
                  </span>
                </p>
                {isPointUsed && (
                  <p className="w-full flex justify-between tracking-tight text-slate-800 text-sm font-semibold">
                    Points :&nbsp;
                    <span className="font-semibold text-sm">
                      -
                      {points.toLocaleString('id-ID', {
                        currency: 'IDR',
                      })}
                    </span>
                  </p>
                )}
                {isDiscount && (
                  <p className="w-full flex justify-between tracking-tight text-slate-800 text-sm font-semibold">
                    Discount :&nbsp;
                    <span className="font-semibold text-sm">
                      -{isDiscount.total}%
                    </span>
                  </p>
                )}
              </div>
            )}
            <div className="w-full flex flex-col gap-2.5">
              <Separator orientation="horizontal" />

              <p className="w-full flex justify-between tracking-tight text-slate-800 text-xl font-semibold">
                Total bill :&nbsp;
                <span className="font-semibold text-xl">
                  Rp.
                  {hitungBill(
                    selectedSeats.length * harga,
                    isPointUsed ? points : 0,
                    isDiscount ? isDiscount.total : 0,
                  ).toLocaleString('id-ID', {
                    currency: 'IDR',
                  })}
                </span>
              </p>
            </div>
          </div>

          <Button className="w-full flex gap-2.5 rounded-full tracking-tight bg-blue-crayola-900 hover:bg-blue-crayola-800">
            <Ticket size={24} />
            <span>Pay ticket</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutOrderBox;
