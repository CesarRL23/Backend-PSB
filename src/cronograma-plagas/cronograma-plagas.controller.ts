import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CronogramaPlagasService } from './cronograma-plagas.service';
import { CreateCronogramaPlagasDto } from './dto/create-cronograma-plagas.dto';
import { UpdateCronogramaPlagasDto } from './dto/update-cronograma-plagas.dto';

@Controller('cronograma-plagas')
export class CronogramaPlagasController {
  constructor(private readonly service: CronogramaPlagasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCronogramaPlagasDto) {
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

  // GET /cronograma-plagas/programa/:programaId
  @Get('programa/:programaId')
  findByPrograma(@Param('programaId', ParseIntPipe) programaId: number) {
    return this.service.findByPrograma(programaId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCronogramaPlagasDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
