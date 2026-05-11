import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContenedeorService } from './contenedeor.service';
import { CreateContenedeorDto } from './dto/create-contenedeor.dto';
import { UpdateContenedeorDto } from './dto/update-contenedeor.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('contenedeor')
export class ContenedeorController {
  constructor(private readonly contenedeorService: ContenedeorService) {}

  @Get('me')
  getMe(@CurrentUser() user) {
  return user;
  }
  
  @Post()
  create(@Body() createContenedeorDto: CreateContenedeorDto) {
    return this.contenedeorService.create(createContenedeorDto);
  }

  @Get()
  findAll() {
    return this.contenedeorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contenedeorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContenedeorDto: UpdateContenedeorDto) {
    return this.contenedeorService.update(+id, updateContenedeorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contenedeorService.remove(+id);
  }
}
