import { PartialType } from '@nestjs/mapped-types';
import { CreateTrampaDto } from './create-trampa.dto';

export class UpdateTrampaDto extends PartialType(CreateTrampaDto) {}
