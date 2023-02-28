import { TaskEtaUpdateHistoryLibService } from '@libs/task-eta-update-history';
import { TaskStatusUpdateHistoryLibService } from '@libs/task-status-update-history';
import { TasksLibService } from '@libs/tasks';
import { Injectable } from '@nestjs/common';
import { GetTaskUpdateHistoryById } from '../validators/getTaskUpdateHistoryById';

@Injectable()
export class HistoryApiService {
  constructor(
    private readonly taskStatusUpdateHistory: TaskStatusUpdateHistoryLibService,
    private readonly taskEtaUpdateHistory: TaskEtaUpdateHistoryLibService,
    private readonly taskLibService: TasksLibService,
  ) {}
  async getStatusUpdateHistoryById(input: GetTaskUpdateHistoryById) {
    let task = await this.taskLibService.repo.firstWhere({ ulid: input.id });
    return await this.taskStatusUpdateHistory.repo
      .query()
      .paginate(input.pageNumber, input.perPage);
  }
  async getEtaUpdateHistoryById(input: GetTaskUpdateHistoryById) {
    let task = await this.taskLibService.repo.firstWhere({ ulid: input.id });
    return await this.taskEtaUpdateHistory.repo
      .query()
      .paginate(input.pageNumber, input.perPage);
  }
}
