import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // GET /tipo-plaga/categoria/:categoria
  @Get('categoria/:categoria')
  findByCategoria(@Param('categoria') categoria: string) {
    return this.service.findByCategoria(categoria);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTipoPlagaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
