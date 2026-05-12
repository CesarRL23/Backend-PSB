import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // GET /area-plagas/programa/:programaId
  @Get('programa/:programaId')
  findByPrograma(@Param('programaId', ParseIntPipe) programaId: number) {
    return this.service.findByPrograma(programaId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAreaPlagasDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
