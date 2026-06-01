import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContenedeorDto } from './dto/create-contenedeor.dto';
import { UpdateContenedeorDto } from './dto/update-contenedeor.dto';
import { Contenedeor } from './entities/contenedeor.entity';

@Injectable()
export class ContenedeorService {
  constructor(
    @InjectRepository(Contenedeor)
    private readonly contenedeorRepository: Repository<Contenedeor>,
  ) {}

  async create(createContenedeorDto: CreateContenedeorDto): Promise<Contenedeor> {
    const contenedeor = this.contenedeorRepository.create(createContenedeorDto);
    return this.contenedeorRepository.save(contenedeor);
  }

  async findAll(): Promise<Contenedeor[]> {
    return this.contenedeorRepository.find();
  }

  async findOne(id: number): Promise<Contenedeor> {
    const contenedeor = await this.contenedeorRepository.findOneBy({ id: id.toString() });
    if (!contenedeor) {
      throw new NotFoundException(`Contenedor con id ${id} no encontrado`);
    }
    return contenedeor;
  }

  async update(id: number, updateContenedeorDto: UpdateContenedeorDto): Promise<Contenedeor> {
    const contenedeor = await this.findOne(id);
    Object.assign(contenedeor, updateContenedeorDto);
    return this.contenedeorRepository.save(contenedeor);
  }

  async remove(id: number): Promise<void> {
    const contenedeor = await this.findOne(id);
    await this.contenedeorRepository.remove(contenedeor);
  }
}
