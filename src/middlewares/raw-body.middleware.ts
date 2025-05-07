import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    bodyParser.raw({ type: '*/*' })(req, res, (err) => {
      if (err) return next(err);

      const rawBody = (req as any).body;
      (req as any).rawBody = rawBody.toString('utf8');

      bodyParser.json()(req, res, (err) => {
        if (err) return next(err);

        bodyParser.urlencoded({ extended: true })(req, res, (err) => {
          if (err) return next(err);

          next();
        });
      });
    });
  }
}
