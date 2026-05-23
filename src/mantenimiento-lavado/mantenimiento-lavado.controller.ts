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
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { MantenimientoLavadoService } from './mantenimiento-lavado.service';
import { CreateMantenimientoLavadoDto } from './dto/create-mantenimiento-lavado.dto';
import { UpdateMantenimientoLavadoDto } from './dto/update-mantenimiento-lavado.dto';

@Controller('mantenimiento-lavado')
@UseGuards(JwtAuthGuard)
export class MantenimientoLavadoController {

  constructor(
    private readonly mantenimientoService: MantenimientoLavadoService,
  ) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(
    @Body() createDto: CreateMantenimientoLavadoDto,
    @CurrentUser() user,
  ) {
    return this.mantenimientoService.create(createDto, user.id);
  }

  @Get()
  findAll(
    @Query('fuenteAguaId') fuenteAguaId: string,
    @CurrentUser() user,
  ) {
    if (fuenteAguaId) {
      return this.mantenimientoService.findByFuente(fuenteAguaId);
    }
    return this.mantenimientoService.findAll();
  }

  @Patch(':id/completar')
  completar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('observaciones') observaciones: string,
    @CurrentUser() user,
  ) {
    return this.mantenimientoService.completar(id, observaciones);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.mantenimientoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateMantenimientoLavadoDto,
    @CurrentUser() user,
  ) {
    return this.mantenimientoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.mantenimientoService.remove(id);
  }
}
