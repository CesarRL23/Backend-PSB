import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { TrampaService } from './trampa.service';
import { CreateTrampaDto } from './dto/create-trampa.dto';
import { UpdateTrampaDto } from './dto/update-trampa.dto';

@Controller('trampa')
export class TrampaController {
  constructor(private readonly service: TrampaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTrampaDto) {
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

  // GET /trampa/area/:areaId — todas las trampas de un área
  @Get('area/:areaId')
  findByArea(@Param('areaId', ParseIntPipe) areaId: number) {
    return this.service.findByArea(areaId);
  }

  // PATCH /trampa/:id/activar
  @Patch(':id/activar')
  activar(@Param('id', ParseIntPipe) id: number) {
    return this.service.activar(id);
  }

  // PATCH /trampa/:id/desactivar
  @Patch(':id/desactivar')
  desactivar(@Param('id', ParseIntPipe) id: number) {
    return this.service.desactivar(id);
  }

  // PATCH /trampa/:id/revision
  @Patch(':id/revision')
  registrarRevision(@Param('id', ParseIntPipe) id: number) {
    return this.service.registrarRevision(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTrampaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
