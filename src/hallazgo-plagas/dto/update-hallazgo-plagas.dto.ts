import { PartialType } from '@nestjs/mapped-types';
import { CreateHallazgoPlagasDto } from './create-hallazgo-plagas.dto';

export class UpdateHallazgoPlagasDto extends PartialType(CreateHallazgoPlagasDto) {}
