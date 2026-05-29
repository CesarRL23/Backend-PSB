import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecoleccionService } from './recoleccion.service';
import { CreateRecoleccionDto } from './dto/create-recoleccion.dto';
import { UpdateRecoleccionDto } from './dto/update-recoleccion.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TipoResiduo } from 'src/tipo-residuo/entities/tipo-residuo.entity';

@Controller('recoleccion')
export class RecoleccionController {
  constructor(private readonly recoleccionService: RecoleccionService) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(@Body() createRecoleccionDto: CreateRecoleccionDto) {
    return this.recoleccionService.create(createRecoleccionDto);
  }

  @Get()
  findAll() {
    return this.recoleccionService.findAll();
  }

  @Get('tipos-residuo-by-programa/:programaResiduoId')
  getTiposResiduoByPrograma(@Param('programaResiduoId') programaResiduoId: string): Promise<TipoResiduo[]> {
    return this.recoleccionService.getTiposResiduoByPrograma(programaResiduoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recoleccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecoleccionDto: UpdateRecoleccionDto) {
    return this.recoleccionService.update(+id, updateRecoleccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recoleccionService.remove(+id);
  }
}
