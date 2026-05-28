import { BadRequestException } from '@nestjs/common';
import { EstadoAccionCorrectiva } from '../enums';

export interface ValidarAccionCorrectivaInput {
  estado: EstadoAccionCorrectiva;
  resultadoVerificacion?: string | null;
  descripcionDesviacion: string;
}

export function validarAccionCorrectiva(input: ValidarAccionCorrectivaInput): void {
  if (!input.descripcionDesviacion?.trim()) {
    throw new BadRequestException('La descripción de la desviación es obligatoria');
  }

  if (
    input.estado === EstadoAccionCorrectiva.COMPLETADA &&
    !input.resultadoVerificacion?.trim()
  ) {
    throw new BadRequestException(
      'El resultado de la verificación es obligatorio cuando la acción está completada',
    );
  }
}
