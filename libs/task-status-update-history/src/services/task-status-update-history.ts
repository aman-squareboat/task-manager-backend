import { RepoNames } from '@libs/users';
import { Inject, Injectable } from '@nestjs/common';
import { TaskStatusUpdateHistoryContract } from '../repositories';

@Injectable()
export class TaskStatusUpdateHistoryLibService {
  constructor(
    @Inject(RepoNames.TASK_STATUS_UPDATE_HISTORY_REPOSITORY)
    public readonly repo: TaskStatusUpdateHistoryContract,
  ) {}
}
