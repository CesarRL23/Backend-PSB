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
import { ControlDiarioPotabilidadService } from './control-diario-potabilidad.service';
import { CreateControlDiarioPotabilidadDto } from './dto/create-control-diario-potabilidad.dto';
import { UpdateControlDiarioPotabilidadDto } from './dto/update-control-diario-potabilidad.dto';

@Controller('control-diario-potabilidad')
@UseGuards(JwtAuthGuard)
export class ControlDiarioPotabilidadController {

  constructor(
    private readonly controlService: ControlDiarioPotabilidadService,
  ) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(
    @Body() createDto: CreateControlDiarioPotabilidadDto,
    @CurrentUser() user,
  ) {
    return this.controlService.create(createDto);
  }

  @Get()
  findAll(
    @Query('fuenteAguaId') fuenteAguaId: string,
    @CurrentUser() user,
  ) {
    if (fuenteAguaId) {
      return this.controlService.findByFuente(fuenteAguaId);
    }
    return this.controlService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.controlService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateControlDiarioPotabilidadDto,
    @CurrentUser() user,
  ) {
    return this.controlService.update(id, updateDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.controlService.remove(id);
  }
}