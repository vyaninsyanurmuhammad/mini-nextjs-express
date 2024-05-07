export type UserModel = {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  userRoles: UserRole[];
};

export type UserRole = {
  id: number;
  userId: string;
  roleId: number;
};
