import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductoQuimicoService } from './producto-quimico.service';
import { CreateProductoQuimicoDto } from './dto/create-producto-quimico.dto';
import { UpdateProductoQuimicoDto } from './dto/update-producto-quimico.dto';

@Controller('productos-quimicos')
export class ProductoQuimicoController {

  constructor(
    private readonly productoQuimicoService: ProductoQuimicoService,
  ) {}

  @Post()
  create(@Body() dto: CreateProductoQuimicoDto) {
    return this.productoQuimicoService.create(dto);
  }

  @Get()
  findAll() {
    return this.productoQuimicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productoQuimicoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductoQuimicoDto,
  ) {
    return this.productoQuimicoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productoQuimicoService.remove(id);
  }
}
