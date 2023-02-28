import { ITaskEtaUpdateHistoryModel } from '@libs/common';
import { RepositoryContract } from '@libs/database';

export interface TaskEtaUpdateHistoryContract
  extends RepositoryContract<ITaskEtaUpdateHistoryModel> {}
