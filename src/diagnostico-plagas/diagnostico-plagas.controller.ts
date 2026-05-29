import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { DiagnosticoPlagasService } from './diagnostico-plagas.service';
import { CreateDiagnosticoPlagasDto } from './dto/create-diagnostico-plagas.dto';
import { UpdateDiagnosticoPlagasDto } from './dto/update-diagnostico-plagas.dto';

@Controller('diagnostico-plagas')
export class DiagnosticoPlagasController {
  constructor(private readonly service: DiagnosticoPlagasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateDiagnosticoPlagasDto) {
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

  // GET /diagnostico-plagas/programa/:programaId
  @Get('programa/:programaId')
  findByPrograma(@Param('programaId', ParseIntPipe) programaId: number) {
    return this.service.findByPrograma(programaId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDiagnosticoPlagasDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
