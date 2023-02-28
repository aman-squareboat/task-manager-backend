import { RepoNames } from '@libs/users';
import { Module } from '@nestjs/common';
import { TaskStatusUpdateHistoryRepository } from './repositories';
import { TaskStatusUpdateHistoryLibService } from './services/task-status-update-history';

@Module({
  providers: [
    TaskStatusUpdateHistoryLibService,
    {
      provide: RepoNames.TASK_STATUS_UPDATE_HISTORY_REPOSITORY,
      useClass: TaskStatusUpdateHistoryRepository,
    },
  ],
  exports: [TaskStatusUpdateHistoryLibService],
})
export class TaskStatusUpdateHistoryLibModule {}
