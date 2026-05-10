import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async create(dto: CreateNotificationDto) {
    const notification = this.notificationRepo.create(dto);
    return await this.notificationRepo.save(notification);
  }

  async findAll() {
    return await this.notificationRepo.find();
  }

  async findByUsuario(usuario_id: string) {
    return await this.notificationRepo.find({ where: { usuario_id } });
  }

  async findOne(id: string) {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) throw new NotFoundException(`Notificación #${id} no encontrada`);
    return notification;
  }

  async update(id: string, dto: UpdateNotificationDto) {
    await this.findOne(id);
    await this.notificationRepo.update(id, dto);
    return this.findOne(id);
  }

  async marcarLeida(id: string) {
    await this.findOne(id);
    await this.notificationRepo.update(id, { leida: true });
    return this.findOne(id);
  }

  async remove(id: string) {
    const notification = await this.findOne(id);
    return this.notificationRepo.remove(notification);
  }
}