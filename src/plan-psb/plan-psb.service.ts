import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanPsbDto } from './dto/create-plan-psb.dto';
import { UpdatePlanPsbDto } from './dto/update-plan-psb.dto';
import { PlanPsb } from './entities/plan-psb.entity';

@Injectable()
export class PlanPsbService {
  constructor(
    @InjectRepository(PlanPsb)
    private readonly planPsbRepository: Repository<PlanPsb>,
  ) {}

  async create(createPlanPsbDto: CreatePlanPsbDto) {
    const planPsb = this.planPsbRepository.create({
      version: createPlanPsbDto.version,
      estado: createPlanPsbDto.estado,
      nivel_riesgo: createPlanPsbDto.nivel_riesgo,
      fecha_creacion: createPlanPsbDto.fecha_creacion ?? new Date(),
      fecha_modificacion: createPlanPsbDto.fecha_modificacion ?? new Date(),
    });
    return this.planPsbRepository.save(planPsb);
  }

  async findAll() {
    return this.planPsbRepository.find();
  }

  async findOne(id: number) {
    const planPsb = await this.planPsbRepository.findOne({
      where: { id: id as any },
    });
    if (!planPsb) {
      throw new NotFoundException(`PlanPsb with id ${id} not found`);
    }
    return planPsb;
  }

  async update(id: number, updatePlanPsbDto: UpdatePlanPsbDto) {
    const planPsb = await this.findOne(id);
    Object.assign(planPsb, updatePlanPsbDto, {
      fecha_modificacion: new Date(),
    });
    return this.planPsbRepository.save(planPsb);
  }

  async remove(id: number) {
    const planPsb = await this.findOne(id);
    await this.planPsbRepository.remove(planPsb);
    return { deleted: true, id };
  }

  getMe(user: any) {
    return {
      message: 'Authenticated user information',
      user,
    };
  }
}
