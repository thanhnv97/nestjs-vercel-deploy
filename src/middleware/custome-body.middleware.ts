import { Injectable, NestMiddleware } from '@nestjs/common';
import {  Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

@Injectable()
export class CustomBodyParserMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      req.rawBody = data;
      console.log('Raw body:', data);
      next();
    });
    bodyParser.json()(req, res, next); // Parse JSON request bodies
    // Alternatively, use other body-parser methods like:
    bodyParser.urlencoded({ extended: true })(req, res, next);
    bodyParser.raw()(req, res, next);
    bodyParser.text()(req, res, next);
  }
}
