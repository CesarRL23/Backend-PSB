import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { VerificacionLimpiezaService } from './verificacion-limpieza.service';
import { CreateVerificacionLimpiezaDto } from './dto/create-verificacion-limpieza.dto';
import { UpdateVerificacionLimpiezaDto } from './dto/update-verificacion-limpieza.dto';

@Controller('verificaciones-limpieza')
export class VerificacionLimpiezaController {

  constructor(
    private readonly verificacionLimpiezaService: VerificacionLimpiezaService,
  ) {}

  @Post()
  create(@Body() dto: CreateVerificacionLimpiezaDto) {
    return this.verificacionLimpiezaService.create(dto);
  }

  // Ruta estática antes de :id
  @Get('por-registro-limpieza/:registroLimpiezaId')
  findByRegistroLimpieza(
    @Param('registroLimpiezaId', ParseUUIDPipe) registroLimpiezaId: string,
  ) {
    return this.verificacionLimpiezaService.findByRegistroLimpieza(registroLimpiezaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.verificacionLimpiezaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateVerificacionLimpiezaDto,
  ) {
    return this.verificacionLimpiezaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.verificacionLimpiezaService.remove(id);
  }
}
