import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaPlagasDto } from './create-area-plagas.dto';

export class UpdateAreaPlagasDto extends PartialType(CreateAreaPlagasDto) {}
