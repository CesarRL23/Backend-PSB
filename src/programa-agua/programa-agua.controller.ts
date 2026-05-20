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
import { ProgramaAguaService } from './programa-agua.service';
import { CreateProgramaAguaDto } from './dto/create-programa-agua.dto';
import { UpdateProgramaAguaDto } from './dto/update-programa-agua.dto';

@Controller('programa-agua')
export class ProgramaAguaController {

  constructor(
    private readonly programaAguaService: ProgramaAguaService,
  ) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(
    @Body() createProgramaAguaDto: CreateProgramaAguaDto,
    @CurrentUser() user,
  ) {
    return this.programaAguaService.create(createProgramaAguaDto);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.programaAguaService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.programaAguaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProgramaAguaDto: UpdateProgramaAguaDto,
    @CurrentUser() user,
  ) {
    return this.programaAguaService.update(id, updateProgramaAguaDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.programaAguaService.remove(id);
  }
}