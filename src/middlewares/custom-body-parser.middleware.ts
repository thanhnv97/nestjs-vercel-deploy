import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class CustomBodyParserMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: NextFunction) {
    if (req.readable) {
      getRequestBody(req);
    }
    next();
  }
}

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.setEncoding('utf8');

    req.on('data', (chunk) => {
      data += chunk; // Accumulate data chunks
    });

    req.on('end', () => {
      req.rawBody = data;
      req.body = data;
      resolve(data); // Resolve the promise with the raw data
    });

    req.on('error', (error) => {
      reject(error); // Reject the promise if there's an error
    });
  });
}
