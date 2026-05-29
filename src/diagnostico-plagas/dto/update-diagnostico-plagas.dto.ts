import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticoPlagasDto } from './create-diagnostico-plagas.dto';

export class UpdateDiagnosticoPlagasDto extends PartialType(CreateDiagnosticoPlagasDto) {}
