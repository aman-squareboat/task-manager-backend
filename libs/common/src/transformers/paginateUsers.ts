import { Transformer } from '@libs/boat';
import { access } from 'fs';
import { IUserModel } from '../interfaces';

interface PaginatedUsers {
  pagination: {
    currentPage: number;
    totalPage: number;
    perPage: number;
    total: number;
    count: number;
  };
  data: {
    id: number;
    name: string;
    email: string;
    roleId: number;
    status: number;
  }[];
}
export class PaginateUsersTransformer extends Transformer {
  async transform(paginatedUsers: {
    pagination: {
      currentPage: number;
      totalPage: number;
      perPage: number;
      total: number;
      count: number;
    };
    data: IUserModel[];
  }): Promise<PaginatedUsers> {
    let pagination = paginatedUsers.pagination;
    let data = paginatedUsers.data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        status: user.status,
      };
    });
    return {
      pagination,
      data,
    };
  }
  async includeExtra(user: Record<string, any>): Promise<Record<string, any>> {
    return { username: user.username };
  }

  async includeAddress(
    user: Record<string, any>,
  ): Promise<Record<string, any>> {
    return { country: 'INDIA', cityName: 'Gurugram' };
  }

  async includePin(user: Record<string, any>): Promise<Record<string, any>> {
    return { code: '122002' };
  }
}
