import { Injectable, NestMiddleware } from '@nestjs/common';
import prismaFQP from '@krsbx/prisma-fqp';

@Injectable()
export class ParserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.filterQueryParams = req.query.filters
      ? prismaFQP(req.query.filters as string)
      : {};
    delete req.query.filters;
    next();
  }
}
