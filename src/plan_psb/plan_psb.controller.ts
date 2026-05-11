import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanPsbService } from './plan_psb.service';
import { CreatePlanPsbDto } from './dto/create-plan_psb.dto';
import { UpdatePlanPsbDto } from './dto/update-plan_psb.dto';

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
