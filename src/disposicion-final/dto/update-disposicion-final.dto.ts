import { PartialType } from '@nestjs/mapped-types';
import { CreateDisposicionFinalDto } from './create-disposicion-final.dto';

export class UpdateDisposicionFinalDto extends PartialType(CreateDisposicionFinalDto) {}
