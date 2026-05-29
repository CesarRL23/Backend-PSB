import { Controller, Get, Post, Body, Patch, Param,
         Delete, HttpCode, HttpStatus } from '@nestjs/common';
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
 
  // ⚠️ Rutas estáticas ANTES de las dinámicas (:id)
  @Get('area/:areaId')
  findByArea(@Param('areaId') areaId: string) {
    return this.service.findByArea(areaId);
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
 
  @Patch(':id/activar')
  activar(@Param('id') id: string) {
    return this.service.activar(id);
  }
 
  @Patch(':id/desactivar')
  desactivar(@Param('id') id: string) {
    return this.service.desactivar(id);
  }
 
  @Patch(':id/revision')
  registrarRevision(@Param('id') id: string) {
    return this.service.registrarRevision(id);
  }
 
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrampaDto) {
    return this.service.update(id, dto);
  }
 
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
 