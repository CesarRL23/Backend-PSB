import { Controller, Get, Post, Body, Patch, Param,
         Delete, HttpCode, HttpStatus } from '@nestjs/common';
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

  // ⚠️ Rutas estáticas ANTES de las dinámicas
  @Get('hallazgo/:hallazgoId')
  findByHallazgo(@Param('hallazgoId') hallazgoId: string) {
    console.log('hallazgoId recibido:', hallazgoId); 
    return this.service.findByHallazgo(hallazgoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/cerrar')
  cerrar(@Param('id') id: string) {
    return this.service.cerrar(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAccionCorrectivaPlagasDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}