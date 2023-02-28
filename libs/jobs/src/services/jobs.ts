import { RepoNames } from '@libs/users';
import { Inject, Injectable } from '@nestjs/common';
import { JobRepositoryContract } from '../repositories';

@Injectable()
export class JobsLibService {
  constructor(
    @Inject(RepoNames.JOB_REPOSITORY)
    public readonly repo: JobRepositoryContract,
  ) {}
}
