import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ProgramaPlagasService } from './programa-plagas.service';
import { CreateProgramaPlagasDto } from './dto/create-programa-plagas.dto';
import { UpdateProgramaPlagasDto } from './dto/update-programa-plagas.dto';

@Controller('programa-plagas')
export class ProgramaPlagasController {
  constructor(private readonly service: ProgramaPlagasService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateProgramaPlagasDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
  
  @Get(':id/estadisticas')
  estadisticas(@Param('id', ParseIntPipe) id: number) {
    return this.service.obtenerEstadisticas(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProgramaPlagasDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
