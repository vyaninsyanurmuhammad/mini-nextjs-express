export type DiscountType = {
  id: string;
  title: string;
  total: number;
  owner: string;
  expiredAt: string;
};

export type FetchDiscount = {
  status: number;
  success: boolean;
  message: string;
  data: Data;
};

export type Data = {
  id: string;
  userId: string;
  discountTransaction: DiscountTransaction[];
};

export type DiscountTransaction = {
  id: string;
  couponDiscountId: string;
  discountsWalletId: string;
  isUsed: boolean;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  CouponDiscount: CouponDiscount;
};

export type CouponDiscount = {
  id: string;
  title: string;
  total: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
