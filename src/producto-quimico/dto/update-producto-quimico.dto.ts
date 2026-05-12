import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoQuimicoDto } from './create-producto-quimico.dto';

export class UpdateProductoQuimicoDto extends PartialType(CreateProductoQuimicoDto) {}
