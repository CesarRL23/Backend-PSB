import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChecklistLimpiezaService } from './checklist-limpieza.service';
import { CreateChecklistLimpiezaDto } from './dto/create-checklist-limpieza.dto';
import { UpdateChecklistLimpiezaDto } from './dto/update-checklist-limpieza.dto';

@Controller('checklist-limpieza')
@UseGuards(JwtAuthGuard)
export class ChecklistLimpiezaController {

  constructor(
    private readonly checklistLimpiezaService: ChecklistLimpiezaService,
  ) {}

  @Post()
  create(@Body() dto: CreateChecklistLimpiezaDto) {
    return this.checklistLimpiezaService.create(dto);
  }

  // Ruta estática antes de :id
  @Get('por-registro-limpieza/:registroLimpiezaId')
  findByRegistroLimpieza(
    @Param('registroLimpiezaId', ParseUUIDPipe) registroLimpiezaId: string,
  ) {
    return this.checklistLimpiezaService.findByRegistroLimpieza(registroLimpiezaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.checklistLimpiezaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateChecklistLimpiezaDto,
  ) {
    return this.checklistLimpiezaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.checklistLimpiezaService.remove(id);
  }
}
