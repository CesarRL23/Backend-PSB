import { BadRequestException } from '@nestjs/common';

export interface ValidarTanqueInput {
  tieneTapa: boolean | undefined;
  tapaBuenEstado?: boolean | null;
  capacidadLitros: number;
}

export function validarTanque(input: ValidarTanqueInput): void {
  if (input.tieneTapa === true && input.tapaBuenEstado == null) {
    throw new BadRequestException(
      'Debe indicar si la tapa está en buen estado cuando el tanque tiene tapa',
    );
  }

  if (input.capacidadLitros <= 0) {
    throw new BadRequestException('La capacidad del tanque debe ser mayor a 0 litros');
  }
}
