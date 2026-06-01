export class DashboardStatsDto {
    planesActivos: number;
    totalPlanes: number;
    planesEnRevision: number;
    cumplimientoGeneral: number;
    registrosDelMes: number;
    registrosPendientes: number;
    alertasActivas: number;
}

export class PlanResumenDto {
    id: string;
    nombre: string;
    version: string;
    nivelRiesgo: string;
    estado: string;
    cumplimiento: number;
    vencimiento: string;
}

export class ActividadItemDto {
    id: string;
    operario: string;
    iniciales: string;
    programa: string;
    accion: string;
    estado: string;
    tiempo: string;
    tieneFoto: boolean;
}

export class CumplimientoProgramaDto {
    programa: string;
    porcentaje: number;
}

export class DashboardResponseDto {
    stats: DashboardStatsDto;
    planes: PlanResumenDto[];
    actividadReciente: ActividadItemDto[];
    cumplimientoPorPrograma: CumplimientoProgramaDto[];
    tendenciaMensual: { meses: string[]; series: { programa: string; datos: number[] }[] };
}
