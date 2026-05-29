import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuenteAgua } from '../../../fuente-agua/entities/fuente-agua.entity';
import { RegistroModule } from '../../../registro/registro.module';
import { RegistroAguaModule } from '../../../registro-agua/registro-agua.module';
import { UsersModule } from '../../../users/users.module';
import { AguaRegistroCreatorService } from './services/agua-registro-creator.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FuenteAgua]),
    RegistroModule,
    RegistroAguaModule,
    UsersModule,
  ],
  providers: [AguaRegistroCreatorService],
  exports: [AguaRegistroCreatorService],
})
export class AguaSharedModule {}
