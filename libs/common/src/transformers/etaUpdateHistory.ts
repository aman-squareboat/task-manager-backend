import { Transformer } from '@libs/boat';
import { access } from 'fs';
import {
  ITaskEtaUpdateHistoryModel,
  ITaskModel,
  IUserModel,
} from '../interfaces';

export class TaskEtaUpdateHistoryTransformer extends Transformer {
  async transform(taskHistory: ITaskEtaUpdateHistoryModel[]): Promise<
    {
      id: string;
      updatedFromEta: string;
      updatedToEta: string;
      updatedAt: string;
    }[]
  > {
    let data = taskHistory.map((instance) => {
      return {
        id: instance.ulid,
        updatedFromEta: instance.updatedFromEta,
        updatedToEta: instance.updatedToEta,
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
