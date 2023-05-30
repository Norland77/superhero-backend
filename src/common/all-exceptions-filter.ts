import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let message;
    if (exception && exception['response'] && exception['response'].message) {
      message = exception['response'].message;
    } else {
      message = exception instanceof HttpException ? exception.message : `Description not found: ${exception}`;
    }

    const stack = exception instanceof HttpException ? exception.stack : '';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      stack: stack,
    });
  }
}
