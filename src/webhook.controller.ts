import { Body, Controller, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly appService: AppService) {}

  @Post('/test')
  callback(@Req() req, @Body() data): string {
    console.log('req', req.rawBody);
    console.log('req', req.body);
    console.log('data', data);
    return '1';
  }
}
