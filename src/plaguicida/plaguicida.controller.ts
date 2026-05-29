import { Controller, Get, Post, Body, Patch, Param,
         Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PlaguicidaService } from './plaguicida.service';
import { CreatePlaguicidaDto } from './dto/create-plaguicida.dto';
import { UpdatePlaguicidaDto } from './dto/update-plaguicida.dto';
 
@Controller('plaguicida')
export class PlaguicidaController {
  constructor(private readonly service: PlaguicidaService) {}
 
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePlaguicidaDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdatePlaguicidaDto) {
    return this.service.update(id, dto);
  }
 
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
 