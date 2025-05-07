import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bodyParser from 'body-parser';

function RawBodyInterceptor() {
  return UseInterceptors({
    intercept(context, next) {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();

      return new Observable((observer) => {
        let data = '';
        req.setEncoding('utf8');
        req.on('data', (chunk) => {
          data += chunk;
        });
        req.on('end', () => {
          (req as any).rawBody = data;

          bodyParser.json({
            verify: (req: any, res, buf) => {
              req.rawBody = buf.toString();
            },
          })(req, res, (err) => {
            if (err) return observer.error(err);

            bodyParser.urlencoded({ extended: true })(req, res, (err) => {
              if (err) return observer.error(err);

              bodyParser.text()(req, res, (err) => {
                if (err) return observer.error(err);

                bodyParser.raw({ type: '*/*' })(req, res, (err) => {
                  if (err) return observer.error(err);

                  next.handle().subscribe(observer);
                });
              });
            });
          });
        });
      });
    },
  });
}

export function ParseRawBody() {
  return applyDecorators(RawBodyInterceptor());
}
