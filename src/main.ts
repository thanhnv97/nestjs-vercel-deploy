import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  // app.use((req, res, next) => {
  //   let data = '';
  //   req.setEncoding('utf8');
  //   req.on('data', (chunk) => {
  //     data += chunk;
  //   });
  //   req.on('end', () => {
  //     req.rawBody = data;
  //     req.body = data;
  //     console.log('Raw body:', data);
  //     next();
  //   });
  // });

  // // Cấu hình body-parser
  // app.use(
  //   bodyParser.json({
  //     verify: (req: any, res, buf) => {
  //       req.rawBody = buf.toString();
  //     },
  //   }),
  // );

  console.log('1::>>', 1);

  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.text());
  // app.use(bodyParser.raw({ type: '*/*' }));

  // app.useBodyParser('json');
  // app.useBodyParser('text');
  // app.useBodyParser('raw');

  await app.listen(3000);
  console.log('2::>>', 2);
}
bootstrap();
