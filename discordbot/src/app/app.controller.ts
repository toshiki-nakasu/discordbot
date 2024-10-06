import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('/health')
  public health(@Res() response: Response): void {
    response.status(HttpStatus.OK).json({ status: 'ok' }).send();
  }
}
