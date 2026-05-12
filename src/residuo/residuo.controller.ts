import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ResiduoService } from './residuo.service';
import { CreateResiduoDto } from './dto/create-residuo.dto';
import { UpdateResiduoDto } from './dto/update-residuo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('residuo')
export class ResiduoController {
  constructor(private readonly residuoService: ResiduoService) {}

  @Get('me')
  getMe(@CurrentUser() user) {
  return user;
  }

  @Post()
  create(@Body() createResiduoDto: CreateResiduoDto) {
    return this.residuoService.create(createResiduoDto);
  }

  @Get()
  findAll() {
    return this.residuoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.residuoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResiduoDto: UpdateResiduoDto) {
    return this.residuoService.update(+id, updateResiduoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residuoService.remove(+id);
  }
}
