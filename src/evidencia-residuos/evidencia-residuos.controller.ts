import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvidenciaResiduosService } from './evidencia-residuos.service';
import { CreateEvidenciaResiduoDto } from './dto/create-evidencia-residuo.dto';
import { UpdateEvidenciaResiduoDto } from './dto/update-evidencia-residuo.dto';

@Controller('evidencia-residuos')
export class EvidenciaResiduosController {
  constructor(private readonly evidenciaResiduosService: EvidenciaResiduosService) {}

  @Post()
  create(@Body() createEvidenciaResiduoDto: CreateEvidenciaResiduoDto) {
    return this.evidenciaResiduosService.create(createEvidenciaResiduoDto);
  }

  @Get()
  findAll() {
    return this.evidenciaResiduosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evidenciaResiduosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvidenciaResiduoDto: UpdateEvidenciaResiduoDto) {
    return this.evidenciaResiduosService.update(+id, updateEvidenciaResiduoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evidenciaResiduosService.remove(+id);
  }
}
