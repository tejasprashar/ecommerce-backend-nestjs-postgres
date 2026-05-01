import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = 'Something went wrong';
    let errors: string[] | undefined;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const res = exceptionResponse as {
        message?: string | string[];
      };

      if (Array.isArray(res.message)) {
        message = 'Validation failed';
        errors = res.message;
      } else if (typeof res.message === 'string') {
        message = res.message;
      }
    }

    response.status(status).json({
      success: false,
      message,
      ...(errors && { errors }),
    });
  }
}
