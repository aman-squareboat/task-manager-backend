import { IUserModel } from '@libs/common/interfaces/user';
import { RepositoryContract } from '@libs/database';

export interface UserRepositoryContract
  extends RepositoryContract<IUserModel> {}
