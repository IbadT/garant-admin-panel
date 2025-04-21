import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisputesService } from './disputes.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';

export class InputCommentsForAnalysisDto {
  test: string
}

@Controller('disputes')
export class DisputesController {
  constructor(
    private readonly disputesService: DisputesService
  ) {}

  // GET /admin/disputes → Просмотр всех споров.
  @Get()
  async getAllDisputes() {

  };

  // POST /admin/disputes/:id/comment → Ввод комментариев для разбора.
  @Post("/:id/comment")
  async inputCommentsForAnalysis(@Body() body: InputCommentsForAnalysisDto) {

  }

  // PATCH /admin/disputes/:id/resolve → Закрытие спора (перевод средств).
  @Patch("/:id/resolve")
  async resolveDisputeById(@Param("id") id: string) {

  }
}
