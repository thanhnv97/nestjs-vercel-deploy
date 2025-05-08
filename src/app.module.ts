import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomBodyParserMiddleware } from './middlewares/custom-body-parser.middleware';
import * as bodyParser from 'body-parser';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CustomBodyParserMiddleware)
      .forRoutes({ path: '*/webhook', method: RequestMethod.POST });

    consumer
      .apply(bodyParser.json(), bodyParser.urlencoded({ extended: true }))
      .exclude({ path: '*/webhook', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
