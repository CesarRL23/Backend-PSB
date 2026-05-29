import { Controller, Get, Post, Body, Patch, Param,
         Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AreaPlagasService } from './area-plagas.service';
import { CreateAreaPlagasDto } from './dto/create-area-plagas.dto';
import { UpdateAreaPlagasDto } from './dto/update-area-plagas.dto';
 
@Controller('area-plagas')
export class AreaPlagasController {
  constructor(private readonly service: AreaPlagasService) {}
 
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateAreaPlagasDto) {
    return this.service.create(dto);
  }
 
  @Get()
  findAll() {
    return this.service.findAll();
  }
 
  // ⚠️ Ruta estática ANTES de la dinámica (:id)
  @Get('programa/:programaId')
  findByPrograma(@Param('programaId') programaId: string) {
    return this.service.findByPrograma(programaId);
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
 
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAreaPlagasDto) {
    return this.service.update(id, dto);
  }
 
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
 