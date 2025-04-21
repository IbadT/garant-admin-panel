import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Блокировка подозрительных User-Agent
    const ua = req.headers['user-agent'] || '';
    if (ua.includes('sqlmap') || ua.includes('nikto')) {
      res.status(403).send('Forbidden');
      return;
    }

    // Лимит размера тела запроса
    if (Number(req.headers['content-length']) > 1024 * 1024) {
      res.status(413).send('Payload too large');
      return;
    }

    next();
  }
}