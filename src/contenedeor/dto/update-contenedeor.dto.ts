import { PartialType } from '@nestjs/mapped-types';
import { CreateContenedeorDto } from './create-contenedeor.dto';

export class UpdateContenedeorDto extends PartialType(CreateContenedeorDto) {}
