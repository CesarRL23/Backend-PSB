import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // GET /evidencia-plagas/registro/:registroId
  @Get('registro/:registroId')
  findByRegistro(@Param('registroId', ParseIntPipe) registroId: number) {
    return this.service.findByRegistro(registroId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEvidenciaPlagasDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
