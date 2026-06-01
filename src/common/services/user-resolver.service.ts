import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class UserResolverService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async resolve(
    supabaseUserId: string,
    email?: string,
    nombre?: string,
    rol?: string,
  ): Promise<string> {
    const bySupabaseId = await this.userRepository.findOne({
      where: { supabaseId: supabaseUserId },
    });
    if (bySupabaseId) return bySupabaseId.id;

    const byId = await this.userRepository.findOne({
      where: { id: supabaseUserId },
    });
    if (byId) return byId.id;

    if (email) {
      const byEmail = await this.userRepository.findOne({
        where: { email },
      });
      if (byEmail) {
        await this.userRepository.update(byEmail.id, {
          supabaseId: supabaseUserId,
        });
        return byEmail.id;
      }
    }

    const emailFallback = email ?? 'usuario-' + supabaseUserId.slice(0, 8) + '@auto.local';

    const nuevoUsuario = this.userRepository.create({
      id: supabaseUserId,
      empresaId: '00000000-0000-0000-0000-000000000000',
      email: emailFallback,
      nombre: nombre ?? 'Usuario Auto-creado',
      rol: rol ?? 'operario',
      estado: 'activo',
      supabaseId: supabaseUserId,
    });

    const saved = await this.userRepository.save(nuevoUsuario);
    return saved.id;
  }
}
