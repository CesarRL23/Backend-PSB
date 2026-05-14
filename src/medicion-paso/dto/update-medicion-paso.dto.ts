import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicionPasoDto } from './create-medicion-paso.dto';

export class UpdateMedicionPasoDto extends PartialType(CreateMedicionPasoDto) {}
