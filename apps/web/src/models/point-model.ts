export type FetchPoint = {
  status: number;
  success: boolean;
  message: string;
  data: Data;
};

export type Data = {
  id: string;
  userId: string;
  pointsTransactions: PointsTransaction[];
  totalPoints: number;
};

export type PointsTransaction = {
  id: string;
  reveralId: string;
  pointsWalletId: string;
  points: number;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
