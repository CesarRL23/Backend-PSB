import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PasoLimpiezaPqService } from './paso-limpieza-pq.service';
import { CreatePasoLimpiezaPqDto } from './dto/create-paso-limpieza-pq.dto';
import { UpdatePasoLimpiezaPqDto } from './dto/update-paso-limpieza-pq.dto';

@Controller('pasos-limpieza-pq')
@UseGuards(JwtAuthGuard)
export class PasoLimpiezaPqController {

  constructor(
    private readonly pasoLimpiezaPqService: PasoLimpiezaPqService,
  ) {}

  @Post()
  create(@Body() dto: CreatePasoLimpiezaPqDto) {
    return this.pasoLimpiezaPqService.create(dto);
  }

  // Ruta estática antes de :id
  @Get('por-paso/:pasoLimpiezaId')
  findByPasoLimpieza(
    @Param('pasoLimpiezaId', ParseUUIDPipe) pasoLimpiezaId: string,
  ) {
    return this.pasoLimpiezaPqService.findByPasoLimpieza(pasoLimpiezaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pasoLimpiezaPqService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasoLimpiezaPqDto,
  ) {
    return this.pasoLimpiezaPqService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pasoLimpiezaPqService.remove(id);
  }
}
