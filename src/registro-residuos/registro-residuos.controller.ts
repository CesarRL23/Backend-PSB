import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegistroResiduosService } from './registro-residuos.service';
import { CreateRegistroResiduoDto } from './dto/create-registro-residuo.dto';
import { UpdateRegistroResiduoDto } from './dto/update-registro-residuo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('registro-residuos')
export class RegistroResiduosController {
  constructor(private readonly registroResiduosService: RegistroResiduosService) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
}
  @Post()
  create(@Body() createRegistroResiduoDto: CreateRegistroResiduoDto) {
    return this.registroResiduosService.create(createRegistroResiduoDto);
  }

  @Get()
  findAll() {
    return this.registroResiduosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registroResiduosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistroResiduoDto: UpdateRegistroResiduoDto) {
    return this.registroResiduosService.update(+id, updateRegistroResiduoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registroResiduosService.remove(+id);
  }
}
