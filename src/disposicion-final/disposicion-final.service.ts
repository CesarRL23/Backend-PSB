import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDisposicionFinalDto } from './dto/create-disposicion-final.dto';
import { UpdateDisposicionFinalDto } from './dto/update-disposicion-final.dto';
import { DisposicionFinal } from './entities/disposicion-final.entity';

@Injectable()
export class DisposicionFinalService {
  constructor(
    @InjectRepository(DisposicionFinal)
    private readonly disposicionFinalRepository: Repository<DisposicionFinal>,
  ) {}

  async create(createDisposicionFinalDto: CreateDisposicionFinalDto): Promise<DisposicionFinal> {
    const disposicionFinal = this.disposicionFinalRepository.create(createDisposicionFinalDto);
    return this.disposicionFinalRepository.save(disposicionFinal);
  }

  async findAll(): Promise<DisposicionFinal[]> {
    return this.disposicionFinalRepository.find();
  }

  async findOne(id: number): Promise<DisposicionFinal> {
    const disposicionFinal = await this.disposicionFinalRepository.findOneBy({ id });
    if (!disposicionFinal) {
      throw new NotFoundException(`Disposición final con id ${id} no encontrada`);
    }
    return disposicionFinal;
  }

  async update(id: number, updateDisposicionFinalDto: UpdateDisposicionFinalDto): Promise<DisposicionFinal> {
    const disposicionFinal = await this.findOne(id);
    Object.assign(disposicionFinal, updateDisposicionFinalDto);
    return this.disposicionFinalRepository.save(disposicionFinal);
  }

  async remove(id: number): Promise<void> {
    const disposicionFinal = await this.findOne(id);
    await this.disposicionFinalRepository.remove(disposicionFinal);
  }
}
