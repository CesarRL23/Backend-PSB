import { PartialType } from '@nestjs/mapped-types';
import { CreateTanqueAlmacenamientoDto } from './create-tanque-almacenamiento.dto';

export class UpdateTanqueAlmacenamientoDto extends PartialType(CreateTanqueAlmacenamientoDto) {}