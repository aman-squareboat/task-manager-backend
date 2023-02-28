import { RepoNames } from '@libs/users';
import { Module } from '@nestjs/common';
import { JobRepository } from './repositories/job/database';
import { JobsLibService } from './services/jobs';

@Module({
  providers: [
    JobsLibService,
    { provide: RepoNames.JOB_REPOSITORY, useClass: JobRepository },
  ],
  exports: [JobsLibService],
})
export class JobsLibModule {}
