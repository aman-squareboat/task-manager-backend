import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/database';

import { TaskEtaUpdateHistoryContract } from './contract';

import { TaskStatusUpdateHistoryModel } from '@libs/task-status-update-history/models';
import {
  ITaskEtaUpdateHistoryModel,
  ITaskStatusUpdateHistoryModel,
} from '@libs/common';
import { TaskEtaUpdateHistoryModel } from '@libs/task-eta-update-history/models';

@Injectable()
export class TaskEtaUpdateHistoryRepository
  extends DB<ITaskEtaUpdateHistoryModel>
  implements TaskEtaUpdateHistoryContract
{
  @InjectModel(TaskEtaUpdateHistoryModel)
  model: TaskEtaUpdateHistoryModel;
}
