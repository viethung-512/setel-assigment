import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Unauthenticated',
        status: 401,
      });
    }

    return next();
  }
}
