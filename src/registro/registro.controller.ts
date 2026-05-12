import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';

@Controller('registros')
@UseGuards(JwtAuthGuard)
export class RegistroController {

  constructor(
    private readonly registroService: RegistroService,
  ) {}

  // IMPORTANTE: rutas estáticas SIEMPRE antes de :id

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(
    @Body() createRegistroDto: CreateRegistroDto,
    @CurrentUser() user,
  ) {
    return this.registroService.create(createRegistroDto);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.registroService.findAll();
  }

  @Patch(':id/completar')
  completar(
    @Param('id', ParseIntPipe) id: string,
    @Body('observaciones') observaciones: string,
    @CurrentUser() user,
  ) {
    return this.registroService.completar(id, observaciones);
  }

  @Patch(':id/rechazar')
  rechazar(
    @Param('id', ParseIntPipe) id: string,
    @Body('motivo') motivo: string,
    @CurrentUser() user,
  ) {
    return this.registroService.rechazar(id, motivo);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.registroService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateRegistroDto: UpdateRegistroDto,
    @CurrentUser() user,
  ) {
    return this.registroService.update(id, updateRegistroDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.registroService.remove(id);
  }
}