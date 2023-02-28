import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedAccessException extends HttpException {
  constructor() {
    super("User Doesn't have required access", 403);
  }
}
