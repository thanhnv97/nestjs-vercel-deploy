import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as getRawBody from 'raw-body';

@Injectable()
export class CustomBodyParserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.readable) {
      try {
        const raw = await getRawBody(req);
        const text = raw.toString().trim();
        (req as any).rawBody = text;

        // Attempt to parse JSON
        try {
          req.body = JSON.parse(text);
        } catch (e) {
          req.body = text;
        }
      } catch (error) {
        next(error);
        return;
      }
    }
    next();
  }
}
