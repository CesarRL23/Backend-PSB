import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { EmpresaFumigadoraService } from './empresa-fumigadora.service';
import { CreateEmpresaFumigadoraDto } from './dto/create-empresa-fumigadora.dto';
import { UpdateEmpresaFumigadoraDto } from './dto/update-empresa-fumigadora.dto';

@Controller('empresa-fumigadora')
export class EmpresaFumigadoraController {
  constructor(private readonly service: EmpresaFumigadoraService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateEmpresaFumigadoraDto) {
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

  // GET /empresa-fumigadora/programa/:programaId
  @Get('programa/:programaId')
  findByPrograma(@Param('programaId', ParseIntPipe) programaId: number) {
    return this.service.findByPrograma(programaId);
  }

  // GET /empresa-fumigadora/:id/certificado-vigente
  @Get(':id/certificado-vigente')
  certificadoVigente(@Param('id', ParseIntPipe) id: number) {
    return this.service.certificadoVigente(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEmpresaFumigadoraDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
