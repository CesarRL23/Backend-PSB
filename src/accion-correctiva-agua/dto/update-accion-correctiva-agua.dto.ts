import { PartialType } from '@nestjs/mapped-types';
import { CreateAccionCorrectivaAguaDto } from './create-accion-correctiva-agua.dto';

export class UpdateAccionCorrectivaAguaDto extends PartialType(CreateAccionCorrectivaAguaDto) {}
