import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TipoPlagaService } from './tipo-plaga.service';
import { CreateTipoPlagaDto } from './dto/create-tipo-plaga.dto';
import { UpdateTipoPlagaDto } from './dto/update-tipo-plaga.dto';

@Controller('tipo-plaga')
export class TipoPlagaController {
  constructor(private readonly service: TipoPlagaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTipoPlagaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ⚠️ Ruta estática ANTES de la dinámica (:id)
  @Get('categoria/:categoria')
  findByCategoria(@Param('categoria') categoria: string) {
    return this.service.findByCategoria(categoria);
  }

  // ← Sin ParseIntPipe, id es string (UUID)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTipoPlagaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}