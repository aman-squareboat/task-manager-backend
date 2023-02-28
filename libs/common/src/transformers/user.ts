import { Transformer } from '@libs/boat';
import { access } from 'fs';
import { IUserModel } from '../interfaces';

export class UserDetailTransformer extends Transformer {
  availableIncludes = ['extra', 'address', 'pin', 'token'];
  // defaultIncludes = ['pin'];

  async transform(user: IUserModel): Promise<{
    id: number;
    name: string;
    email: string;
    roleId: number;
    status: number;
    access_token: string;
  }> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      status: user.status,
      access_token: user.access_token,
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
