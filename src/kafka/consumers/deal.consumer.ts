import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { DealLog } from '../../logs/entities/deal-log.entity';



// !!!!!!!!!  ПРИМЕР !!!!!!!!



@Injectable()
export class DealConsumer implements OnModuleInit {
  private consumer: Consumer;

  constructor(
    @Inject('KAFKA_SERVICE') private kafka: Kafka,
    // @InjectRepository(DealLog)
    // private dealLogRepository: Repository<DealLog>,
  ) {
    this.consumer = this.kafka.consumer({ groupId: 'deal-consumer' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ 
      topics: ['deal-created', 'deal-updated', 'dispute-opened'] 
    });
    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        const { topic, message } = payload;
        const value = JSON.parse(message.value.toString());

        // Логирование действий со сделками
        const logEntry = this.dealLogRepository.create({
          dealId: value.dealId,
          action: topic,
          details: JSON.stringify(value),
          timestamp: new Date(),
        });
        await this.dealLogRepository.save(logEntry);

        // Обработка уведомлений для админов
        if (topic === 'dispute-opened' || 
            (topic === 'deal-created' && value.amount > 10000)) {
          this.triggerAdminNotification(value);
        }
      },
    });
  }

  private triggerAdminNotification(data: any) {
    // Логика отправки уведомления админам
  }
}