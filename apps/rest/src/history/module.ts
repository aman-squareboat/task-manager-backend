import { Module } from '@nestjs/common';
import { HistoryApiService } from './services/history';
import { HistoryController } from './controllers/history';
import { TaskEtaUpdateHistoryLibModule } from '@libs/task-eta-update-history';
import { TaskStatusUpdateHistoryLibModule } from '@libs/task-status-update-history';
import { TasksLibModule, TasksLibService } from '@libs/tasks';

@Module({
  imports: [
    TaskEtaUpdateHistoryLibModule,
    TaskStatusUpdateHistoryLibModule,
    TasksLibModule,
  ],
  providers: [HistoryApiService],
  controllers: [HistoryController],
})
export class HistoryApiModule {}
