import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { PlanPsb } from '../plan_psb/entities/plan_psb.entity';
import { Registro } from '../registro/entities/registro.entity';
import { User } from '../users/entities/user.entity';
import { Programa } from '../programa/entities/programa.entity';
import { Notification } from '../notifications/entities/notification.entity';
import { RegistroAgua } from '../registro-agua/entities/registro-agua.entity';
import { RegistroPlagas } from '../registro-plagas/entities/registro-plagas.entity';
import { RegistroResiduo } from '../registro-residuos/entities/registro-residuo.entity';
import { RegistroLimpieza } from '../registro-limpieza/entities/registro-limpieza.entity';
import {
    DashboardResponseDto,
    DashboardStatsDto,
    PlanResumenDto,
    ActividadItemDto,
    CumplimientoProgramaDto,
} from './dto/dashboard-response.dto';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(PlanPsb) private planRepo: Repository<PlanPsb>,
        @InjectRepository(Registro) private registroRepo: Repository<Registro>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Programa) private programaRepo: Repository<Programa>,
        @InjectRepository(Notification) private notificacionRepo: Repository<Notification>,
        @InjectRepository(RegistroAgua) private registroAguaRepo: Repository<RegistroAgua>,
        @InjectRepository(RegistroPlagas) private registroPlagasRepo: Repository<RegistroPlagas>,
        @InjectRepository(RegistroResiduo) private registroResiduoRepo: Repository<RegistroResiduo>,
        @InjectRepository(RegistroLimpieza) private registroLimpiezaRepo: Repository<RegistroLimpieza>,
    ) { }

    async getDashboard(): Promise<DashboardResponseDto> {
        const [
            stats,
            planes,
            actividadReciente,
            cumplimientoPorPrograma,
            tendenciaMensual,
        ] = await Promise.all([
            this.getStats(),
            this.getPlanes(),
            this.getActividadReciente(),
            this.getCumplimiento(),
            this.getTendencia(),
        ]);

        return { stats, planes, actividadReciente, cumplimientoPorPrograma, tendenciaMensual };
    }

    private async getStats(): Promise<DashboardStatsDto> {
        const [planes, registrosMes, registrosPendientes, noLeidas] = await Promise.all([
            this.planRepo.find({ select: { estado: true } }),
            this.registroRepo.count({
                where: {
                    fecha: Between(
                        new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        new Date(),
                    ),
                },
            }),
            this.registroRepo.count({ where: { estado: 'pendiente' as any } }),
            this.notificacionRepo.find({ where: { leida: false } }),
        ]);

        const totalPlanes = planes.length;
        const planesActivos = planes.filter(p => p.estado === 'ACTIVO').length;
        const planesEnRevision = planes.filter(p => p.estado === 'EN_REVISION').length;
        const alertasActivas = noLeidas.length;

        return {
            planesActivos,
            totalPlanes,
            planesEnRevision,
            cumplimientoGeneral: 0,
            registrosDelMes: registrosMes,
            registrosPendientes,
            alertasActivas,
        };
    }

    private async getPlanes(): Promise<PlanResumenDto[]> {
        const planes = await this.planRepo.find({
            relations: ['empresa'],
            order: { createdAt: 'DESC' },
        });

        return planes.map(p => ({
            id: p.id,
            nombre: p.nombre,
            version: p.version,
            nivelRiesgo: p.nivel_riesgo,
            estado: p.estado,
            cumplimiento: 0,
            vencimiento: p.updatedAt
                ? p.updatedAt.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
                : 'Sin fecha',
        }));
    }

    private async getActividadReciente(): Promise<ActividadItemDto[]> {
        const registros = await this.registroRepo.find({
            relations: ['usuario', 'programa'],
            order: { createdAt: 'DESC' },
            take: 10,
        });

        return registros.map(r => {
            const nombre = r.usuario?.nombre ?? 'Usuario';
            const palabras = nombre.split(' ');
            const iniciales = palabras.length >= 2
                ? (palabras[0][0] + palabras[1][0]).toUpperCase()
                : nombre.substring(0, 2).toUpperCase();

            const diffMs = Date.now() - new Date(r.createdAt).getTime();
            const diffMin = Math.floor(diffMs / 60000);
            const diffHoras = Math.floor(diffMs / 3600000);
            const diffDias = Math.floor(diffMs / 86400000);
            let tiempo: string;
            if (diffMin < 60) tiempo = `Hace ${diffMin}m`;
            else if (diffHoras < 24) tiempo = `Hace ${diffHoras}h`;
            else if (diffDias < 2) tiempo = 'Ayer';
            else tiempo = `Hace ${diffDias} días`;

            return {
                id: r.id,
                operario: nombre,
                iniciales,
                programa: r.programa?.nombre ?? 'Sin programa',
                accion: r.observaciones ?? 'Sin descripción',
                estado: r.estado,
                tiempo,
                tieneFoto: !!r.evidenciaFoto,
            };
        });
    }

    private async getCumplimiento(): Promise<CumplimientoProgramaDto[]> {
        const [agua, plagas, residuos] = await Promise.all([
            this.registroAguaRepo.find({ select: { resultadoGeneral: true } }),
            this.registroPlagasRepo.find({ select: { resultadoGeneral: true } }),
            this.registroResiduoRepo.find({ select: { resultado_general: true } }),
        ]);

        const calcPct = (items: any[], field: string): number => {
            if (items.length === 0) return 0;
            const conformes = items.filter(i => {
                const val = i[field];
                return val === 'conforme' || val === 'CONFORME';
            }).length;
            return Math.round((conformes / items.length) * 100);
        };

        return [
            { programa: 'Agua Potable', porcentaje: calcPct(agua, 'resultadoGeneral') },
            { programa: 'Control de Plagas', porcentaje: calcPct(plagas, 'resultadoGeneral') },
            { programa: 'Residuos Sólidos', porcentaje: calcPct(residuos, 'resultado_general') },
        ];
    }

    private async getTendencia(): Promise<{ meses: string[]; series: { programa: string; datos: number[] }[] }> {
        const nombresMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const hoy = new Date();
        const meses: string[] = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
            meses.push(nombresMeses[d.getMonth()]);
        }

        const desde = new Date(hoy.getFullYear(), hoy.getMonth() - 5, 1);
        const registros = await this.registroRepo.find({
            where: { fecha: Between(desde, hoy) },
            relations: ['programa'],
            select: { fecha: true, programa: { id: true, nombre: true } },
        });

        const programas = ['Limpieza y Desinfección', 'Control de Plagas', 'Residuos Sólidos', 'Agua Potable'];
        const series = programas.map(nombre => {
            const datos = meses.map((_, idx) => {
                const inicio = new Date(hoy.getFullYear(), hoy.getMonth() - 5 + idx, 1);
                const fin = new Date(hoy.getFullYear(), hoy.getMonth() - 5 + idx + 1, 0);
                return registros.filter(r => {
                    const f = new Date(r.fecha);
                    const matchPrograma = r.programa?.nombre === nombre || (
                        nombre === 'Agua Potable' && r.programa?.nombre?.toLowerCase().includes('agua')
                    );
                    return matchPrograma && f >= inicio && f <= fin;
                }).length;
            });
            return { programa: nombre, datos };
        });

        return { meses, series };
    }
}
