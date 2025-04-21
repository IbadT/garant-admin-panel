import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private logger = new Logger(TransactionsController.name),
    private readonly transactionsService: TransactionsService
  ) {}

  // GET /admin/transactions → Получить все сделки.
  @Get()
  async getAllTransactions() {

  };

  // GET /admin/transactions/:userId → Сделки конкретного пользователя.
  @Get("/:user_id")
  async getTransactionsByUserId(@Param("user_id") user_id: string) {

  };

  // GET /admin/transaction/:id → Детали одной сделки.
  @Get("/:id")
  async getTransactionById(@Param("id") id: string) {

  }


  //   PATCH /admin/transaction/:id/cancel → Отмена сделки.
  @Patch("/:id/cancel")
  async canselTransactionById(@Param("id") id: string) {

  }

// 📌 PATCH /admin/transaction/:id/complete → Закрытие успешной сделки.
  @Patch("/:id/conplete")
  async completeTransactionById(@Param("id") id: string) {

  }

}
