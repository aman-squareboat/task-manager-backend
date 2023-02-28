import { HttpException, HttpStatus } from '@nestjs/common';

export class JobDoesNotExist extends HttpException {
  constructor() {
    super('Job Does Not Exist', HttpStatus.NOT_FOUND);
  }
}
