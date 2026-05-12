import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AccionCorrectivaAguaService } from './accion-correctiva-agua.service';
import { CreateAccionCorrectivaAguaDto } from './dto/create-accion-correctiva-agua.dto';
import { UpdateAccionCorrectivaAguaDto } from './dto/update-accion-correctiva-agua.dto';

@Controller('acciones-correctivas-agua')
export class AccionCorrectivaAguaController {
  constructor(
    private readonly accionCorrectivaAguaService: AccionCorrectivaAguaService,
  ) {}

  // ─── Crear ─────────────────────────────────────────────────────

  @Post()
  create(@Body() dto: CreateAccionCorrectivaAguaDto) {
    return this.accionCorrectivaAguaService.create(dto);
  }

  // ─── Listar todas ──────────────────────────────────────────────

  @Get()
  findAll() {
    return this.accionCorrectivaAguaService.findAll();
  }

  // ─── Listar pendientes ─────────────────────────────────────────

  @Get('pendientes')
  findPendientes() {
    return this.accionCorrectivaAguaService.findPendientes();
  }

  // ─── Listar por registro agua ─────────────────────────────────

  @Get('registro/:registroAguaId')
  findByRegistroAgua(
    @Param('registroAguaId') registroAguaId: string,
  ) {
    return this.accionCorrectivaAguaService.findByRegistroAgua(
      registroAguaId,
    );
  }

  // ─── Buscar una ────────────────────────────────────────────────

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accionCorrectivaAguaService.findOne(id);
  }

  // ─── Actualizar ────────────────────────────────────────────────

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAccionCorrectivaAguaDto,
  ) {
    return this.accionCorrectivaAguaService.update(id, dto);
  }

  // ─── Completar acción ──────────────────────────────────────────

  @Patch(':id/completar')
  completar(
    @Param('id') id: string,
    @Body('resultadoVerificacion') resultadoVerificacion: string,
  ) {
    return this.accionCorrectivaAguaService.completar(
      id,
      resultadoVerificacion,
    );
  }

  // ─── Eliminar ──────────────────────────────────────────────────

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accionCorrectivaAguaService.remove(id);
  }
}