import { LIMITES_POTABILIDAD, LimitesPotabilidad } from '../constants/limites-potabilidad.constant';

export interface ParametrosPotabilidad {
  cloroResidual: number;
  ph: number;
  turbiedad: number;
  colorAparente: number;
}

export interface ResultadoCumpleNorma {
  cumple: boolean;
  fueraDeRango: string[];
}

export function calcularCumpleNorma(
  params: ParametrosPotabilidad,
  limites: LimitesPotabilidad = LIMITES_POTABILIDAD,
): ResultadoCumpleNorma {
  const fueraDeRango: string[] = [];

  if (params.cloroResidual < limites.cloro.min || params.cloroResidual > limites.cloro.max) {
    fueraDeRango.push('cloro_residual');
  }

  if (params.ph < limites.ph.min || params.ph > limites.ph.max) {
    fueraDeRango.push('ph');
  }

  if (params.turbiedad > limites.turbiedad.max) {
    fueraDeRango.push('turbiedad');
  }

  if (params.colorAparente > limites.color.max) {
    fueraDeRango.push('color_aparente');
  }

  return {
    cumple: fueraDeRango.length === 0,
    fueraDeRango,
  };
}

export function parametroFueraRangoToString(fueraDeRango: string[]): string | null {
  return fueraDeRango.length > 0 ? fueraDeRango.join(', ') : null;
}
