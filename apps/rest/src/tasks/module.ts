import { TaskEtaUpdateHistoryLibModule } from '@libs/task-eta-update-history';
import { TaskStatusUpdateHistoryLibModule } from '@libs/task-status-update-history';

import { TasksLibModule } from '@libs/tasks';
import { Module } from '@nestjs/common';
import { TasksController } from './controllers';
import { TasksApiService } from './services';

@Module({
  imports: [
    TasksLibModule,
    TaskStatusUpdateHistoryLibModule,
    TaskEtaUpdateHistoryLibModule,
  ],
  providers: [TasksApiService],
  controllers: [TasksController],
})
export class TasksApiModule {}
