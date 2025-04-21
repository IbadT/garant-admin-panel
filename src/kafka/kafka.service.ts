import { Injectable, Inject } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';




// !!!!!!!!!  ПРИМЕР !!!!!!!!



@Injectable()
export class KafkaService {
  private producer: Producer;

  constructor(@Inject('KAFKA_SERVICE') private kafka: Kafka) {
    this.producer = this.kafka.producer();
    this.connect();
  }

  private async connect() {
    await this.producer.connect();
  }

  async sendMessage(topic: string, messages: Array<{ value: string }>) {
    const record: ProducerRecord = {
      topic,
      messages,
    };
    await this.producer.send(record);
  }
}