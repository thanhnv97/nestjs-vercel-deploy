import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test/webhook')
  callback(@Req() req, @Body() data): string {
    console.log('req', req.rawBody);
    console.log('req', req.body);
    console.log('data', data);
    return '1';
  }

  // not working with api
  @Post('/demo')
  callbac1k(@Body() data): string {
    console.log('data', data);
    return '1';
  }
}
