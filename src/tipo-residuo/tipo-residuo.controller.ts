import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TipoResiduoService } from './tipo-residuo.service';
import { CreateTipoResiduoDto } from './dto/create-tipo-residuo.dto';
import { UpdateTipoResiduoDto } from './dto/update-tipo-residuo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('tipo-residuo')
export class TipoResiduoController {
  constructor(private readonly tipoResiduoService: TipoResiduoService) {}

  @Post()
  create(@Body() createTipoResiduoDto: CreateTipoResiduoDto) {
    return this.tipoResiduoService.create(createTipoResiduoDto);
  }

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
}
  @Get()
  findAll() {
    return this.tipoResiduoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoResiduoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoResiduoDto: UpdateTipoResiduoDto) {
    return this.tipoResiduoService.update(+id, updateTipoResiduoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoResiduoService.remove(+id);
  }
}
