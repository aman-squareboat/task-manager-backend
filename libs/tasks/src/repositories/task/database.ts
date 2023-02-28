import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/database';

import { IUserModel } from '@libs/common/interfaces/user';
import { TaskRepositoryContract } from './contract';
import { TaskModel } from '@libs/tasks/models';
import { ITaskModel } from '@libs/common';

@Injectable()
export class TaskRepository
  extends DB<ITaskModel>
  implements TaskRepositoryContract
{
  @InjectModel(TaskModel)
  model: TaskModel;
}
