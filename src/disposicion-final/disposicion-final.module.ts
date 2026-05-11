import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisposicionFinalService } from './disposicion-final.service';
import { DisposicionFinalController } from './disposicion-final.controller';
import { DisposicionFinal } from './entities/disposicion-final.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DisposicionFinal])],
  controllers: [DisposicionFinalController],
  providers: [DisposicionFinalService],
})
export class DisposicionFinalModule {}
