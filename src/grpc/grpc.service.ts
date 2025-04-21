import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
// import { 
//   DealIdRequest,
//   DealResponse,
//   DealListResponse,
//   UserIdRequest,
//   CloseDealRequest,
//   DisputeRequest,
// } from './interfaces/deal.interface';

import {
    DealIdRequest,
    DealResponse,
    DealListResponse,
    UserIdRequest,
    CloseDealRequest,
    DisputeRequest,
} from './interfaces/deal.interface';




// !!!!!!!!!  ПРИМЕР !!!!!!!!



interface DealService {
  getDeal(data: DealIdRequest): Observable<DealResponse>;
  getUserDeals(data: UserIdRequest): Observable<DealListResponse>;
  closeDeal(data: CloseDealRequest): Observable<DealResponse>;
  resolveDispute(data: DisputeRequest): Observable<DealResponse>;
}

@Injectable()
export class GrpcService {
  private dealService: DealService;

  constructor(@Inject('DEAL_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.dealService = this.client.getService<DealService>('DealService');
  }

  // Методы для работы со сделками
  getDeal(dealId: string) {
    return this.dealService.getDeal({ dealId });
  }

  getUserDeals(userId: string) {
    return this.dealService.getUserDeals({ userId });
  }

  closeDeal(dealId: string, adminId: string) {
    return this.dealService.closeDeal({ dealId, adminId });
  }
}