import { Injectable } from '@nestjs/common';
import { KafkaService } from '../kafka.service';



// !!!!!!!!!  ПРИМЕР !!!!!!!!


@Injectable()
export class DealProducer {
  constructor(private kafkaService: KafkaService) {}

  async dealClosed(dealId: string, adminId: string) {
    await this.kafkaService.sendMessage('deal-closed', [{
      value: JSON.stringify({ dealId, adminId, timestamp: new Date() }),
    }]);
  }

  async disputeResolved(dealId: string, resolution: string) {
    await this.kafkaService.sendMessage('dispute-resolved', [{
      value: JSON.stringify({ dealId, resolution }),
    }]);
  }
}