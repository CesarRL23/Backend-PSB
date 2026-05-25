import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AnalisisLaboratorioService } from './analisis-laboratorio.service';
import { CreateAnalisisLaboratorioDto } from './dto/create-analisis-laboratorio.dto';
import { UpdateAnalisisLaboratorioDto } from './dto/update-analisis-laboratorio.dto';

@Controller('analisis-laboratorio')
export class AnalisisLaboratorioController {

  constructor(
    private readonly analisisService: AnalisisLaboratorioService,
  ) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(
    @Body() createDto: CreateAnalisisLaboratorioDto,
    @CurrentUser() user,
  ) {
    return this.analisisService.create(createDto, user.id);
  }

  @Get()
  findAll(
    @Query('fuenteAguaId') fuenteAguaId: string,
  ) {
    if (fuenteAguaId)
      return this.analisisService.findByFuente(fuenteAguaId);
    return this.analisisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.analisisService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateAnalisisLaboratorioDto,
  ) {
    return this.analisisService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.analisisService.remove(id);
  }
}
