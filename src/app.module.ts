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
import { WebhookController } from './webhook.controller';

@Module({
  imports: [],
  controllers: [AppController, WebhookController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CustomBodyParserMiddleware)
      .forRoutes({ path: '/webhook/test', method: RequestMethod.POST });

    consumer
      .apply(bodyParser.json(), bodyParser.urlencoded({ extended: true }))
      .exclude({ path: '/webhook/test', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
