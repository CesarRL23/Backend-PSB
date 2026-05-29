import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisposicionFinalService } from './disposicion-final.service';
import { CreateDisposicionFinalDto } from './dto/create-disposicion-final.dto';
import { UpdateDisposicionFinalDto } from './dto/update-disposicion-final.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('disposicion-final')
export class DisposicionFinalController {
  constructor(private readonly disposicionFinalService: DisposicionFinalService) {}

  @Get('me')
  getMe(@CurrentUser() user) {
  return user;
  }
  
  @Post()
  create(@Body() createDisposicionFinalDto: CreateDisposicionFinalDto) {
    return this.disposicionFinalService.create(createDisposicionFinalDto);
  }

  @Get()
  findAll() {
    return this.disposicionFinalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disposicionFinalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisposicionFinalDto: UpdateDisposicionFinalDto) {
    return this.disposicionFinalService.update(+id, updateDisposicionFinalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disposicionFinalService.remove(+id);
  }
}
