'use client';

import { getDiscountsThunk, getPointThunk } from '@/redux/features/app-thunk';
import { getSessionThunk } from '@/redux/features/auth-thunk';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect } from 'react';

const Discount = () => {
  const dispatch = useAppDispatch();
  const discount = useAppSelector((state) => state.appReducer.discount);
  const isLoading = useAppSelector(
    (state) => state.appReducer.getDiscountLoading,
  );

  useEffect(() => {
    dispatch(getDiscountsThunk());
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col items-center pt-12">
        <div className="w-full lg:w-[720px] h-full flex flex-col items-center px-12 lg:px-0">
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <LoaderCircle className="text-slate-blue-800 animate-spin" />
            </div>
          ) : discount ? (
            discount.data.discountTransaction.length > 0 ? (
              discount.data.discountTransaction.map((data, index) => (
                <div
                  key={`${data.id}-${index}`}
                  className="relative w-full h-fit rounded-xl overflow-hidden"
                >
                  {data.isUsed && (
                    <div className="absolute bg-slate-800/80 h-full w-full flex justify-center items-center text-white font-bold text-4xl">
                      <span className="-rotate-12">USED</span>
                    </div>
                  )}
                  <div className="w-full flex flex-col md:flex-row gap-4 items-center bg-slate-blue-800 px-12 py-12">
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-4xl/none font-bold tracking-tighter text-white line-clamp-1">
                        {data.CouponDiscount.title}
                      </span>
                      <span className="text-slate-800 font-medium tracking-tighter">
                        Expired at{' '}
                        <span className="text-white/50">
                          {new Date(data.expiredAt).toUTCString()}
                        </span>
                      </span>
                    </div>
                    <div className="w-fit flex shrink-0 px-8 py-2 justify-center items-center bg-white">
                      <span className="text-5xl/none font-bold tracking-tighter text-blue-crayola-800">
                        {data.CouponDiscount.total}% OFF
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <span>You don't have discount</span>
            )
          ) : (
            <span>Wallet not founded</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Discount;
