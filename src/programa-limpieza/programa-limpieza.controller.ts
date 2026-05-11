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
import { ProgramaLimpiezaService } from './programa-limpieza.service';
import { CreateProgramaLimpiezaDto } from './dto/create-programa-limpieza.dto';
import { UpdateProgramaLimpiezaDto } from './dto/update-programa-limpieza.dto';

@Controller('programas-limpieza')
@UseGuards(JwtAuthGuard)
export class ProgramaLimpiezaController {

  constructor(
    private readonly programaLimpiezaService: ProgramaLimpiezaService,
  ) {}

  @Post()
  create(@Body() dto: CreateProgramaLimpiezaDto) {
    return this.programaLimpiezaService.create(dto);
  }

  @Get()
  findAll() {
    return this.programaLimpiezaService.findAll();
  }

  // Ruta estática antes de :id
  @Get('por-programa/:programaId')
  findByProgramaId(@Param('programaId', ParseUUIDPipe) programaId: string) {
    return this.programaLimpiezaService.findByProgramaId(programaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.programaLimpiezaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProgramaLimpiezaDto,
  ) {
    return this.programaLimpiezaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.programaLimpiezaService.remove(id);
  }
}
