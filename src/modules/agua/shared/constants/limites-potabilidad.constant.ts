/**
 * Límites de potabilidad según Resolución 2115 de 2007 (Ministerio de Salud)
 * y Decreto 1575 de 2007.
 *
 * Estos límites son FIJOS y no dependen del nivel de riesgo.
 * El nivel de riesgo solo determina la frecuencia de muestreo.
 */
export interface LimitesPotabilidad {
  cloro: { min: number; max: number };
  ph: { min: number; max: number };
  turbiedad: { max: number };
  color: { max: number };
}

export const LIMITES_POTABILIDAD: LimitesPotabilidad = {
  cloro: { min: 0.3, max: 2.0 },
  ph: { min: 6.5, max: 9.0 },
  turbiedad: { max: 2 },
  color: { max: 15 },
};
