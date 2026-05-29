import { BadRequestException } from '@nestjs/common';
import { EstadoMantenimiento } from '../enums';

export interface ValidarMantenimientoInput {
  estado: EstadoMantenimiento;
  fechaEjecucion?: string | null;
  fechaProgramada: string;
}

export function validarMantenimiento(input: ValidarMantenimientoInput): void {
  if (input.estado === EstadoMantenimiento.COMPLETADO && !input.fechaEjecucion) {
    throw new BadRequestException(
      'La fecha de ejecución es obligatoria cuando el mantenimiento está completado',
    );
  }
}
