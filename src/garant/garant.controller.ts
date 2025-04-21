import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GarantService } from './garant.service';
import { CreateGarantDto } from './dto/create-garant.dto';
import { UpdateGarantDto } from './dto/update-garant.dto';

@Controller()
export class GarantController {
  constructor(private readonly garantService: GarantService) {}

  @MessagePattern('createGarant')
  create(@Payload() createGarantDto: CreateGarantDto) {
    return this.garantService.create(createGarantDto);
  }

  @MessagePattern('findAllGarant')
  findAll() {
    return this.garantService.findAll();
  }

  @MessagePattern('findOneGarant')
  findOne(@Payload() id: number) {
    return this.garantService.findOne(id);
  }

  @MessagePattern('updateGarant')
  update(@Payload() updateGarantDto: UpdateGarantDto) {
    return this.garantService.update(updateGarantDto.id, updateGarantDto);
  }

  @MessagePattern('removeGarant')
  remove(@Payload() id: number) {
    return this.garantService.remove(id);
  }
}
