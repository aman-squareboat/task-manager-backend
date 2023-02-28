import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/database';
import { JobRepositoryContract } from './contract';
import { IUserModel } from '@libs/common/interfaces/user';
import { JobModel } from '../../models';
import { IJobModel } from '@libs/common';

@Injectable()
export class JobRepository
  extends DB<IJobModel>
  implements JobRepositoryContract
{
  @InjectModel(JobModel)
  model: JobModel;
}
