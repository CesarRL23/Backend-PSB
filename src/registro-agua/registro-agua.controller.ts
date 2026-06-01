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
import { RegistroAguaService } from './registro-agua.service';
import { CreateRegistroAguaDto } from './dto/create-registro-agua.dto';
import { UpdateRegistroAguaDto } from './dto/update-registro-agua.dto';

@Controller('registro-agua')
export class RegistroAguaController {

  constructor(
    private readonly registroAguaService: RegistroAguaService,
  ) {}

  // Rutas estáticas SIEMPRE antes de :id
  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(
    @Body() createDto: CreateRegistroAguaDto,
    @CurrentUser() user,
  ) {
    return this.registroAguaService.create(createDto);
  }

  @Get()
  findAll(
    @Query('programaAguaId') programaAguaId: string,
    @CurrentUser() user,
  ) {
    if (programaAguaId) {
      return this.registroAguaService.findByProgramaAgua(programaAguaId);
    }
    return this.registroAguaService.findAll();
  }

  @Patch(':id/conforme')
  marcarConforme(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.registroAguaService.marcarConforme(id);
  }

  @Patch(':id/no-conforme')
  marcarNoConforme(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.registroAguaService.marcarNoConforme(id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.registroAguaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateRegistroAguaDto,
    @CurrentUser() user,
  ) {
    return this.registroAguaService.update(id, updateDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.registroAguaService.remove(id);
  }
}