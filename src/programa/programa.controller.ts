import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ProgramaService } from './programa.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@Controller('programas')
export class ProgramaController {

  constructor(
    private readonly programaService: ProgramaService,
  ) {}

  // IMPORTANTE: rutas estáticas SIEMPRE antes de :id

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(
    @Body() createProgramaDto: CreateProgramaDto,
    @CurrentUser() user,
  ) {
    return this.programaService.create(createProgramaDto);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.programaService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.programaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateProgramaDto: UpdateProgramaDto,
    @CurrentUser() user,
  ) {
    return this.programaService.update(id, updateProgramaDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.programaService.remove(id);
  }
}