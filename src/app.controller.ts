import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UseRawBody } from './decorators/use-raw-body.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/webhook')
  @UseRawBody()
  callback(@Body() data: any): string {
    console.log('data', data);
    return '1';
  }
}
