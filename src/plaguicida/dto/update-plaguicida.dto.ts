import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaguicidaDto } from './create-plaguicida.dto';

export class UpdatePlaguicidaDto extends PartialType(CreatePlaguicidaDto) {}
