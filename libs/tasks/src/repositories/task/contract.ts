import { ITaskModel } from '@libs/common';
import { RepositoryContract } from '@libs/database';

export interface TaskRepositoryContract
  extends RepositoryContract<ITaskModel> {}
