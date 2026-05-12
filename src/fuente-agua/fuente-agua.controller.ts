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
import { FuenteAguaService } from './fuente-agua.service';
import { CreateFuenteAguaDto } from './dto/create-fuente-agua.dto';
import { UpdateFuenteAguaDto } from './dto/update-fuente-agua.dto';

@Controller('fuente-agua')
@UseGuards(JwtAuthGuard)
export class FuenteAguaController {

  constructor(
    private readonly fuenteAguaService: FuenteAguaService,
  ) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(
    @Body() createFuenteAguaDto: CreateFuenteAguaDto,
    @CurrentUser() user,
  ) {
    return this.fuenteAguaService.create(createFuenteAguaDto);
  }

  @Get()
  findAll(
    @Query('programaAguaId') programaAguaId: string,
    @CurrentUser() user,
  ) {
    if (programaAguaId) {
      return this.fuenteAguaService.findByProgramaAgua(programaAguaId);
    }
    return this.fuenteAguaService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.fuenteAguaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFuenteAguaDto: UpdateFuenteAguaDto,
    @CurrentUser() user,
  ) {
    return this.fuenteAguaService.update(id, updateFuenteAguaDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.fuenteAguaService.remove(id);
  }
}