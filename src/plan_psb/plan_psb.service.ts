import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlanPsb } from '../plan_psb/entities/plan_psb.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Programa } from '../programa/entities/programa.entity';
import { ProgramaLimpieza } from '../programa-limpieza/entities/programa-limpieza.entity';
import { ProgramaAgua } from '../programa-agua/entities/programa-agua.entity';
import { ProgramaPlagas } from '../programa-plagas/entities/programa-plagas.entity';
import { ProgramaResiduo } from '../programa-residuos/entities/programa-residuo.entity';

import { CreatePlanPsbDto } from './dto/create-plan_psb.dto';
import { UpdatePlanPsbDto } from './dto/update-plan_psb.dto';

@Injectable()
export class PlanPsbService {
  constructor(
    @InjectRepository(PlanPsb)
    private readonly planPsbRepository: Repository<PlanPsb>,

    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,

    @InjectRepository(Programa)
    private readonly programaRepo: Repository<Programa>,

    @InjectRepository(ProgramaLimpieza)
    private readonly limpiezaRepo: Repository<ProgramaLimpieza>,

    @InjectRepository(ProgramaAgua)
    private readonly aguaRepo: Repository<ProgramaAgua>,

    @InjectRepository(ProgramaPlagas)
    private readonly plagasRepo: Repository<ProgramaPlagas>,

    @InjectRepository(ProgramaResiduo)
    private readonly residuoRepo: Repository<ProgramaResiduo>,
  ) {}

  async create(createPlanPsbDto: CreatePlanPsbDto) {
    const empresa = await this.empresaRepository.findOne({
      where: { id: createPlanPsbDto.empresaId },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa no encontrada');
    }

    const plan = await this.planPsbRepository.save(
      this.planPsbRepository.create(createPlanPsbDto),
    );

    const programa = await this.programaRepo.save(
      this.programaRepo.create({ planPsbId: plan.id }),
    );

    await Promise.all([
      this.limpiezaRepo.save(
        this.limpiezaRepo.create({ programaId: programa.id, objetivo: '', alcance: '', procedimientoGeneral: '' }),
      ),
      this.aguaRepo.save(
        this.aguaRepo.create({ programaId: programa.id, objetivo: '', alcance: '', procedimientoGeneral: '' }),
      ),
      this.plagasRepo.save(
        this.plagasRepo.create({ programaId: programa.id, objetivo: '', alcance: '', procGeneral: '', fecha_envio: new Date() }),
      ),
      this.residuoRepo.save(
        this.residuoRepo.create({ programaId: programa.id, objetivo: '', alcance: '', procedimiento_general: '' }),
      ),
    ]);

    return plan;
  }

  async findAll() {
    return await this.planPsbRepository.find({
      relations: ['empresa', 'tipoAlimento', 'programa'],
    });
  }

  async findOne(id: string) {
    const plan = await this.planPsbRepository.findOne({
      where: { id },
      relations: ['empresa', 'tipoAlimento', 'programa'],
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
