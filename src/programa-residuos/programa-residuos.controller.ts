import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramaResiduosService } from './programa-residuos.service';
import { CreateProgramaResiduoDto } from './dto/create-programa-residuo.dto';
import { UpdateProgramaResiduoDto } from './dto/update-programa-residuo.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('programa-residuos')
export class ProgramaResiduosController {
  constructor(private readonly programaResiduosService: ProgramaResiduosService) {}

  @Post()
  create(@Body() createProgramaResiduoDto: CreateProgramaResiduoDto) {
    return this.programaResiduosService.create(createProgramaResiduoDto);
  }

  @Get()
  findAll() {
    return this.programaResiduosService.findAll();
  }

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programaResiduosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramaResiduoDto: UpdateProgramaResiduoDto) {
    return this.programaResiduosService.update(+id, updateProgramaResiduoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programaResiduosService.remove(+id);
  }
}