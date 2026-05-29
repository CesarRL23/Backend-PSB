import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoPlagaDto } from './create-tipo-plaga.dto';

export class UpdateTipoPlagaDto extends PartialType(CreateTipoPlagaDto) {}
