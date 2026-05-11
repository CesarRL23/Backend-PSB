import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VersionPlanService } from './version-plan.service';
import { CreateVersionPlanDto } from './dto/create-version-plan.dto';
import { UpdateVersionPlanDto } from './dto/update-version-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('version-plan')
@UseGuards(JwtAuthGuard)
export class VersionPlanController {
  constructor(private readonly versionPlanService: VersionPlanService) {}

  @Post()
  create(@Body() createVersionPlanDto: CreateVersionPlanDto) {
    return this.versionPlanService.create(createVersionPlanDto);
  }

  @Get()
  findAll() {
    return this.versionPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versionPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVersionPlanDto: UpdateVersionPlanDto) {
    return this.versionPlanService.update(+id, updateVersionPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versionPlanService.remove(+id);
  }

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }
}
