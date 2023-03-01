import { Request, Response, RestController } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { PaginateTasksTransformer } from '@libs/common';
import { Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { extend } from 'lodash';
import { TasksApiService } from '../services';
import {
  CreateTaskDto,
  GetPaginatedTasksDto,
  GetTaskByIdDto,
  UpdateTaskByIdDto,
} from '../validators';

@Controller('tasks')
export class TasksController extends RestController {
  constructor(private readonly service: TasksApiService) {
    super();
  }
  @Get()
  @Validate(GetPaginatedTasksDto)
  async getAllTasks(
    @Dto() dto: GetPaginatedTasksDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let tasks = await this.service.getPaginatedTasks(dto);
    return res.success(
      await this.transform(tasks, new PaginateTasksTransformer(), { req }),
    );
  }

  @Get(':id')
  @Validate(GetTaskByIdDto)
  async getTask(
    @Dto() dto: GetTaskByIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let task = await this.service.getTaskById(dto);
    return res.success({ task });
  }

  @Put(':id')
  @Validate(UpdateTaskByIdDto)
  async updateTask(
    @Dto() dto: UpdateTaskByIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let updated = await this.service.updateTaskById(dto);
    return res.success({
      updated: dto,
    });
  }

  @Post()
  @Validate(CreateTaskDto)
  async createTask(
    @Dto() dto: CreateTaskDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.service.createNewTask(dto);
    return res.success({
      message: 'Successfully Created',
      data: dto,
    });
  }
}
