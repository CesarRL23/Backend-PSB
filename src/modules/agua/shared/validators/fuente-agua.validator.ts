import { BadRequestException } from '@nestjs/common';

export interface ValidarFuenteAguaInput {
  tipo: string;
  proveedor?: string | null;
}

export function validarFuenteAgua(input: ValidarFuenteAguaInput): void {
  if (input.tipo === 'red_publica' && !input.proveedor) {
    throw new BadRequestException(
      'El proveedor es obligatorio cuando el tipo de fuente es "Red Pública"',
    );
  }
}
