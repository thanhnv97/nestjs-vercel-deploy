import { Controller, Get, Post, RawBodyRequest, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/webhook')
  callback(@Req() req: RawBodyRequest<Request>): string {
    console.log('req', req.rawBody);
    return '1';
  }
}
