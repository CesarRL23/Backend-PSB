import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AccionCorrectivaPlagasService } from './accion-correctiva-plagas.service';
import { CreateAccionCorrectivaPlagasDto } from './dto/create-accion-correctiva-plagas.dto';
import { UpdateAccionCorrectivaPlagasDto } from './dto/update-accion-correctiva-plagas.dto';

@Controller('accion-correctiva-plagas')
export class AccionCorrectivaPlagasController {
  constructor(private readonly service: AccionCorrectivaPlagasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateAccionCorrectivaPlagasDto) {
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

  // GET /accion-correctiva-plagas/hallazgo/:hallazgoId
  @Get('hallazgo/:hallazgoId')
  findByHallazgo(@Param('hallazgoId', ParseIntPipe) hallazgoId: number) {
    return this.service.findByHallazgo(hallazgoId);
  }

  // PATCH /accion-correctiva-plagas/:id/cerrar
  @Patch(':id/cerrar')
  cerrar(@Param('id', ParseIntPipe) id: number) {
    return this.service.cerrar(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAccionCorrectivaPlagasDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
