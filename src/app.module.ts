import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EmpresaModule } from './empresa/empresa.module';
import { TipoAlimentoModule } from './tipo-alimento/tipo-alimento.module';
import { PlanPsbModule } from './plan-psb/plan-psb.module';
import { ProgramaModule } from './programa/programa.module';
import { OperarioModule } from './operario/operario.module';
import { VersionPlanModule } from './version-plan/version-plan.module';
import { PasoLimpiezaModule } from './paso-limpieza/paso-limpieza.module';
import { ProductoQuimicoModule } from './producto-quimico/producto-quimico.module';
import { RegistroModule } from './registro/registro.module';
import { ChecklistLimpiezaModule } from './checklist-limpieza/checklist-limpieza.module';
import { VerificacionLimpiezaModule } from './verificacion-limpieza/verificacion-limpieza.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // solo en desarrollo, en producción usar migraciones
      }),
    }),
    AuthModule,
    UsersModule,
    NotificationsModule,
    EmpresaModule,
    TipoAlimentoModule,
    PlanPsbModule,
    ProgramaModule,
    OperarioModule,
    VersionPlanModule,
    PasoLimpiezaModule,
    ProductoQuimicoModule,
    RegistroModule,
    ChecklistLimpiezaModule,
    VerificacionLimpiezaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}