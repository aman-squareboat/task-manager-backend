export interface IUserModel {
  id?: number;
  name?: string;
  roleId?: number;
  status?: number;
  email?: string;
  password?: string;
  access_token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
