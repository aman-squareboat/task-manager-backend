import { RepoNames } from '@libs/users';
import { Inject, Injectable } from '@nestjs/common';
import { TaskEtaUpdateHistoryContract } from '../repositories';

@Injectable()
export class TaskEtaUpdateHistoryLibService {
  constructor(
    @Inject(RepoNames.TASK_ETA_UPDATE_HISTORY_REPOSITORY)
    public readonly repo: TaskEtaUpdateHistoryContract,
  ) {}
}
