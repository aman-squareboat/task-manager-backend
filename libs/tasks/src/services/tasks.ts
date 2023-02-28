import { RepoNames } from '@libs/users';
import { Inject, Injectable } from '@nestjs/common';
import { TaskRepositoryContract } from '../repositories';

@Injectable()
export class TasksLibService {
  constructor(
    @Inject(RepoNames.TASK_REPOSITORY)
    public readonly repo: TaskRepositoryContract,
  ) {}
}
