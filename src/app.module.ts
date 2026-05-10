import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EmpresaModule } from './empresa/empresa.module';
import { TipoAlimentoModule } from './tipo-alimento/tipo-alimento.module';
import { PlanPsbModule } from './plan-psb/plan-psb.module';
import { ProgramaModule } from './programa/programa.module';
import { AuthModule } from './auth/auth.module';
import { OperarioModule } from './operario/operario.module';
import { VersionPlanModule } from './version-plan/version-plan.module';
import { PasoLimpiezaModule } from './paso-limpieza/paso-limpieza.module';
import { ProductoQuimicoModule } from './producto-quimico/producto-quimico.module';
import { RegistroModule } from './registro/registro.module';
import { ChecklistLimpiezaModule } from './checklist-limpieza/checklist-limpieza.module';
import { VerificacionLimpiezaModule } from './verificacion-limpieza/verificacion-limpieza.module';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'psb',
      autoLoadEntities: true,
      synchronize: true,
    }),

    EmpresaModule,
    TipoAlimentoModule,
    PlanPsbModule,
    ProgramaModule,
    AuthModule,
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