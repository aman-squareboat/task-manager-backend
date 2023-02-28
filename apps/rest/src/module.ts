import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { HistoryApiModule } from './history';
import { TasksApiModule } from './tasks/module';

@Module({
  imports: [BoatModule, TasksApiModule, HistoryApiModule],
})
export class AppModule {}
