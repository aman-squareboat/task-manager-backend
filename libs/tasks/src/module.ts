import { RepoNames } from '@libs/users';
import { Module } from '@nestjs/common';
import { TaskRepository } from './repositories';
import { TasksLibService } from './services/tasks';

@Module({
  providers: [
    TasksLibService,
    { provide: RepoNames.TASK_REPOSITORY, useClass: TaskRepository },
  ],
  exports: [TasksLibService],
})
export class TasksLibModule {}
