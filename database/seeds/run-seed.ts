import 'reflect-metadata';
dotenv.config();
import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { DataSource } from 'typeorm';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { Empresa } from '../../src/empresa/entities/empresa.entity';
import { TipoAlimento } from '../../src/tipo-alimento/entities/tipo-alimento.entity';
import { PlanPsb } from '../../src/plan_psb/entities/plan_psb.entity';
import { Programa } from '../../src/programa/entities/programa.entity';
import { User } from '../../src/users/entities/user.entity';
import {
  EstadoRegistro,
  Registro,
} from '../../src/registro/entities/registro.entity';
import { Notification } from '../../src/notifications/entities/notification.entity';
import { VersionPlan } from '../../src/version-plan/entities/version-plan.entity';
import { ProgramaLimpieza } from '../../src/programa-limpieza/entities/programa-limpieza.entity';
import { PasoLimpieza } from '../../src/paso-limpieza/entities/paso-limpieza.entity';
import { ProductoQuimico } from '../../src/producto-quimico/entities/producto-quimico.entity';
import {
  ConcentracionUnidad,
  PasoLimpiezaPq,
} from '../../src/paso-limpieza-pq/entities/paso-limpieza-pq.entity';
import { RegistroLimpieza } from '../../src/registro-limpieza/entities/registro-limpieza.entity';
import { ChecklistLimpieza } from '../../src/checklist-limpieza/entities/checklist-limpieza.entity';
import {
  MedicionPaso,
  TipoParametro,
} from '../../src/medicion-paso/entities/medicion-paso.entity';
import { VerificacionLimpieza } from '../../src/verificacion-limpieza/entities/verificacion-limpieza.entity';
import {
  EquipoArea,
  TipoEquipoArea,
  EstadoEquipoArea,
} from '../../src/equipo-area/entities/equipo-area.entity';
import { ProgramaAgua } from '../../src/programa-agua/entities/programa-agua.entity';
import { FuenteAgua } from '../../src/fuente-agua/entities/fuente-agua.entity';
import { TanqueAlmacenamiento } from '../../src/tanque-almacenamiento/entities/tanque-almacenamiento.entity';
import {
  RegistroAgua,
  ResultadoGeneralAgua,
  TipoActividadAgua,
} from '../../src/registro-agua/entities/registro-agua.entity';
import { ControlDiarioPotabilidad } from '../../src/control-diario-potabilidad/entities/control-diario-potabilidad.entity';
import { AnalisisLaboratorio } from '../../src/analisis-laboratorio/entities/analisis-laboratorio.entity';
import {
  EstadoMantenimiento,
  MantenimientoLavado,
} from '../../src/mantenimiento-lavado/entities/mantenimiento-lavado.entity';
import { InsumoQuimico } from '../../src/insumo-quimico/entities/insumo-quimico.entity';
import {
  AccionCorrectivaAgua,
  EstadoAccionCorrectiva,
} from '../../src/accion-correctiva-agua/entities/accion-correctiva-agua.entity';
import { ProgramaPlagas } from '../../src/programa-plagas/entities/programa-plagas.entity';
import { EmpresaFumigadora } from '../../src/empresa-fumigadora/entities/empresa-fumigadora.entity';
import { DiagnosticoPlagas } from '../../src/diagnostico-plagas/entities/diagnostico-plagas.entity';
import { CronogramaPlagas } from '../../src/cronograma-plagas/entities/cronograma-plagas.entity';
import { AreaPlagas } from '../../src/area-plagas/entities/area-plagas.entity';
import { Trampa } from '../../src/trampa/entities/trampa.entity';
import { TipoPlaga } from '../../src/tipo-plaga/entities/tipo-plaga.entity';
import { Plaguicida } from '../../src/plaguicida/entities/plaguicida.entity';
import { RegistroPlagas } from '../../src/registro-plagas/entities/registro-plagas.entity';
import { HallazgoPlagas } from '../../src/hallazgo-plagas/entities/hallazgo-plagas.entity';
import { AccionCorrectivaPlagas } from '../../src/accion-correctiva-plagas/entities/accion-correctiva-plagas.entity';
import { EvidenciaPlagas } from '../../src/evidencia-plagas/entities/evidencia-plagas.entity';
import { ProgramaResiduo } from '../../src/programa-residuos/entities/programa-residuo.entity';
import { TipoResiduo } from '../../src/tipo-residuo/entities/tipo-residuo.entity';
import { AreaGenereacion } from '../../src/area-genereacion/entities/area-genereacion.entity';
import { Contenedeor } from '../../src/contenedeor/entities/contenedeor.entity';
import { Residuo } from '../../src/residuo/entities/residuo.entity';
import { RegistroResiduo } from '../../src/registro-residuos/entities/registro-residuo.entity';
import { Recoleccion } from '../../src/recoleccion/entities/recoleccion.entity';
import { DisposicionFinal } from '../../src/disposicion-final/entities/disposicion-final.entity';
import { ChecklistResiduo } from '../../src/checklist-residuos/entities/checklist-residuo.entity';
import { EvidenciaResiduo } from '../../src/evidencia-residuos/entities/evidencia-residuo.entity';

async function truncateDatabase(dataSource: DataSource) {
  const tableNames = dataSource.entityMetadatas.map(
    (meta) => `"${meta.tableName}"`,
  );

  await dataSource.query(
    `TRUNCATE TABLE ${tableNames.join(', ')} RESTART IDENTITY CASCADE;`,
  );
}

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASS ?? '',
    database: process.env.DB_NAME ?? 'psb',
    entities: [
      Empresa,
      TipoAlimento,
      PlanPsb,
      Programa,
      User,
      Registro,
      Notification,
      VersionPlan,
      EquipoArea,
      ProgramaLimpieza,
      PasoLimpieza,
      ProductoQuimico,
      PasoLimpiezaPq,
      RegistroLimpieza,
      ChecklistLimpieza,
      MedicionPaso,
      VerificacionLimpieza,
      ProgramaAgua,
      FuenteAgua,
      TanqueAlmacenamiento,
      RegistroAgua,
      ControlDiarioPotabilidad,
      AnalisisLaboratorio,
      MantenimientoLavado,
      InsumoQuimico,
      AccionCorrectivaAgua,
      ProgramaPlagas,
      EmpresaFumigadora,
      DiagnosticoPlagas,
      CronogramaPlagas,
      AreaPlagas,
      Trampa,
      TipoPlaga,
      Plaguicida,
      RegistroPlagas,
      HallazgoPlagas,
      AccionCorrectivaPlagas,
      EvidenciaPlagas,
      ProgramaResiduo,
      TipoResiduo,
      AreaGenereacion,
      Contenedeor,
      Residuo,
      RegistroResiduo,
      Recoleccion,
      DisposicionFinal,
      ChecklistResiduo,
      EvidenciaResiduo,
    ],
    synchronize: true,
    dropSchema: true,
    logging: false,
  });

  await dataSource.initialize();
  try {
    const empresaRepo = dataSource.getRepository(Empresa);
    const tipoAlimentoRepo = dataSource.getRepository(TipoAlimento);
    const planRepo = dataSource.getRepository(PlanPsb);
    const programaRepo = dataSource.getRepository(Programa);
    const userRepo = dataSource.getRepository(User);
    const registroRepo = dataSource.getRepository(Registro);
    const notificationRepo = dataSource.getRepository(Notification);
    const versionPlanRepo = dataSource.getRepository(VersionPlan);

    const equipoAreaRepo = dataSource.getRepository(EquipoArea);
    const programaLimpiezaRepo = dataSource.getRepository(ProgramaLimpieza);
    const pasoLimpiezaRepo = dataSource.getRepository(PasoLimpieza);
    const productoQuimicoRepo = dataSource.getRepository(ProductoQuimico);
    const pasoLimpiezaPqRepo = dataSource.getRepository(PasoLimpiezaPq);
    const registroLimpiezaRepo = dataSource.getRepository(RegistroLimpieza);
    const checklistLimpiezaRepo = dataSource.getRepository(ChecklistLimpieza);
    const medicionPasoRepo = dataSource.getRepository(MedicionPaso);
    const verificacionLimpiezaRepo =
      dataSource.getRepository(VerificacionLimpieza);

    const programaAguaRepo = dataSource.getRepository(ProgramaAgua);
    const fuenteAguaRepo = dataSource.getRepository(FuenteAgua);
    const tanqueRepo = dataSource.getRepository(TanqueAlmacenamiento);
    const registroAguaRepo = dataSource.getRepository(RegistroAgua);
    const controlPotabilidadRepo = dataSource.getRepository(
      ControlDiarioPotabilidad,
    );
    const analisisLabRepo = dataSource.getRepository(AnalisisLaboratorio);
    const mantenimientoRepo = dataSource.getRepository(MantenimientoLavado);
    const insumoQuimicoRepo = dataSource.getRepository(InsumoQuimico);
    const accionAguaRepo = dataSource.getRepository(AccionCorrectivaAgua);

    const programaPlagasRepo = dataSource.getRepository(ProgramaPlagas);
    const empresaFumigadoraRepo =
      dataSource.getRepository(EmpresaFumigadora);
    const diagnosticoPlagasRepo = dataSource.getRepository(DiagnosticoPlagas);
    const cronogramaPlagasRepo = dataSource.getRepository(CronogramaPlagas);
    const areaPlagasRepo = dataSource.getRepository(AreaPlagas);
    const trampaRepo = dataSource.getRepository(Trampa);
    const tipoPlagaRepo = dataSource.getRepository(TipoPlaga);
    const plaguicidaRepo = dataSource.getRepository(Plaguicida);
    const registroPlagasRepo = dataSource.getRepository(RegistroPlagas);
    const hallazgoPlagasRepo = dataSource.getRepository(HallazgoPlagas);
    const accionPlagasRepo = dataSource.getRepository(AccionCorrectivaPlagas);
    const evidenciaPlagasRepo = dataSource.getRepository(EvidenciaPlagas);

    const programaResiduoRepo = dataSource.getRepository(ProgramaResiduo);
    const tipoResiduoRepo = dataSource.getRepository(TipoResiduo);
    const areaGenRepo = dataSource.getRepository(AreaGenereacion);
    const contenedorRepo = dataSource.getRepository(Contenedeor);
    const residuoRepo = dataSource.getRepository(Residuo);
    const registroResiduoRepo = dataSource.getRepository(RegistroResiduo);
    const recoleccionRepo = dataSource.getRepository(Recoleccion);
    const disposicionFinalRepo = dataSource.getRepository(DisposicionFinal);
    const checklistResiduoRepo = dataSource.getRepository(ChecklistResiduo);
    const evidenciaResiduoRepo = dataSource.getRepository(EvidenciaResiduo);

    const empresa = await empresaRepo.save(
      empresaRepo.create({
        nit: '900123456-7',
        nombre: 'Planta San Buen Sabor SAS',
        direccion: 'Km 8 Via Industrial, Bogota',
        tipoNegocio: 'Procesamiento de alimentos',
        representante: 'Laura Martinez',
        registroSanitarioFuncionamiento: 'RSF-PSB-2026-001',
        resolucionInvima: 'INVIMA-2026-PSB-1001',
      }),
    );

    const tipoAlimentoList = await tipoAlimentoRepo.save([
      tipoAlimentoRepo.create({
        nombre: 'Salsas listas para consumo',
        descripcion: 'Linea de salsas refrigeradas y listas para despacho.',
        nivel_riesgo: 'alto',
        empresa,
      }),
      tipoAlimentoRepo.create({
        nombre: 'Bases deshidratadas',
        descripcion: 'Mezclas secas para preparaciones institucionales.',
        nivel_riesgo: 'medio',
        empresa,
      }),
    ]);

    const plan = await planRepo.save(
      planRepo.create({
        version: 'v2026.1',
        estado: 'vigente',
        nivel_riesgo: 'alto',
        empresa,
        tipoAlimento: tipoAlimentoList[0],
      }),
    );

    const users = await userRepo.save([
      userRepo.create({
        id: '9a6d4b65-08a7-4b0a-bcf6-3c2f4d8b4b11',
        empresaId: empresa.id,
        nombre: 'Camila Rojas',
        email: 'camila.rojas@psb.local',
        rol: 'admin',
        estado: 'activo',
        cargo: 'Coordinadora de calidad',
        firmaDigitalizada: 'https://example.com/firmas/camila.png',
      }),
      userRepo.create({
        id: '24c81ba7-df86-4388-bf42-392fc4d69922',
        empresaId: empresa.id,
        nombre: 'Andres Vega',
        email: 'andres.vega@psb.local',
        rol: 'supervisor',
        estado: 'activo',
        cargo: 'Supervisor sanitario',
        firmaDigitalizada: 'https://example.com/firmas/andres.png',
      }),
      userRepo.create({
        id: '5446b271-30e7-4d2f-98f8-6f7d15743933',
        empresaId: empresa.id,
        nombre: 'Maria Pardo',
        email: 'maria.pardo@psb.local',
        rol: 'operario',
        estado: 'activo',
        cargo: 'Operaria de planta',
      }),
    ]);

    // ─── Sincronizar usuarios con Supabase Auth ──────────────────────────────
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
    if (supabaseUrl && supabaseSecretKey) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey);
      const password = 'Psb2026!';
      for (const user of users) {
        const { error } = await supabaseAdmin.auth.admin.createUser({
          uid: user.id,
          email: user.email,
          password,
          email_confirm: true,
          user_metadata: { role: user.rol, nombre: user.nombre },
        } as any);
        if (error && error.message !== 'User already registered') {
          console.error(`Error creando usuario ${user.email} en Supabase:`, error.message);
        }
      }
      console.log('Usuarios sincronizados con Supabase Auth.');
    } else {
      console.warn('SUPABASE_URL o SUPABASE_SECRET_KEY no definidas — se omitió sincronización con Supabase Auth.');
    }

    const programa = await programaRepo.save(
      programaRepo.create({
        planPsbId: plan.id,
        nombre: 'Plan de Saneamiento Basico',
        responsable: users[1].nombre,
        descripcion: 'Programa general que integra los cuatro modulos del PSB.',
      }),
    );

    const registros = await registroRepo.save([
      registroRepo.create({
        programaId: programa.id,
        usuarioId: users[2].id,
        fecha: new Date('2026-05-12'),
        horaInicio: '06:00:00',
        horaFin: '06:45:00',
        observaciones: 'Rutina ejecutada antes del arranque de linea.',
        evidenciaFoto: 'https://example.com/evidencias/limpieza-001.jpg',
        estado: EstadoRegistro.COMPLETADO,
      }),
      registroRepo.create({
        programaId: programa.id,
        usuarioId: users[1].id,
        fecha: new Date('2026-05-12'),
        horaInicio: '07:00:00',
        horaFin: '07:30:00',
        observaciones: 'Control diario de calidad del agua de proceso.',
        evidenciaFoto: 'https://example.com/evidencias/agua-001.jpg',
        estado: EstadoRegistro.COMPLETADO,
      }),
      registroRepo.create({
        programaId: programa.id,
        usuarioId: users[1].id,
        fecha: new Date('2026-05-13'),
        horaInicio: '08:00:00',
        horaFin: '08:40:00',
        observaciones: 'Revision semanal de puntos de control y trampas.',
        evidenciaFoto: 'https://example.com/evidencias/plagas-001.jpg',
        estado: EstadoRegistro.EN_PROCESO,
      }),
      registroRepo.create({
        programaId: programa.id,
        usuarioId: users[2].id,
        fecha: new Date('2026-05-13'),
        horaInicio: '15:00:00',
        horaFin: '15:25:00',
        observaciones: 'Recoleccion interna y pesaje de residuos.',
        evidenciaFoto: 'https://example.com/evidencias/residuos-001.jpg',
        estado: EstadoRegistro.COMPLETADO,
      }),
    ]);

    await versionPlanRepo.save([
      versionPlanRepo.create({
        version: '1.0',
        cambios: 'Creacion inicial del plan maestro PSB.',
        fecha: new Date('2026-01-10'),
      }),
      versionPlanRepo.create({
        version: '1.1',
        cambios: 'Ajustes en frecuencias operativas y responsables.',
        fecha: new Date('2026-03-01'),
      }),
    ]);

    await notificationRepo.save([
      notificationRepo.create({
        usuarioId: users[1].id,
        programaId: programa.id,
        registroId: registros[2].id,
        tipo: 'alerta',
        titulo: 'Hallazgo de plagas pendiente',
        mensaje: 'Se requiere cierre de accion correctiva del hallazgo activo.',
        fechaEnvio: new Date('2026-05-13T09:00:00'),
        fechaLimite: new Date('2026-05-15T17:00:00'),
        leida: false,
        estado: 'pendiente',
      }),
      notificationRepo.create({
        usuarioId: users[0].id,
        programaId: programa.id,
        registroId: registros[1].id,
        tipo: 'recordatorio',
        titulo: 'Analisis de laboratorio cargado',
        mensaje: 'El certificado del ultimo muestreo ya esta disponible.',
        fechaEnvio: new Date('2026-05-12T10:00:00'),
        fechaLimite: new Date('2026-05-16T17:00:00'),
        leida: true,
        estado: 'cerrada',
      }),
    ]);

    const equipoArea = await equipoAreaRepo.save(
      equipoAreaRepo.create({
        empresaId: empresa.id,
        nombre: 'Mesa de preparacion inox',
        tipo: TipoEquipoArea.EQUIPO,
        estado: EstadoEquipoArea.ACTIVO,
      }),
    );

    const programaLimpieza = await programaLimpiezaRepo.save(
      programaLimpiezaRepo.create({
        programaId: programa.id,
        equipoAreaId: equipoArea.id,
        objetivo:
          'Garantizar superficies higienizadas antes, durante y despues de la operacion.',
        alcance: 'Mesas inox, utensilios, banda transportadora y cuarto frio.',
        procedimientoGeneral:
          'Enjuague, aplicacion de detergente, friccion, enjuague, desinfeccion y verificacion.',
      }),
    );

    const productos = await productoQuimicoRepo.save([
      productoQuimicoRepo.create({
        codigo: 'PQ-DET-001',
        nombre: 'Detergente alcalino espumante',
        fabricante: 'Quimialimentos SAS',
        tipo: 'detergente',
        gradoAlimenticio: true,
        ph: '11',
        concentracionRecomendada: '2%',
        tiempoContactoMin: '10',
        fichaTecnicaUrl: 'https://example.com/fichas/pq-det-001.pdf',
      }),
      productoQuimicoRepo.create({
        codigo: 'PQ-DES-002',
        nombre: 'Desinfectante clorado',
        fabricante: 'Higieniza Andina',
        tipo: 'desinfectante',
        gradoAlimenticio: true,
        ph: '7',
        concentracionRecomendada: '200 ppm',
        tiempoContactoMin: '15',
        fichaTecnicaUrl: 'https://example.com/fichas/pq-des-002.pdf',
      }),
    ]);

    const pasos = await pasoLimpiezaRepo.save([
      pasoLimpiezaRepo.create({
        programaLimpiezaId: programaLimpieza.id,
        orden: 1,
        descripcion: 'Lavado inicial de mesas y utensilios.',
        tipoAccion: 'lavado',
        concentracion: '2%',
        tiempoContacto: '10 min',
        frecuencia: 'diaria',
        observaciones: 'Usar agua tibia.',
        temperaturaAguaMinima: 35,
        temperaturaAguaMaxima: 45,
      }),
      pasoLimpiezaRepo.create({
        programaLimpiezaId: programaLimpieza.id,
        orden: 2,
        descripcion: 'Desinfeccion final de superficies de contacto.',
        tipoAccion: 'desinfeccion',
        concentracion: '200 ppm',
        tiempoContacto: '15 min',
        frecuencia: 'diaria',
        observaciones: 'No secar manualmente despues del contacto.',
        temperaturaAguaMinima: 20,
        temperaturaAguaMaxima: 25,
      }),
    ]);

    await pasoLimpiezaPqRepo.save([
      pasoLimpiezaPqRepo.create({
        pasoLimpiezaId: pasos[0].id,
        productoQuimicoId: productos[0].id,
        concentracionValor: 2,
        concentracionUnidad: ConcentracionUnidad.PORCENTAJE,
        tiempoContactoMin: 10,
      }),
      pasoLimpiezaPqRepo.create({
        pasoLimpiezaId: pasos[1].id,
        productoQuimicoId: productos[1].id,
        concentracionValor: 200,
        concentracionUnidad: ConcentracionUnidad.PPM,
        tiempoContactoMin: 15,
      }),
    ]);

    const registroLimpieza = await registroLimpiezaRepo.save(
      registroLimpiezaRepo.create({
        registroId: registros[0].id,
        programaLimpiezaId: programaLimpieza.id,
        equipoAreaId: equipoArea.id,
        superficieLimpiada: 'Mesa de preparacion y banda de empaque',
        resultadoInspeccion: 'conforme',
      }),
    );

    const checklistItems = await checklistLimpiezaRepo.save([
      checklistLimpiezaRepo.create({
        registroLimpiezaId: registroLimpieza.id,
        pasoLimpiezaId: pasos[0].id,
        productoCorrecto: true,
        concentracionCorrecta: true,
        superficieCubierta: true,
        tiempoCumplido: true,
        estado: 'aprobado',
        observacion: 'Sin residuos visibles.',
        productoQuimicoId: productos[0].id,
        loteUsado: 'DET-240512',
        concentracionReal: 2,
        volumenPreparadoLitros: 8,
      }),
      checklistLimpiezaRepo.create({
        registroLimpiezaId: registroLimpieza.id,
        pasoLimpiezaId: pasos[1].id,
        productoCorrecto: true,
        concentracionCorrecta: true,
        superficieCubierta: true,
        tiempoCumplido: true,
        estado: 'aprobado',
        observacion: 'Tiempo de contacto validado.',
        productoQuimicoId: productos[1].id,
        loteUsado: 'DES-240512',
        concentracionReal: 210,
        volumenPreparadoLitros: 5,
      }),
    ]);

    await medicionPasoRepo.save([
      medicionPasoRepo.create({
        checklistLimpiezaId: checklistItems[0].id,
        tipoParametro: TipoParametro.TEMPERATURA,
        valor: 38,
        unidad: 'C',
        valorMinimoEsperado: 35,
        valorMaximoEsperado: 45,
        cumple: true,
      }),
      medicionPasoRepo.create({
        checklistLimpiezaId: checklistItems[1].id,
        tipoParametro: TipoParametro.CLORO,
        valor: 210,
        unidad: 'ppm',
        valorMinimoEsperado: 180,
        valorMaximoEsperado: 220,
        cumple: true,
      }),
    ]);

    await verificacionLimpiezaRepo.save(
      verificacionLimpiezaRepo.create({
        registroLimpiezaId: registroLimpieza.id,
        tipo: 'hisopado ATP',
        resultado: '42 RLU',
        unidad: 'RLU',
        limiteAceptable: '< 60',
        metodoValidacion: 'Medicion con luminometro portatil.',
        responsableId: users[1].id,
        fechaPrueba: '2026-05-12',
        loteReactivo: 'ATP-5512',
        fechaVencimientoReactivo: '2026-12-31',
      }),
    );

    const programaAgua = await programaAguaRepo.save(
      programaAguaRepo.create({
        programaId: programa.id,
        objetivo: 'Asegurar que el agua utilizada sea apta para uso alimentario.',
        alcance:
          'Red interna, punto de proceso, tanque elevado y lavamanos operativos.',
        procedimientoGeneral:
          'Monitoreo diario de cloro y pH, verificaciones de turbiedad y analisis mensual externo.',
      }),
    );

    const fuenteAgua = await fuenteAguaRepo.save(
      fuenteAguaRepo.create({
        programaAguaId: programaAgua.id,
        nombre: 'Red municipal principal',
        tipo: 'acueducto',
        proveedor: 'Empresa de Acueducto',
        ubicacion: 'Cuarto tecnico norte',
        requiereTanque: true,
        estado: 'activo',
      }),
    );

    await tanqueRepo.save(
      tanqueRepo.create({
        fuenteAguaId: fuenteAgua.id,
        capacidadLitros: 1500,
        materialGradoAlimenticio: 'Polietileno de alta densidad',
        fechaUltimoLavado: '2026-04-20',
        tieneTapa: true,
      }),
    );

    const registroAgua = await registroAguaRepo.save(
      registroAguaRepo.create({
        registroId: registros[1].id,
        programaAguaId: programaAgua.id,
        tipoActividad: TipoActividadAgua.CONTROL_POTABILIDAD,
        resultadoGeneral: ResultadoGeneralAgua.CONFORME,
      }),
    );

    await controlPotabilidadRepo.save(
      controlPotabilidadRepo.create({
        fuenteAguaId: fuenteAgua.id,
        registroAguaId: registroAgua.id,
        fechaHora: new Date('2026-05-12T07:10:00'),
        cloroResidual: 0.8,
        ph: 7.1,
        turbiedad: 0.5,
        colorAparente: 5,
        puntoCaptacion: 'Tanque principal',
        responsableMuestra: 'Juan Pérez',
        cumpleNorma: true,
      }),
    );

    await analisisLabRepo.save(
      analisisLabRepo.create({
        fuenteAguaId: fuenteAgua.id,
        registroAguaId: registroAgua.id,
        numeroCertificado: 'LAB-PSB-2026-0512',
        fechaMuestreo: '2026-05-12',
        laboratorioCertificado: 'Laboratorio ABC',
        responsableMuestra: 'Juan Pérez',
        puntoMuestreo: 'Llave cocina',
        cloroResidual: 1.2,
        ph: 7.0,
        turbiedad: 1.5,
        colorAparente: 5,
        coliformesTotalesPresentes: false,
        eColiPresente: false,
        mesofilos: 12,
        irca: 1.2,
        nivelRiesgo: 'sin_riesgo',
        resultado: 'apto',
        linkDocumentoPdf: 'https://example.com/lab/psb-2026-0512.pdf',
      }),
    );

    const mantenimiento = await mantenimientoRepo.save(
      mantenimientoRepo.create({
        fuenteAguaId: fuenteAgua.id,
        registroAguaId: registroAgua.id,
        fechaProgramada: '2026-05-18',
        fechaEjecucion: '2026-05-18',
        metodoLimpieza: 'Lavado interno, cepillado y desinfeccion con hipoclorito.',
        observaciones: 'Se realizo purga total antes de recarga.',
        estado: EstadoMantenimiento.COMPLETADO,
      }),
    );

    await insumoQuimicoRepo.save([
      insumoQuimicoRepo.create({
        mantenimientoId: mantenimiento.id,
        nombre: 'Hipoclorito de sodio',
        registroSanitarioInvima: 'INV-CL-200',
        lote: 'HIPO-0518',
        fechaVencimiento: '2026-11-30',
        concentracion: 5.25,
      }),
      insumoQuimicoRepo.create({
        mantenimientoId: mantenimiento.id,
        nombre: 'Detergente neutro',
        registroSanitarioInvima: 'INV-DN-102',
        lote: 'DET-0518',
        fechaVencimiento: '2027-01-15',
        concentracion: 1.5,
      }),
    ]);

    await accionAguaRepo.save(
      accionAguaRepo.create({
        fuenteAguaId: fuenteAgua.id,
        registroAguaId: registroAgua.id,
        descripcionDesviacion:
          'Lectura de cloro residual cercana al limite inferior de control.',
        medidaTomada:
          'Se ajusto el dosificador y se repitio la verificacion a los 15 minutos.',
        resultadoVerificacion: 'Parametro normalizado en segunda lectura.',
        fecha: '2026-05-12',
        responsable: users[1].nombre,
        estado: EstadoAccionCorrectiva.COMPLETADA,
      }),
    );

    const programaPlagas = await programaPlagasRepo.save(
      programaPlagasRepo.create({
        programaId: programa.id,
        objetivo:
          'Prevenir, detectar y controlar oportunamente la presencia de plagas.',
        alcance: 'Bodega, cuarto frio, despacho y perimetro externo.',
        procGeneral:
          'Inspeccion visual, monitoreo de trampas, registro de hallazgos y tratamiento focalizado.',
        fecha_envio: new Date('2026-05-01T08:00:00'),
        fecha_limite: new Date('2026-12-31T17:00:00'),
      }),
    );

    // Usar insert() para evitar UpdateValuesMissingError con programaPlagas/@OneToOne@JoinColumn
    await empresaFumigadoraRepo.insert({
      nit: '901555999-1',
      nombre_empresa: 'Control Integral Ambiental SAS',
      numCerSanitario: 'CSA-4411',
      registroSds: 'SDS-CIA-2026',
      telefonoContacto: '3105554433',
      fechaVencCer: new Date('2026-10-01T00:00:00'),
      programaPlagas: { id: programaPlagas.id },
    });

    await diagnosticoPlagasRepo.insert({
      nivelRiesgo: 'medio',
      areasEvaluadas: 'Muelles, zona de residuos, bodega de secos y perimetro occidental.',
      plagasIdentificadas: 'Actividad eventual de roedores en zona externa.',
      observaciones: 'Se recomienda reforzar sellado en puerta de despacho.',
      fecha: new Date('2026-05-03T08:30:00'),
      programaPlagas: { id: programaPlagas.id },
    });

    await cronogramaPlagasRepo.insert({
      frecuenciaControl: 'semanal',
      metodoControl: 'Monitoreo con trampas y barreras fisicas',
      responsable: users[1].nombre,
      anioVigencia: 2026,
      programaPlagas: { id: programaPlagas.id },
    });

    const areaPlagasResult = await areaPlagasRepo.insert({
      nombre: 'Bodega de empaques',
      descripcion: 'Zona de almacenamiento de material secundario.',
      nivelRiesgo: 'medio',
      programaPlagas: { id: programaPlagas.id },
    });
    const areaPlagasId = areaPlagasResult.identifiers[0].id;

    await trampaRepo.insert([
      {
        codigo: 'TR-EMP-01',
        tipo: 'pegajosa',
        ubicacion: 'Ingreso bodega',
        estado: 'activa',
        fecha_instalacion: new Date('2026-02-01T09:00:00'),
        fecha_revision: new Date('2026-05-13T08:10:00'),
        areaPlagas: { id: areaPlagasId },
      },
      {
        codigo: 'TR-EXT-02',
        tipo: 'cebadera',
        ubicacion: 'Perimetro despacho',
        estado: 'activa',
        fecha_instalacion: new Date('2026-02-01T09:10:00'),
        fecha_revision: new Date('2026-05-13T08:15:00'),
        areaPlagas: { id: areaPlagasId },
      },
    ]);

    const tiposPlaga = await tipoPlagaRepo.save([
      tipoPlagaRepo.create({ nombre: 'Roedor', categoria: 'vertebrado', riesgoSanitario: 'alto' }),
      tipoPlagaRepo.create({ nombre: 'Mosca', categoria: 'insecto', riesgoSanitario: 'medio' }),
    ]);

    const plaguicidaResult = await plaguicidaRepo.insert({
      codigoRegistro: 'PLG-ICA-001',
      nombreComercial: 'Rodex Block',
      ingredienteActivo: 'Bromadiolona',
      categoriaOms: 'II',
      dosisAplicacion: '1 bloque por punto',
      registroIca: 'ICA-88701',
      fichaTecnicaUrl: 'https://example.com/plaguicidas/rodex-block.pdf',
      programaPlagas: { id: programaPlagas.id },
    });
    const plaguicidaId = plaguicidaResult.identifiers[0].id;

    const registroPlagasResult = await registroPlagasRepo.insert({
      TipoActividad: 'inspeccion',
      resultadoGeneral: 'hallazgo_controlado',
      registro: { id: registros[2].id },
      programaPlagas: { id: programaPlagas.id },
    });
    const registroPlagasId = registroPlagasResult.identifiers[0].id;

    const hallazgoResult = await hallazgoPlagasRepo.insert({
      descripcion: 'Se encontro evidencia de roedura en estiba de carton.',
      severidad: 'media',
      estado: 'abierto',
      fecha: new Date('2026-05-13T08:20:00'),
      registroPlagas: { id: registroPlagasId },
      tipoPlaga: { id: tiposPlaga[0].id },
    });
    const hallazgoId = hallazgoResult.identifiers[0].id;

    await accionPlagasRepo.insert({
      descripcion: 'Reposicion de cebo y sellado de punto de ingreso cercano.',
      responsable: users[1].nombre,
      estado: 'en seguimiento',
      prioridad: 'alta',
      fecha: new Date('2026-05-13T09:00:00'),
      hallazgoPlagas: { id: hallazgoId },
      plaguicida: { id: plaguicidaId },
    });

    await evidenciaPlagasRepo.insert({
      tipoArchivo: 'imagen',
      urlArchivo: 'https://example.com/plagas/hallazgo-roedura.jpg',
      descripcion: 'Fotografia del material afectado en bodega.',
      fecha_carga: new Date('2026-05-13T08:25:00'),
      registroPlagas: { id: registroPlagasId },
    });

    // Usar insert() para evitar UpdateValuesMissingError con programaResiduo/@OneToOne@JoinColumn
    const programaResiduo = await programaResiduoRepo.save(
      programaResiduoRepo.create({
        programaId: programa.id,
        objetivo: 'Segregar y disponer adecuadamente residuos ordinarios, reciclables y peligrosos.',
        alcance: 'Todas las areas productivas, administrativas y de despacho.',
        procedimiento_general: 'Clasificacion en fuente, acopio temporal, pesaje y entrega a gestor.',
      }),
    );

    const tipoResiduoResults = await tipoResiduoRepo.insert([
      { nombre: 'Organico aprovechable', color_contenedor: 'verde', descripcion: 'Restos de materia prima vegetal.', es_peligroso: false, programaResiduo: { id: programaResiduo.id } },
      { nombre: 'Envase contaminado', color_contenedor: 'rojo', descripcion: 'Envases con remanentes de sustancias quimicas.', es_peligroso: true, programaResiduo: { id: programaResiduo.id } },
    ]);
    const [tipoRes0Id, tipoRes1Id] = tipoResiduoResults.identifiers.map((r: any) => r.id);

    const areaGenResults = await areaGenRepo.insert([
      { nombre: 'Preparacion', descripcion: 'Zona de pesaje y alistamiento de materia prima.', programaResiduo: { id: programaResiduo.id } },
      { nombre: 'Lavado', descripcion: 'Zona de lavado de utensilios y equipos menores.', programaResiduo: { id: programaResiduo.id } },
    ]);
    const [areaGen0Id, areaGen1Id] = areaGenResults.identifiers.map((r: any) => r.id);

    const contenedorResults = await contenedorRepo.insert([
      { color: 'verde', capacidad: '120 L', ubicacion: 'Area de preparacion', estado: 'operativo', programaResiduo: { id: programaResiduo.id } },
      { color: 'rojo', capacidad: '60 L', ubicacion: 'Cuarto de quimicos', estado: 'operativo', programaResiduo: { id: programaResiduo.id } },
    ]);
    const [cont0Id, cont1Id] = contenedorResults.identifiers.map((r: any) => r.id);

    await residuoRepo.insert([
      { nombre: 'Cascaras y recortes vegetales', descripcion: 'Subproducto del alistamiento diario.', estado: 'almacenado', programaResiduo: { id: programaResiduo.id }, contenedeor: { id: cont0Id }, tipoResiduo: { id: tipoRes0Id }, areaGenereacion: { id: areaGen0Id } },
      { nombre: 'Envase de desinfectante vacio', descripcion: 'Bidon con triple lavado pendiente de entrega.', estado: 'almacenado', programaResiduo: { id: programaResiduo.id }, contenedeor: { id: cont1Id }, tipoResiduo: { id: tipoRes1Id }, areaGenereacion: { id: areaGen1Id } },
    ]);

    const registroResiduoResult = await registroResiduoRepo.insert({
      tipo_actividad: 'recoleccion_interna',
      resultado_general: 'conforme',
      programaResiduo: { id: programaResiduo.id },
      registro: { id: registros[3].id },
    });
    const registroResiduoId = registroResiduoResult.identifiers[0].id;

    const recoleccionResult = await recoleccionRepo.insert({
      fecha: new Date('2026-05-13'),
      responsable: users[2].nombre,
      cantidad_recolectada: 18,
      observaciones: 'Pesaje consolidado del turno tarde.',
      registroResiduo: { id: registroResiduoId },
    });
    const recoleccionId = recoleccionResult.identifiers[0].id;

    await disposicionFinalRepo.insert({
      metodo: 'Aprovechamiento externo y gestor autorizado',
      empresa_encargada: 'EcoGestores SAS',
      fecha_disposicion: new Date('2026-05-13'),
      recoleccion: { id: recoleccionId },
    });

    await checklistResiduoRepo.save(
      checklistResiduoRepo.create({
        id: randomUUID(),
        titulo: 'Verificacion de segregacion',
        descripcion: 'Comprobacion visual del uso correcto de contenedores.',
        porcentaje_cumplimiento: 95,
      }),
    );

    await evidenciaResiduoRepo.insert({
      tipo_archivo: 'imagen',
      url: 'https://example.com/residuos/contenedor-verde.jpg',
      descripcion: 'Registro fotografico del area de acopio temporal.',
      fecha: new Date('2026-05-13'),
      registroResiduo: { id: registroResiduoId },
    });

    console.log('Seed completado correctamente.');
    console.log(
      [
        `Empresa: 1`,
        `Tipos de alimento: ${tipoAlimentoList.length}`,
        `Planes PSB: 1`,
        `Usuarios: ${users.length}`,
        `Programas: 1 (+ 4 sub-programas)`,
        `Registros base: ${registros.length}`,
      ].join('\n'),
    );
    console.log(
      [
        '',
        'Nota:',
        '- El seeder usa las entidades reales del proyecto.',
        '- Algunas relaciones del dominio hoy estan desalineadas con el schema en docs,',
        '  por eso ciertos vinculos se siembran segun lo que la entidad actual soporta.',
      ].join('\n'),
    );
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((error) => {
  console.error('Error ejecutando el seeder:', error);
  process.exit(1);
});
