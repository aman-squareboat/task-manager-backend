import { Transformer } from '@libs/boat';
import { access } from 'fs';
import { ITaskModel, IUserModel } from '../interfaces';

interface PaginatedTasks {
  pagination: {
    currentPage: number;
    totalPage: number;
    perPage: number;
    total: number;
    count: number;
  };
  data: {
    id: string;
    eta: string;
    title: string;
    status: number;
  }[];
}
export class PaginateTasksTransformer extends Transformer {
  async transform(paginatedTasks: {
    pagination: {
      currentPage: number;
      totalPage: number;
      perPage: number;
      total: number;
      count: number;
    };
    data: ITaskModel[];
  }): Promise<PaginatedTasks> {
    let pagination = paginatedTasks.pagination;
    let data = paginatedTasks.data.map((task) => {
      return {
        id: task.ulid,
        eta: task.eta,
        title: task.title,
        status: task.status,
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
