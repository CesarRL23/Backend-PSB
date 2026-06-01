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
import { EquipoAreaModule } from './equipo-area/equipo-area.module';
import { ProgramaLimpiezaModule } from './programa-limpieza/programa-limpieza.module';
import { PasoLimpiezaPqModule } from './paso-limpieza-pq/paso-limpieza-pq.module';
import { RegistroLimpiezaModule } from './registro-limpieza/registro-limpieza.module';
import { MedicionPasoModule } from './medicion-paso/medicion-paso.module';
import { ProgramaAguaModule } from './programa-agua/programa-agua.module';
import { FuenteAguaModule } from './fuente-agua/fuente-agua.module';
import { TanqueAlmacenamientoModule } from './tanque-almacenamiento/tanque-almacenamiento.module';
import { ControlDiarioPotabilidadModule } from './control-diario-potabilidad/control-diario-potabilidad.module';
import { AnalisisLaboratorioModule } from './analisis-laboratorio/analisis-laboratorio.module';
import { MantenimientoLavadoModule } from './mantenimiento-lavado/mantenimiento-lavado.module';
import { InsumoQuimicoModule } from './insumo-quimico/insumo-quimico.module';
import { RegistroAguaModule } from './registro-agua/registro-agua.module';
import { AccionCorrectivaAguaModule } from './accion-correctiva-agua/accion-correctiva-agua.module';
import { ProgramaResiduosModule } from './programa-residuos/programa-residuos.module';
import { TipoResiduoModule } from './tipo-residuo/tipo-residuo.module';
import { AreaGenereacionModule } from './area-genereacion/area-genereacion.module';
import { ContenedeorModule } from './contenedeor/contenedeor.module';
import { ResiduoModule } from './residuo/residuo.module';
import { RegistroResiduosModule } from './registro-residuos/registro-residuos.module';
import { RecoleccionModule } from './recoleccion/recoleccion.module';
import { ChecklistResiduosModule } from './checklist-residuos/checklist-residuos.module';
import { DisposicionFinalModule } from './disposicion-final/disposicion-final.module';
import { EvidenciaResiduosModule } from './evidencia-residuos/evidencia-residuos.module';
import { UploadsModule } from './uploads/uploads.module';
import { DashboardModule } from './dashboard/dashboard.module';

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
        schema: 'public',
        autoLoadEntities: true,
        synchronize: true, // solo en desarrollo, en producción usar migraciones
        extra: { family: 4 },
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
    ProgramaAguaModule,
    FuenteAguaModule,
    TanqueAlmacenamientoModule,
    ControlDiarioPotabilidadModule,
    AnalisisLaboratorioModule,
    MantenimientoLavadoModule,
    InsumoQuimicoModule,
    RegistroAguaModule,
    AccionCorrectivaAguaModule,
    EquipoAreaModule,
    ProgramaLimpiezaModule,
    PasoLimpiezaPqModule,
    RegistroLimpiezaModule,
    MedicionPasoModule,
    ProgramaResiduosModule,
    TipoResiduoModule,
    AreaGenereacionModule,
    ContenedeorModule,
    ResiduoModule,
    RegistroResiduosModule,
    RecoleccionModule,
    ChecklistResiduosModule,
    DisposicionFinalModule,
    EvidenciaResiduosModule,
    UploadsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
