import { Transformer } from '@libs/boat';
import { access } from 'fs';
import {
  ITaskStatusUpdateHistoryModel,
  ITaskModel,
  IUserModel,
} from '../interfaces';

export class TaskStatusUpdateHistoryTransformer extends Transformer {
  async transform(taskHistory: ITaskStatusUpdateHistoryModel[]): Promise<
    {
      id: string;
      updatedFromStatus: number;
      updatedToStatus: number;
      updatedAt: string;
    }[]
  > {
    let data = taskHistory.map((instance) => {
      return {
        id: instance.ulid,
        updatedFromStatus: instance.updatedFromStatus,
        updatedToStatus: instance.updatedToStatus,
        updatedAt: instance.updatedAt,
      };
    });
    return data;
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
