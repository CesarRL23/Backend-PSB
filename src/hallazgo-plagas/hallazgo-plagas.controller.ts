import {
  Controller, Get, Post, Body, Patch, Param,
  Delete, HttpCode, HttpStatus, ParseUUIDPipe
} from '@nestjs/common';
import { HallazgoPlagasService } from './hallazgo-plagas.service';
import { CreateHallazgoPlagasDto } from './dto/create-hallazgo-plagas.dto';
import { UpdateHallazgoPlagasDto } from './dto/update-hallazgo-plagas.dto';
 
@Controller('hallazgo-plagas')
export class HallazgoPlagasController {
  constructor(private readonly service: HallazgoPlagasService) {}
 
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateHallazgoPlagasDto) {
    return this.service.create(dto);
  }
 
  @Get()
  findAll() {
    return this.service.findAll();
  }
 
  // ⚠️ Rutas estáticas SIEMPRE antes de las dinámicas (:id)
  // Si esta ruta va después de @Get(':id'), NestJS interpreta
  // 'registro' como un :id y nunca llega aquí → 404
  @Get('registro/:registroId')
  findByRegistro(@Param('registroId') registroId: string) {
    return this.service.findByRegistro(registroId);
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
 
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHallazgoPlagasDto) {
    return this.service.update(id, dto);
  }
 
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}