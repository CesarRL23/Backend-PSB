import { PartialType } from '@nestjs/mapped-types';
import { CreateEvidenciaPlagasDto } from './create-evidencia-plagas.dto';

export class UpdateEvidenciaPlagasDto extends PartialType(CreateEvidenciaPlagasDto) {}
