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
  DialogClose,
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
import { DiscountTransaction, DiscountType } from '@/models/discount-model';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { format } from 'date-fns';
import { buyEventThunk, getDiscountsThunk } from '@/redux/features/app-thunk';
import { redirect, useRouter } from 'next/navigation';

const CheckoutOrderBox = ({
  id,
  harga,
  selectedSeats,
}: {
  id: string;
  harga: number;
  selectedSeats: SeatPositionType[];
}) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [isPointUsed, setIsPointUsed] = useState(false);
  const [isDiscount, setIsDiscount] = useState<
    DiscountTransaction | null | undefined
  >(null);
  const point = useAppSelector((state) => state.appReducer.point);
  const discount = useAppSelector((state) => state.appReducer.discount);
  const [points, setPoints] = useState(0);
  const [discounts, setDiscounts] = useState<DiscountTransaction[]>([]);

  const onSetIsPointUsedClick = () => setIsPointUsed(!isPointUsed);
  const onSetIsDiscountClick = (discount: DiscountTransaction) =>
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

  const onBuyOnClick = () => {
    dispatch(
      buyEventThunk({
        id,
        buy: {
          total: selectedSeats.length * harga,
          pointsReduce: points,
          discountReduce: isDiscount ? isDiscount.id : undefined,
          seats: selectedSeats,
        },
      }),
    );

    router.push('/dashboard/tickets');
  };

  useEffect(() => {
    if (point) {
      setPoints(point.data.totalPoints);
    }
    if (discount) {
      setDiscounts(discount.data.discountTransaction);
    }
  }, []);

  return (
    <>
      <div className="lg:sticky lg:top-24 w-full lg:w-fit h-fit flex flex-col gap-8 justify-between items-center">
        <div className="w-full lg:w-[480px] h-fit flex flex-col gap-4 justify-between items-center bg-white ring-1 ring-slate-200 rounded-xl shadow-lg px-8 py-4">
          <Button
            className={`w-full flex justify-start gap-2.5 rounded-full tracking-tight ring-[1px] ring-slate-300 ${
              isPointUsed
                ? 'bg-slate-blue-800 hover:bg-slate-blue-800/90 text-white'
                : 'text-slate-800 bg-white hover:bg-slate-50'
            }`}
            disabled={points === 0 || harga === 0}
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
            <DialogTrigger asChild disabled={harga === 0}>
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
                    ? `${isDiscount.CouponDiscount.total}% discount selected`
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
                      disabled={discount.isUsed}
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
                          {discount.CouponDiscount.title}&nbsp;
                          {discount.CouponDiscount.total}%
                        </p>
                      </div>

                      <p
                        className={`tracking-tighter font-light text-sm ${
                          isDiscount?.id === discount.id
                            ? 'text-white'
                            : 'text-slate-800'
                        }`}
                      >
                        expired at&nbsp;{' '}
                        {format(
                          new Date(discount.expiredAt).toLocaleDateString(),
                          'PPP',
                        )}
                      </p>
                    </Button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full lg:w-[480px] h-fit flex flex-col gap-8 justify-between items-center bg-white ring-1 ring-slate-200 rounded-xl shadow-xl px-8 py-4">
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
                      -{isDiscount.CouponDiscount.total}%
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
                    isDiscount ? isDiscount.CouponDiscount.total : 0,
                  ).toLocaleString('id-ID', {
                    currency: 'IDR',
                  })}
                </span>
              </p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild disabled={selectedSeats.length === 0}>
              <Button className="w-full flex gap-2.5 rounded-full tracking-tight bg-blue-crayola-900 hover:bg-blue-crayola-800">
                <Ticket size={24} />
                <span>Pay ticket</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently you buy
                  this event.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <DialogClose>
                  <Button
                    className="bg-white hover:bg-white/90 text-slate-800 w-full"
                    variant={'outline'}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button onClick={onBuyOnClick}>I'm Sure</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default CheckoutOrderBox;
