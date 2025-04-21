import { Injectable } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';

@Injectable()
export class KafkaRateGuard {
  private readonly consumerLimits = new Map<string, number>();

  checkRate(topic: string, partition: number): boolean {
    const key = `${topic}:${partition}`;
    const count = this.consumerLimits.get(key) || 0;

    if (count > 1000) { // Лимит на обработку сообщений
      return false;
    }

    this.consumerLimits.set(key, count + 1);
    return true;
  }
}