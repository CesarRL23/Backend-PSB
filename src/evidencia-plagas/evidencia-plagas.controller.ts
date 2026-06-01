import { Controller, Get, Post, Body, Patch, Param,
         Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { EvidenciaPlagasService } from './evidencia-plagas.service';
import { CreateEvidenciaPlagasDto } from './dto/create-evidencia-plagas.dto';
import { UpdateEvidenciaPlagasDto } from './dto/update-evidencia-plagas.dto';

@Controller('evidencia-plagas')
export class EvidenciaPlagasController {
  constructor(private readonly service: EvidenciaPlagasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateEvidenciaPlagasDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ⚠️ Ruta estática ANTES de la dinámica (:id)
  @Get('registro/:registroId')
  findByRegistro(@Param('registroId') registroId: string) {
    return this.service.findByRegistro(registroId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEvidenciaPlagasDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}