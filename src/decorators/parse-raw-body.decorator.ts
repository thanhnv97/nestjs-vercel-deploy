import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import * as bodyParser from 'body-parser';

export function ParseRawBody() {
  return applyDecorators(
    UseInterceptors({
      intercept: (context, next) => {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();

        return new Promise((resolve) => {
          bodyParser.json({
            verify: (req: any, res, buf) => {
              req.rawBody = buf.toString();
            }
          })(request, request.res, (err) => {
            if (err) {
              console.error('Error parsing JSON:', err);
            }
            resolve(next.handle());
          });
        });
      }
    }),
    UseInterceptors({
      intercept: (context, next) => {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();

        return new Promise((resolve) => {
          bodyParser.urlencoded({ extended: true })(request, request.res, (err) => {
            if (err) {
              console.error('Error parsing urlencoded:', err);
            }
            resolve(next.handle());
          });
        });
      }
    }),
    UseInterceptors({
      intercept: (context, next) => {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();

        return new Promise((resolve) => {
          bodyParser.text()(request, request.res, (err) => {
            if (err) {
              console.error('Error parsing text:', err);
            }
            resolve(next.handle());
          });
        });
      }
    }),
    UseInterceptors({
      intercept: (context, next) => {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();

        return new Promise((resolve) => {
          bodyParser.raw({ type: '*/*' })(request, request.res, (err) => {
            if (err) {
              console.error('Error parsing raw:', err);
            }
            resolve(next.handle());
          });
        });
      }
    })
  );
}