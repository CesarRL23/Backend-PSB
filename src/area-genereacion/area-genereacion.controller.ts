import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreaGenereacionService } from './area-genereacion.service';
import { CreateAreaGenereacionDto } from './dto/create-area-genereacion.dto';
import { UpdateAreaGenereacionDto } from './dto/update-area-genereacion.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('area-genereacion')
export class AreaGenereacionController {
  constructor(private readonly areaGenereacionService: AreaGenereacionService) {}

  @Get('me')
  getMe(@CurrentUser() user) {
  return user;
  }

  @Post()
  create(@Body() createAreaGenereacionDto: CreateAreaGenereacionDto) {
    return this.areaGenereacionService.create(createAreaGenereacionDto);
  }

  @Get()
  findAll() {
    return this.areaGenereacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaGenereacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaGenereacionDto: UpdateAreaGenereacionDto) {
    return this.areaGenereacionService.update(+id, updateAreaGenereacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaGenereacionService.remove(+id);
  }
}
