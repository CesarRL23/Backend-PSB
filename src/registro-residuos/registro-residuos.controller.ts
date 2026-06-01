import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistroResiduosService } from './registro-residuos.service';
import { CreateRegistroResiduoDto } from './dto/create-registro-residuo.dto';
import { UpdateRegistroResiduoDto } from './dto/update-registro-residuo.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('registro-residuos')
export class RegistroResiduosController {
  constructor(private readonly registroResiduosService: RegistroResiduosService) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Get('recolecciones/all')
  findRecolecciones() {
    return this.registroResiduosService.findRecolecciones();
  }

  @Get('recolecciones/programa/:programaResiduoId')
  findRecoleccionesByPrograma(@Param('programaResiduoId') programaResiduoId: string) {
    return this.registroResiduosService.findRecoleccionesByPrograma(programaResiduoId);
  }

  @Post()
  create(@Body() createRegistroResiduoDto: CreateRegistroResiduoDto) {
    return this.registroResiduosService.create(createRegistroResiduoDto);
  }

  @Get()
  findAll() {
    return this.registroResiduosService.findAll();
  }

  @Get('por-programa/:programaResiduoId')
  findByProgramaResiduo(@Param('programaResiduoId') programaResiduoId: string) {
    return this.registroResiduosService.findByProgramaResiduo(+programaResiduoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registroResiduosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistroResiduoDto: UpdateRegistroResiduoDto) {
    return this.registroResiduosService.update(id, updateRegistroResiduoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registroResiduosService.remove(id);
  }
}
