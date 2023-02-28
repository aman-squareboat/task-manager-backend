import { ITaskStatusUpdateHistoryModel } from '@libs/common';
import { RepositoryContract } from '@libs/database';

export interface TaskStatusUpdateHistoryContract
  extends RepositoryContract<ITaskStatusUpdateHistoryModel> {}
