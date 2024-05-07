export type UserSignUpType = {
  name: string;
  email: string;
  password: string;
  reveral?: string;
};

export type UserSignInType = {
  email: string;
  password: string;
};

export type UserAuthResponseType = {
  status: number;
  success: boolean;
  message: string;
  data: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: number[];
};

export type FetchUser = {
  status: number;
  success: boolean;
  message: string;
  data: Data;
};

export type Data = {
  user: UserData;
  tokens: string;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  userRoles: UserRole[];
};

export type UserRole = {
  id: number;
  userId: string;
  roleId: number;
};
