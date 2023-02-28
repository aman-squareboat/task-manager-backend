import { IJobModel } from '@libs/common/interfaces/job';
import { RepositoryContract } from '@libs/database';

export interface JobRepositoryContract extends RepositoryContract<IJobModel> {}
