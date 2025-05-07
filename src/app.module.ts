import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomBodyParserMiddleware } from './middleware/custome-body.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomBodyParserMiddleware).forRoutes('*'); // Apply to all routes
    //.forRoutes({ path: '*', method: RequestMethod.ALL }); //Alternative way to apply to all routes
  }
}
