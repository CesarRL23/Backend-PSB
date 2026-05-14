import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EquipoAreaService } from './equipo-area.service';
import { CreateEquipoAreaDto } from './dto/create-equipo-area.dto';
import { UpdateEquipoAreaDto } from './dto/update-equipo-area.dto';

@UseGuards(JwtAuthGuard)
@Controller('equipos-area')
export class EquipoAreaController {

  constructor(private readonly service: EquipoAreaService) {}

  @Post()
  create(@Body() dto: CreateEquipoAreaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('por-empresa/:empresaId')
  findByEmpresa(@Param('empresaId', ParseUUIDPipe) empresaId: string) {
    return this.service.findByEmpresa(empresaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEquipoAreaDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
