import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlanPsbService } from './plan-psb.service';
import { CreatePlanPsbDto } from './dto/create-plan-psb.dto';
import { UpdatePlanPsbDto } from './dto/update-plan-psb.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('plan-psb')
export class PlanPsbController {
  constructor(private readonly planPsbService: PlanPsbService) {}

  @Post()
  create(@Body() createPlanPsbDto: CreatePlanPsbDto) {
    return this.planPsbService.create(createPlanPsbDto);
  }

  @Get()
  findAll() {
    return this.planPsbService.findAll();
  }

  @Get('me')
  getMe(@CurrentUser() user: any) {
    return this.planPsbService.getMe(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planPsbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanPsbDto: UpdatePlanPsbDto) {
    return this.planPsbService.update(+id, updatePlanPsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planPsbService.remove(+id);
  }
}
