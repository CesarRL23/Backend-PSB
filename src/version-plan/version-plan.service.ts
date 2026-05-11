import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVersionPlanDto } from './dto/create-version-plan.dto';
import { UpdateVersionPlanDto } from './dto/update-version-plan.dto';
import { VersionPlan } from './entities/version-plan.entity';

@Injectable()
export class VersionPlanService {
  constructor(
    @InjectRepository(VersionPlan)
    private readonly versionPlanRepository: Repository<VersionPlan>,
  ) {}

  async create(createVersionPlanDto: CreateVersionPlanDto): Promise<VersionPlan> {
    const versionPlan = this.versionPlanRepository.create(createVersionPlanDto);
    return this.versionPlanRepository.save(versionPlan);
  }

  async findAll(): Promise<VersionPlan[]> {
    return this.versionPlanRepository.find();
  }

  async findOne(id: number): Promise<VersionPlan | null> {
    return this.versionPlanRepository.findOneBy({ id: id.toString() });
  }

  async update(id: number, updateVersionPlanDto: UpdateVersionPlanDto): Promise<VersionPlan | null> {
    await this.versionPlanRepository.update(id.toString(), updateVersionPlanDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.versionPlanRepository.delete(id.toString());
  }
}
