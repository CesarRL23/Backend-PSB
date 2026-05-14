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
import { MedicionPasoService } from './medicion-paso.service';
import { CreateMedicionPasoDto } from './dto/create-medicion-paso.dto';
import { UpdateMedicionPasoDto } from './dto/update-medicion-paso.dto';

@Controller('mediciones-paso')
@UseGuards(JwtAuthGuard)
export class MedicionPasoController {

  constructor(private readonly medicionPasoService: MedicionPasoService) {}

  @Post()
  create(@Body() dto: CreateMedicionPasoDto) {
    return this.medicionPasoService.create(dto);
  }

  // Ruta estática antes de :id
  @Get('por-checklist/:checklistLimpiezaId')
  findByChecklist(
    @Param('checklistLimpiezaId', ParseUUIDPipe) checklistLimpiezaId: string,
  ) {
    return this.medicionPasoService.findByChecklist(checklistLimpiezaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicionPasoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMedicionPasoDto,
  ) {
    return this.medicionPasoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicionPasoService.remove(id);
  }
}
