import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/demo')
  callbac1k(@Body() data): string {
    console.log('data', data);
    return '1';
  }
}

// {"qrcode":"https://tfmshippingsys.fastmove.com.tw/tApi/images/redeem_sample.jpg","rcode":"2505060226002472sRilpGD","qrcodeType":0,"encStr":"9a94f7190b5a12789c29a59a8e5de1f9c3e2386e","resultcode":"000","resultmsg":"success","iccid":"250506022600247GPTMXA02"}
