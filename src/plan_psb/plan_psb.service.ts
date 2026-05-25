import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlanPsb } from '../plan_psb/entities/plan_psb.entity';
import { Empresa } from '../empresa/entities/empresa.entity';

import { CreatePlanPsbDto } from './dto/create-plan_psb.dto';
import { UpdatePlanPsbDto } from './dto/update-plan_psb.dto';

@Injectable()
export class PlanPsbService {
  constructor(
    @InjectRepository(PlanPsb)
    private readonly planPsbRepository: Repository<PlanPsb>,

    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(createPlanPsbDto: CreatePlanPsbDto) {
    const empresa = await this.empresaRepository.findOne({
      where: { id: createPlanPsbDto.empresaId },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa no encontrada');
    }

    const planPsb = this.planPsbRepository.create(createPlanPsbDto)

    return await this.planPsbRepository.save(planPsb);
  }

  async findAll() {
    return await this.planPsbRepository.find({
      relations: ['empresa'],
    });
  }

  async findOne(id: string) {
    const plan = await this.planPsbRepository.findOne({
      where: { id },
      relations: ['empresa'],
    });

    if (!plan) {
      throw new NotFoundException('Plan PSB no encontrado');
    }

    return plan;
  }

  async update(id: string, updatePlanPsbDto: UpdatePlanPsbDto) {
    const plan = await this.findOne(id);

    if (updatePlanPsbDto.empresaId) {
      const empresa = await this.empresaRepository.findOne({
        where: { id: updatePlanPsbDto.empresaId },
      });

      if (!empresa) {
        throw new NotFoundException('Empresa no encontrada');
      }

      plan.empresa = empresa;
    }

    Object.assign(plan, updatePlanPsbDto);

    return await this.planPsbRepository.save(plan);
  }

  async remove(id: string) {
    const plan = await this.findOne(id);

    return await this.planPsbRepository.remove(plan);
  }
}

