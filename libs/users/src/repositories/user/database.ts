import { UserModel } from '../../models';
import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/database';
import { UserRepositoryContract } from './contract';
import { IUserModel } from '@libs/common/interfaces/user';

@Injectable()
export class UserRepository
  extends DB<IUserModel>
  implements UserRepositoryContract
{
  @InjectModel(UserModel)
  model: UserModel;
}
