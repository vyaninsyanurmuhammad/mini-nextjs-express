export type FetchReveral = {
  status: number;
  success: boolean;
  message: string;
  data: DataReferal;
};

export type DataReferal = {
  id: string;
  code: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
