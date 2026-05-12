import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChecklistResiduosService } from './checklist-residuos.service';
import { CreateChecklistResiduoDto } from './dto/create-checklist-residuo.dto';
import { UpdateChecklistResiduoDto } from './dto/update-checklist-residuo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('checklist-residuos')
export class ChecklistResiduosController {
  constructor(private readonly checklistResiduosService: ChecklistResiduosService) {}

  @Get('me')
    getMe(@CurrentUser() user) {
    return user;
    }
  @Post()
  create(@Body() createChecklistResiduoDto: CreateChecklistResiduoDto) {
    return this.checklistResiduosService.create(createChecklistResiduoDto);
  }

  @Get()
  findAll() {
    return this.checklistResiduosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checklistResiduosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChecklistResiduoDto: UpdateChecklistResiduoDto) {
    return this.checklistResiduosService.update(+id, updateChecklistResiduoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checklistResiduosService.remove(+id);
  }
}
