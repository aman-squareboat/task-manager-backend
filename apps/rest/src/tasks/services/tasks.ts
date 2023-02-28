import { TasksLibService } from '@libs/tasks';
import { Injectable } from '@nestjs/common';
import {
  CreateTaskDto,
  GetPaginatedTasksDto,
  GetTaskByIdDto,
  UpdateTaskByIdDto,
} from '../validators';
import { ulid } from 'ulid';
import { TaskStatusUpdateHistoryLibService } from '@libs/task-status-update-history';
import { TaskEtaUpdateHistoryLibService } from '@libs/task-eta-update-history';

@Injectable()
export class TasksApiService {
  constructor(
    private readonly taskLibService: TasksLibService,
    private readonly taskStatusUpdateHistoryLibService: TaskStatusUpdateHistoryLibService,
    private readonly taskEtaUpdateHistoryLibService: TaskEtaUpdateHistoryLibService,
  ) {}
  async createNewTask(input: CreateTaskDto) {
    return await this.taskLibService.repo.create({
      ulid: ulid(),
      eta: input.eta,
      title: input.title,
      status: input.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  async getPaginatedTasks(input: GetPaginatedTasksDto) {
    return await this.taskLibService.repo
      .query()
      .paginate(input.pageNumber, input.tasksPerPage);
  }
  async getTaskById(input: GetTaskByIdDto) {
    return await this.taskLibService.repo.firstWhere({ ulid: input.id });
  }
  async updateTaskById(input: UpdateTaskByIdDto) {
    let task = await this.taskLibService.repo.firstWhere({ ulid: input.id });
    let updated = await this.taskLibService.repo.updateWhere(
      { ulid: input.id },
      { eta: input.eta, status: input.status },
    );
    if (input.status || (input.status == 0 && task.status != input.status))
      this.taskStatusUpdateHistoryLibService.repo.create({
        ulid: ulid(),
        taskId: task.id,
        updatedFromStatus: task.status,
        updatedToStatus: input.status,
        updatedAt: new Date().toISOString(),
      });
    if (input.eta && task.eta != input.eta)
      this.taskEtaUpdateHistoryLibService.repo.create({
        ulid: ulid(),
        taskId: task.id,
        updatedFromEta: task.eta,
        updatedToEta: input.eta,
        updatedAt: new Date().toISOString(),
      });
    return updated;
  }
}
