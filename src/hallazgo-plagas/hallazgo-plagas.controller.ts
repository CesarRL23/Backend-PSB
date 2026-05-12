import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // GET /hallazgo-plagas/registro/:registroId — todos los hallazgos de un registro
  @Get('registro/:registroId')
  findByRegistro(@Param('registroId', ParseIntPipe) registroId: number) {
    return this.service.findByRegistro(registroId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHallazgoPlagasDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
