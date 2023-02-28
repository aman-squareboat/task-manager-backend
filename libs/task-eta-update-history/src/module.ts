import { RepoNames } from '@libs/users';
import { Module } from '@nestjs/common';
import { TaskEtaUpdateHistoryRepository } from './repositories';
import { TaskEtaUpdateHistoryLibService } from './services/task-eta-update-history';

@Module({
  providers: [
    TaskEtaUpdateHistoryLibService,
    {
      provide: RepoNames.TASK_ETA_UPDATE_HISTORY_REPOSITORY,
      useClass: TaskEtaUpdateHistoryRepository,
    },
  ],
  exports: [TaskEtaUpdateHistoryLibService],
})
export class TaskEtaUpdateHistoryLibModule {}
