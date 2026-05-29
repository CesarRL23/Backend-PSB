import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UserResolverService } from '../common/services/user-resolver.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    private readonly userResolver: UserResolverService,
  ) {}

  async create(dto: CreateNotificationDto) {
    const usuarioId = await this.userResolver.resolve(dto.usuario_id);
    const fechaEnvio = dto.fecha_envio ? new Date(dto.fecha_envio) : new Date();

    const notification = this.notificationRepo.create({
      usuarioId,
      programaId: dto.programa_id,
      registroId: dto.registro_id,
      tipo: dto.tipo,
      titulo: dto.titulo,
      mensaje: dto.mensaje,
      fechaEnvio,
      fechaLimite: dto.fecha_limite ? new Date(dto.fecha_limite) : undefined,
      leida: dto.leida,
      estado: dto.estado,
    });

    return await this.notificationRepo.save(notification);
  }

  async findAll() {
    return await this.notificationRepo.find();
  }

  async findByUsuario(usuarioId: string) {
    return await this.notificationRepo.find({ where: { usuarioId } });
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