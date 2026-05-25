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
import { InsumoQuimicoService } from './insumo-quimico.service';
import { CreateInsumoQuimicoDto } from './dto/create-insumo-quimico.dto';
import { UpdateInsumoQuimicoDto } from './dto/update-insumo-quimico.dto';

@Controller('insumo-quimico')
export class InsumoQuimicoController {

  constructor(
    private readonly insumoService: InsumoQuimicoService,
  ) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Get('vencidos')
  findVencidos(@CurrentUser() user) {
    return this.insumoService.findVencidos();
  }

  @Post()
  create(
    @Body() createDto: CreateInsumoQuimicoDto,
    @CurrentUser() user,
  ) {
    return this.insumoService.create(createDto);
  }

  @Get()
  findAll(
    @Query('mantenimientoId') mantenimientoId: string,
    @CurrentUser() user,
  ) {
    if (mantenimientoId) {
      return this.insumoService.findByMantenimiento(mantenimientoId);
    }
    return this.insumoService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.insumoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateInsumoQuimicoDto,
    @CurrentUser() user,
  ) {
    return this.insumoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.insumoService.remove(id);
  }
}