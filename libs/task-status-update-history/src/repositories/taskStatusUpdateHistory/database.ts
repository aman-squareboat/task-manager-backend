import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/database';

import { TaskStatusUpdateHistoryContract } from './contract';

import { TaskStatusUpdateHistoryModel } from '@libs/task-status-update-history/models';
import { ITaskStatusUpdateHistoryModel } from '@libs/common';

@Injectable()
export class TaskStatusUpdateHistoryRepository
  extends DB<ITaskStatusUpdateHistoryModel>
  implements TaskStatusUpdateHistoryContract
{
  @InjectModel(TaskStatusUpdateHistoryModel)
  model: TaskStatusUpdateHistoryModel;
}
