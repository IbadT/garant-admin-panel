// import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
// // import { NotificationService } from '../../notifications/notification.service';
// import { NotificationsService } from 'src/notifications/notifications.service';



// // !!!!!!!!!  ПРИМЕР !!!!!!!!


// @Injectable()
// export class NotificationConsumer implements OnModuleInit {
//   private consumer: Consumer;

//   constructor(
//     @Inject('KAFKA_SERVICE') private kafka: Kafka,
//     private notificationService: NotificationsService,
//   ) {
//     this.consumer = this.kafka.consumer({ groupId: 'notification-consumer' });
//   }

//   async onModuleInit() {
//     await this.consumer.connect();
//     await this.consumer.subscribe({ 
//       topics: ['admin-notifications'] 
//     });
//     await this.consumer.run({
//       eachMessage: async (payload: EachMessagePayload) => {
//         const message = JSON.parse(payload.message.value.toString());
        
//         // Сохранение уведомления в БД
//         await this.notificationService.create({
//           type: message.type,
//           content: message.content,
//           recipientRoles: ['admin', 'moderator'],
//           relatedEntityId: message.dealId,
//         });
//       },
//     });
//   }
// }