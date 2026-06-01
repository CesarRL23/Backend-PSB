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

import { RegistroLimpiezaService } from './registro-limpieza.service';
import { CreateRegistroLimpiezaDto } from './dto/create-registro-limpieza.dto';
import { UpdateRegistroLimpiezaDto } from './dto/update-registro-limpieza.dto';

@Controller('registros-limpieza')
export class RegistroLimpiezaController {

  constructor(
    private readonly registroLimpiezaService: RegistroLimpiezaService,
  ) {}

  @Post()
  create(@Body() dto: CreateRegistroLimpiezaDto) {
    return this.registroLimpiezaService.create(dto);
  }

  @Get()
  findAll() {
    return this.registroLimpiezaService.findAll();
  }

  // Rutas estáticas antes de :id
  @Get('por-registro/:registroId')
  findByRegistro(@Param('registroId', ParseUUIDPipe) registroId: string) {
    return this.registroLimpiezaService.findByRegistro(registroId);
  }

  @Get('por-programa/:programaId')
  findByPrograma(@Param('programaId', ParseUUIDPipe) programaId: string) {
    return this.registroLimpiezaService.findByPrograma(programaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.registroLimpiezaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRegistroLimpiezaDto,
  ) {
    return this.registroLimpiezaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.registroLimpiezaService.remove(id);
  }
}
