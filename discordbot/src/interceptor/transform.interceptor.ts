import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private logColorYellow: string = '\x1b[33m';
  private logColorNormal: string = '\x1b[0m';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start: number = Date.now();
    const calledInfo: object = this.getCalledInfo(context);
    Logger.log(JSON.stringify(calledInfo), 'InterceptorBegin');

    Logger.log(
      JSON.stringify(this.getRequestInfo(context)),
      'InterceptorRequest',
    );

    Logger.log(
      JSON.stringify(this.getResponseInfo(context)),
      'InterceptorResponse',
    );

    return next.handle().pipe(
      catchError((err: any) => throwError(() => new BadGatewayException(err))),
      tap(() => {
        Logger.log(
          `${JSON.stringify(calledInfo)} ${this.getDelay(start)}`,
          'InterceptorEnd',
        );
      }),
    );
  }

  private getCalledInfo(context: ExecutionContext): object {
    return {
      className: context.getClass().name,
      method: context.getHandler().name,
    };
  }

  private getRequestInfo(context: ExecutionContext): object {
    const request: Request = context.switchToHttp().getRequest<Request>();
    return {
      method: request.method,
      url: request.url,
      body: request.body || {},
    };
  }

  private getResponseInfo(context: ExecutionContext): object {
    const response: Response = context.switchToHttp().getResponse<Response>();
    return {
      statusCode: response.status,
      statusMessage: response.statusText,
    };
  }

  private getDelay(start: number): string {
    const delay: number = Date.now() - start;
    return `${this.logColorYellow}+${delay}ms${this.logColorNormal}`;
  }
}
