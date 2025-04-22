// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';

// @Injectable()
// export class JwtAuthGuard extends ThrottlerGuard {
//   async handleRequest(
//     context: ExecutionContext,
//     limit: number,
//     ttl: number,
//     throttler: ThrottlerOptions,
//   ): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const response = context.switchToHttp().getResponse();
//     const ip = request.ip;
//     const key = this.generateKey(context, ip, throttler.name);
    
//     const { totalHits, timeToExpire } = await this.storageService.increment(key, ttl);

//     // if (totalHits > limit) {
//     //   throw new ThrottlerException({
//     //     message: 'Too many requests',
//     //     ttl: timeToExpire,
//     //     limit,
//     //     totalHits: totalHits,
//     //   });
//     // }

//     return super.canActivate(context);
//   }

//   protected generateKey(context: ExecutionContext, ip: string, suffix: string): string {
//     return `auth_guard:${ip}:${suffix}`;
//   }
// }