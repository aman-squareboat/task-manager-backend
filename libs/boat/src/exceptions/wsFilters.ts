import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class WSExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('🚀 ~ file: wsFilters.ts ~ line 7 ~ WSExceptionFilter ~ exception', exception);
    super.catch(exception, host);
  }
}
