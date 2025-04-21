// !!!!!!!!!  ПРИМЕР !!!!!!!!


export interface DealIdRequest {
  dealId: string;
}

export interface UserIdRequest {
  userId: string;
}

export interface CloseDealRequest {
  dealId: string;
  adminId: string;
}

export interface DisputeRequest {
  dealId: string;
  adminId: string;
  resolution: string;
  amount?: number;
}

export interface DealResponse {
  id: string;
  status: string;
  amount: number;
  participants: string[];
  // ... другие поля
}

export interface DealListResponse {
  deals: DealResponse[];
}