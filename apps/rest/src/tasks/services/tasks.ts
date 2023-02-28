import { TasksLibService } from '@libs/tasks';
import { Injectable } from '@nestjs/common';
import {
  CreateTaskDto,
  GetPaginatedTasksDto,
  GetTaskByIdDto,
  UpdateTaskByIdDto,
} from '../validators';
import { ulid } from 'ulid';

@Injectable()
export class TasksApiService {
  constructor(private readonly taskLibService: TasksLibService) {}
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
    return await this.taskLibService.repo.updateWhere(
      { ulid: input.id },
      { eta: input.eta, status: input.status },
    );
  }
}
