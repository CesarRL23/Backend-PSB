import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PlanPsb } from '../plan_psb/entities/plan_psb.entity';
import { Registro } from '../registro/entities/registro.entity';
import { User } from '../users/entities/user.entity';
import { Programa } from '../programa/entities/programa.entity';
import { Notification } from '../notifications/entities/notification.entity';
import { RegistroAgua } from '../registro-agua/entities/registro-agua.entity';
import { RegistroPlagas } from '../registro-plagas/entities/registro-plagas.entity';
import { RegistroResiduo } from '../registro-residuos/entities/registro-residuo.entity';
import { RegistroLimpieza } from '../registro-limpieza/entities/registro-limpieza.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PlanPsb,
            Registro,
            User,
            Programa,
            Notification,
            RegistroAgua,
            RegistroPlagas,
            RegistroResiduo,
            RegistroLimpieza,
        ]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule { }
