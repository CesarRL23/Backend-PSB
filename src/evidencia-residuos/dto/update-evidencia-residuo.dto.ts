import { PartialType } from '@nestjs/mapped-types';
import { CreateEvidenciaResiduoDto } from './create-evidencia-residuo.dto';

export class UpdateEvidenciaResiduoDto extends PartialType(CreateEvidenciaResiduoDto) {}
