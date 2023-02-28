import { TasksLibModule } from '@libs/tasks';
import { Module } from '@nestjs/common';
import { TasksController } from './controllers';
import { TasksApiService } from './services';

@Module({
  imports: [TasksLibModule],
  providers: [TasksApiService],
  controllers: [TasksController],
})
export class TasksApiModule {}
