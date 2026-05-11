import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaGenereacionDto } from './create-area-genereacion.dto';

export class UpdateAreaGenereacionDto extends PartialType(CreateAreaGenereacionDto) {}
