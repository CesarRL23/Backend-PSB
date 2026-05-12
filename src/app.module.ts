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
import { PlanPsbModule } from './plan_psb/plan_psb.module';
import { ProgramaModule } from './programa/programa.module';
import { OperarioModule } from './operario/operario.module';
import { VersionPlanModule } from './version-plan/version-plan.module';
import { PasoLimpiezaModule } from './paso-limpieza/paso-limpieza.module';
import { ProductoQuimicoModule } from './producto-quimico/producto-quimico.module';
import { RegistroModule } from './registro/registro.module';
import { ChecklistLimpiezaModule } from './checklist-limpieza/checklist-limpieza.module';
import { VerificacionLimpiezaModule } from './verificacion-limpieza/verificacion-limpieza.module';
import { ProgramaPlagasModule } from './programa-plagas/programa-plagas.module';
import { TrampaModule } from './trampa/trampa.module';
import { RegistroPlagasModule } from './registro-plagas/registro-plagas.module';
import { DiagnosticoPlagasModule } from './diagnostico-plagas/diagnostico-plagas.module';
import { EmpresaFumigadoraModule } from './empresa-fumigadora/empresa-fumigadora.module';
import { CronogramaPlagasModule } from './cronograma-plagas/cronograma-plagas.module';
import { AreaPlagasModule } from './area-plagas/area-plagas.module';
import { EvidenciaPlagasModule } from './evidencia-plagas/evidencia-plagas.module';
import { HallazgoPlagasModule } from './hallazgo-plagas/hallazgo-plagas.module';
import { TipoPlagaModule } from './tipo-plaga/tipo-plaga.module';
import { PlaguicidaModule } from './plaguicida/plaguicida.module';
import { AccionCorrectivaPlagasModule } from './accion-correctiva-plagas/accion-correctiva-plagas.module';

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
    ProgramaPlagasModule,
    TrampaModule,
    RegistroPlagasModule,
    DiagnosticoPlagasModule,
    EmpresaFumigadoraModule,
    CronogramaPlagasModule,
    AreaPlagasModule,
    EvidenciaPlagasModule,
    HallazgoPlagasModule,
    TipoPlagaModule,
    PlaguicidaModule,
    AccionCorrectivaPlagasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
