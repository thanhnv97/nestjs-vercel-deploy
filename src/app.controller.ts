import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/webhook')
  callback(@Req() req): string {
    console.log('req', req.rawBody);
    console.log('req', req.body);
    return '1';
  }

  @Post('/demo')
  callbac1k(@Req() req): string {
    console.log('req', req.rawBody);
    console.log('req', req.body);
    return '1';
  }
}
