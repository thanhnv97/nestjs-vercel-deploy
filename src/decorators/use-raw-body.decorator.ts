import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { RawBodyMiddleware } from '../middlewares/raw-body.middleware';

export function UseRawBody() {
  return applyDecorators(UseInterceptors(RawBodyMiddleware));
}
