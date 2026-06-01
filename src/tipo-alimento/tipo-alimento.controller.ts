import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoAlimentoService } from './tipo-alimento.service';
import { CreateTipoAlimentoDto } from './dto/create-tipo-alimento.dto';
import { UpdateTipoAlimentoDto } from './dto/update-tipo-alimento.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('tipo-alimento')
export class TipoAlimentoController {
  constructor(private readonly tipoAlimentoService: TipoAlimentoService) {}

  @Post()
  create(@Body() createTipoAlimentoDto: CreateTipoAlimentoDto) {
    return this.tipoAlimentoService.create(createTipoAlimentoDto);
  }

  @Get()
  findAll() {
    return this.tipoAlimentoService.findAll();
  }

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoAlimentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoAlimentoDto: UpdateTipoAlimentoDto) {
    return this.tipoAlimentoService.update(+id, updateTipoAlimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoAlimentoService.remove(+id);
  }
}
