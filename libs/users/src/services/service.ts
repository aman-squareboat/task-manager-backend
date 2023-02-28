import { Inject, Injectable } from '@nestjs/common';
import { RepoNames } from '../constants';
import { UserRepositoryContract } from '../repositories';

@Injectable()
export class UsersLibService {
  constructor(
    @Inject(RepoNames.USER_REPOSITORY)
    public readonly repo: UserRepositoryContract,
  ) {}
}
