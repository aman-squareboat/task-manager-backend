import { Request, Response, RestController, validateSchema } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import {
  TaskEtaUpdateHistoryTransformer,
  TaskStatusUpdateHistoryTransformer,
} from '@libs/common';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { extend } from 'lodash';
import { HistoryApiService } from '../services';
import { GetTaskUpdateHistoryById } from '../validators/getTaskUpdateHistoryById';

@Controller('history')
export class HistoryController extends RestController {
  constructor(private readonly service: HistoryApiService) {
    super();
  }
  @Get('status/:id')
  @Validate(GetTaskUpdateHistoryById)
  async getTaskStatusUpdateHistoryById(
    @Dto() dto: GetTaskUpdateHistoryById,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return res.success(
      await this.transform(
        await this.service.getStatusUpdateHistoryById(dto),
        new TaskStatusUpdateHistoryTransformer(),
        { req },
      ),
    );
  }
  @Get('eta/:id')
  @Validate(GetTaskUpdateHistoryById)
  async getTaskEtaUpdateHistoryById(
    @Dto() dto: GetTaskUpdateHistoryById,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return res.success(
      await this.transform(
        await this.service.getEtaUpdateHistoryById(dto),
        new TaskEtaUpdateHistoryTransformer(),
        { req },
      ),
    );
  }
}
