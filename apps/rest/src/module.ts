import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { TasksApiModule } from './tasks/module';

@Module({
  imports: [BoatModule, TasksApiModule],
})
export class AppModule {}
