import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories';

import { UserSignedUp } from '../events/userSignedUp';
import { UserModuleConstants } from '../constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserModuleConstants.userRepo) private users: UserRepositoryContract,
  ) {}

  async get(): Promise<Record<string, any>> {
    return this.users.firstWhere({});
  }
}
