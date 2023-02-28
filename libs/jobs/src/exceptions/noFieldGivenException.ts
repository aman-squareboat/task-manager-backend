import { HttpException, HttpStatus } from '@nestjs/common';

export class NoFieldGivenException extends HttpException {
  constructor() {
    super(
      'Neither Title nor Description is given to update',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
