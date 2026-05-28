import { LimitesPotabilidad } from '../constants/limites-potabilidad.constant';

export function getLimites(nivelRiesgo: string): LimitesPotabilidad {
  const nivel = normalizarNivel(nivelRiesgo);

  switch (nivel) {
    case 'alto':
      return {
        cloro: { min: 0.3, max: 0.5 },
        ph:    { min: 6.5, max: 7.5 },
        turbiedad: { max: 1 },
        color: { max: 5 },
      };
    case 'medio':
      return {
        cloro: { min: 0.3, max: 1.0 },
        ph:    { min: 6.5, max: 8.5 },
        turbiedad: { max: 2 },
        color: { max: 15 },
      };
    default:
      return {
        cloro: { min: 0.3, max: 2.0 },
        ph:    { min: 6.5, max: 9.0 },
        turbiedad: { max: 2 },
        color: { max: 15 },
      };
  }
}

function normalizarNivel(nivelRiesgo: string): string {
  switch (nivelRiesgo) {
    case 'riesgo_alto':
    case 'inviable_sanitariamente':
    case 'alto':
      return 'alto';
    case 'riesgo_medio':
    case 'medio':
      return 'medio';
    default:
      return 'bajo';
  }
}
