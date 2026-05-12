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
import { PasoLimpiezaService } from './paso-limpieza.service';
import { CreatePasoLimpiezaDto } from './dto/create-paso-limpieza.dto';
import { UpdatePasoLimpiezaDto } from './dto/update-paso-limpieza.dto';

@Controller('pasos-limpieza')
@UseGuards(JwtAuthGuard)
export class PasoLimpiezaController {

  constructor(
    private readonly pasoLimpiezaService: PasoLimpiezaService,
  ) {}

  @Post()
  create(@Body() dto: CreatePasoLimpiezaDto) {
    return this.pasoLimpiezaService.create(dto);
  }

  @Get()
  findAll() {
    return this.pasoLimpiezaService.findAll();
  }

  // Ruta estática antes de :id
  @Get('por-programa-limpieza/:programaLimpiezaId')
  findByProgramaLimpieza(
    @Param('programaLimpiezaId', ParseUUIDPipe) programaLimpiezaId: string,
  ) {
    return this.pasoLimpiezaService.findByProgramaLimpieza(programaLimpiezaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pasoLimpiezaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasoLimpiezaDto,
  ) {
    return this.pasoLimpiezaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pasoLimpiezaService.remove(id);
  }
}
