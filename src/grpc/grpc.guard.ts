import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class GrpcRateGuard implements CanActivate {
  private readonly limits = new Map<string, { count: number; lastCall: number }>();

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const call = context.switchToRpc().getContext();
    const ip = this.getIpFromMetadata(call.metadata);

    const now = Date.now();
    const limit = this.limits.get(ip) || { count: 0, lastCall: 0 };

    if (now - limit.lastCall < 1000 && limit.count > 10) { // 10 вызовов в секунду
      return false;
    }

    this.limits.set(ip, {
      count: now - limit.lastCall < 1000 ? limit.count + 1 : 1,
      lastCall: now,
    });

    return true;
  }

  private getIpFromMetadata(metadata: Metadata): string {
    return metadata.get('x-real-ip')[0]?.toString() || 'unknown';
  }
}