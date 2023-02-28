import { Request, Response, RestController, validateSchema } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
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
    return res.success({
      data: await this.service.getStatusUpdateHistoryById(dto),
    });
  }
  @Get('eta/:id')
  @Validate(GetTaskUpdateHistoryById)
  async getTaskEtaUpdateHistoryById(
    @Dto() dto: GetTaskUpdateHistoryById,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return res.success({
      data: await this.service.getEtaUpdateHistoryById(dto),
    });
  }
}
