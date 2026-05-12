import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // GET /plaguicida/programa/:programaId
  @Get('programa/:programaId')
  findByPrograma(@Param('programaId', ParseIntPipe) programaId: number) {
    return this.service.findByPrograma(programaId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlaguicidaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
