import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AccionCorrectivaAguaService } from './accion-correctiva-agua.service';
import { CreateAccionCorrectivaAguaDto } from './dto/create-accion-correctiva-agua.dto';
import { UpdateAccionCorrectivaAguaDto } from './dto/update-accion-correctiva-agua.dto';

@Controller('acciones-correctivas-agua')
export class AccionCorrectivaAguaController {
  constructor(
    private readonly accionCorrectivaAguaService: AccionCorrectivaAguaService,
  ) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(
    @Body() dto: CreateAccionCorrectivaAguaDto,
    @CurrentUser() user,
  ) {
    return this.accionCorrectivaAguaService.create(dto, user.id);
  }

  @Get()
  findAll() {
    return this.accionCorrectivaAguaService.findAll();
  }

  @Get('pendientes')
  findPendientes() {
    return this.accionCorrectivaAguaService.findPendientes();
  }

  @Get('registro/:registroAguaId')
  findByRegistroAgua(
    @Param('registroAguaId', ParseUUIDPipe) registroAguaId: string,
  ) {
    return this.accionCorrectivaAguaService.findByRegistroAgua(
      registroAguaId,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.accionCorrectivaAguaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAccionCorrectivaAguaDto,
  ) {
    return this.accionCorrectivaAguaService.update(id, dto);
  }

  @Patch(':id/completar')
  completar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('resultadoVerificacion') resultadoVerificacion: string,
  ) {
    return this.accionCorrectivaAguaService.completar(
      id,
      resultadoVerificacion,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.accionCorrectivaAguaService.remove(id);
  }
}
