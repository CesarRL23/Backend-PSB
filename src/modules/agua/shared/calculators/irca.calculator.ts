import { LIMITES_POTABILIDAD, LimitesPotabilidad } from '../constants/limites-potabilidad.constant';
import { ParametrosPotabilidad } from './cumple-norma.calculator';

export interface ParametrosMicrobiologicos {
  coliformesTotalesPresentes: boolean;
  eColiPresente: boolean;
  mesofilos: number;
}

export interface ParametrosAnalisis extends ParametrosPotabilidad {
  coliformesTotalesPresentes: boolean;
  eColiPresente: boolean;
  mesofilos: number;
}

export interface ResultadoIRCA {
  puntajeIncumplido: number;
  irca: number;
  nivelRiesgo: string;
  cumpleFisicoquimica: boolean;
  cumpleMicrobiologica: boolean;
  cumpleGeneral: boolean;
  resultado: string;
}

const PUNTAJE_IRCA = {
  colorAparente: 6,
  turbiedad: 15,
  ph: 1.5,
  cloroResidual: 15,
  coliformesTotales: 15,
  eColi: 25,
  mesofilos: 16,
};

const PUNTAJE_MAXIMO_IRCA = 93.5;

export function calcularIRCA(
  params: ParametrosAnalisis,
  limites: LimitesPotabilidad = LIMITES_POTABILIDAD,
): ResultadoIRCA {

  const cumpleFisicoquimica =
    params.cloroResidual >= limites.cloro.min &&
    params.cloroResidual <= limites.cloro.max &&
    params.ph >= limites.ph.min &&
    params.ph <= limites.ph.max &&
    params.turbiedad <= limites.turbiedad.max &&
    params.colorAparente <= limites.color.max;

  const cumpleMicrobiologica =
    !params.coliformesTotalesPresentes &&
    !params.eColiPresente;

  let puntajeIncumplido = 0;

  if (params.colorAparente > limites.color.max)
    puntajeIncumplido += PUNTAJE_IRCA.colorAparente;
  if (params.turbiedad > limites.turbiedad.max)
    puntajeIncumplido += PUNTAJE_IRCA.turbiedad;
  if (params.ph < limites.ph.min || params.ph > limites.ph.max)
    puntajeIncumplido += PUNTAJE_IRCA.ph;
  if (params.cloroResidual < limites.cloro.min || params.cloroResidual > limites.cloro.max)
    puntajeIncumplido += PUNTAJE_IRCA.cloroResidual;
  if (params.coliformesTotalesPresentes)
    puntajeIncumplido += PUNTAJE_IRCA.coliformesTotales;
  if (params.eColiPresente)
    puntajeIncumplido += PUNTAJE_IRCA.eColi;
  if (params.mesofilos > 0)
    puntajeIncumplido += PUNTAJE_IRCA.mesofilos;

  const irca = parseFloat(((puntajeIncumplido / PUNTAJE_MAXIMO_IRCA) * 100).toFixed(2));

  const nivelRiesgo =
    irca <= 5 ? 'sin_riesgo' :
    irca <= 14 ? 'riesgo_bajo' :
    irca <= 35 ? 'riesgo_medio' :
    irca <= 80 ? 'riesgo_alto' : 'inviable_sanitariamente';

  const cumpleGeneral = cumpleFisicoquimica && cumpleMicrobiologica;

  return {
    puntajeIncumplido,
    irca,
    nivelRiesgo,
    cumpleFisicoquimica,
    cumpleMicrobiologica,
    cumpleGeneral,
    resultado: cumpleGeneral ? 'apto' : 'no_apto',
  };
}
