import { Module } from '@nestjs/common';
import { RepoNames } from './constants';
import { UserRepository } from './repositories';
import { UsersLibService } from './services/service';

@Module({
  providers: [
    UsersLibService,
    { provide: RepoNames.USER_REPOSITORY, useClass: UserRepository },
  ],
  exports: [UsersLibService],
})
export class UsersLibModule {}
