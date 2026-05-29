import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/enums/role.enum';

const ROLES_PERMITIDOS: Record<string, Role[]> = {
  [Role.SUPERADMIN]: [Role.ADMIN, Role.SUPERVISOR, Role.CALIDAD, Role.OPERARIO],
  [Role.ADMIN]: [Role.SUPERVISOR, Role.CALIDAD, Role.OPERARIO],
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(dto: CreateUserDto, creatorRole: string) {
    const { password, empresa_id, nombre, email, rol, estado, cargo, pin_firma_hash, firma_digitalizada } = dto;

    const permitidos = ROLES_PERMITIDOS[creatorRole] ?? [];
    if (!permitidos.includes(rol as Role)) {
      throw new ForbiddenException(
        `El rol '${creatorRole}' no puede crear usuarios con rol '${rol}'`,
      );
    }

    const supabaseUser = await this.authService.createUser(email, password, {
      role: rol,
      nombre,
    });

    const user = this.userRepo.create({
      id: supabaseUser!.id,
      empresaId: empresa_id,
      nombre,
      email,
      rol,
      estado,
      cargo,
      pinFirmaHash: pin_firma_hash ? await bcrypt.hash(pin_firma_hash, 10) : undefined,
      firmaDigitalizada: firma_digitalizada,
    });

    return await this.userRepo.save(user);
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException(`Usuario #${id} no encontrado`);
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);

    const { empresa_id, nombre, email, rol, estado, cargo, pin_firma_hash, firma_digitalizada } = dto;

    await this.userRepo.update(id, {
      ...(empresa_id && { empresaId: empresa_id }),
      ...(nombre && { nombre }),
      ...(email && { email }),
      ...(rol && { rol }),
      ...(estado && { estado }),
      ...(cargo && { cargo }),
      ...(firma_digitalizada && { firmaDigitalizada: firma_digitalizada }),
      ...(pin_firma_hash && { pinFirmaHash: await bcrypt.hash(pin_firma_hash, 10) }),
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}