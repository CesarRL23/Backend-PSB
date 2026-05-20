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
} from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { TanqueAlmacenamientoService } from './tanque-almacenamiento.service';
import { CreateTanqueAlmacenamientoDto } from './dto/create-tanque-almacenamiento.dto';
import { UpdateTanqueAlmacenamientoDto } from './dto/update-tanque-almacenamiento.dto';

@Controller('tanque-almacenamiento')
export class TanqueAlmacenamientoController {

  constructor(
    private readonly tanqueService: TanqueAlmacenamientoService,
  ) {}

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Post()
  create(
    @Body() createDto: CreateTanqueAlmacenamientoDto,
    @CurrentUser() user,
  ) {
    return this.tanqueService.create(createDto);
  }

  @Get()
  findAll(
    @Query('fuenteAguaId') fuenteAguaId: string,
    @CurrentUser() user,
  ) {
    if (fuenteAguaId) {
      return this.tanqueService.findByFuente(fuenteAguaId);
    }
    return this.tanqueService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.tanqueService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateTanqueAlmacenamientoDto,
    @CurrentUser() user,
  ) {
    return this.tanqueService.update(id, updateDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user,
  ) {
    return this.tanqueService.remove(id);
  }
}