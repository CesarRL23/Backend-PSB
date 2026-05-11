# Database Schema - PSB

## Notas importantes

- Todos los `id` de relaciones (foreign keys) son `string` (UUID), no `int`
- El diagrama usa `int` por limitaciones de sintaxis Mermaid, pero en la implementación real son UUID

## Diagrama ERD

```mermaid
---
config:
  layout: elk
---

erDiagram

    %% ─── GENERAL ───

    EMPRESA {
        int id
        string nombre
        string nit
        string tipo_negocio
        string direccion
        string representante
    }

    TIPO_ALIMENTO {
        int id
        int empresa_id
        string nombre
        string nivel_riesgo
        string descripcion
    }

    PLAN_PSB {
        int id
        int empresa_id
        int tipo_alimento_id
        string version
        string estado
        string nivel_riesgo
        date fecha_creacion
        date fecha_actualizacion
    }

    PROGRAMA {
        int id
        int plan_psb_id
        string tipo
        string nombre
        string responsable
        string frecuencia
        text descripcion
    }

    USUARIO {
        int id
        int empresa_id
        string nombre
        string email
        string rol
        string estado
        string cargo
        string firma_digitalizada
    }

    VERSION_PLAN {
        int id
        int plan_psb_id
        int usuario_id
        int nro_version
        text cambios
        date fecha
    }

    NOTIFICACION {
        int id
        int usuario_id
        int programa_id
        int registro_id
        string tipo
        string titulo
        text mensaje
        datetime fecha_envio
        datetime fecha_limite
        boolean leida
        string estado
    }

    %% ─── REGISTRO BASE ───

    REGISTRO {
        int id
        int programa_id
        int usuario_id
        date fecha
        time hora_inicio
        time hora_fin
        text observaciones
        string evidencia_foto
    }

    %% ─── MÓDULO LIMPIEZA ───

    PROGRAMA_LIMPIEZA {
        int id
        int programa_id
        string objetivo
        string alcance
        text procedimiento_general
    }

    REGISTRO_LIMPIEZA {
        int id
        int registro_id
        int programa_limpieza_id
        string superficie_limpiada
        string resultado_inspeccion
    }

    PASO_LIMPIEZA {
        int id
        int programa_limpieza_id
        int orden
        text descripcion
        string tipo_accion
        string concentracion
        string tiempo_contacto
        string frecuencia
        string observaciones
    }

    PRODUCTO_QUIMICO {
        int id
        string codigo
        string nombre
        string fabricante
        string tipo
        boolean grado_alimenticio
        string ph
        string concentracion_recomendada
        string tiempo_contacto_min
        text ficha_tecnica_url
    }

    PASO_LIMPIEZA_PQ {
        int id
        int paso_limpieza_id
        int producto_quimico_id
        string concentracion
        string tiempo_contacto
    }

    CHECKLIST_LIMPIEZA {
        int id
        int registro_limpieza_id
        int paso_limpieza_id
        boolean producto_correcto
        boolean concentracion_correcta
        boolean superficie_cubierta
        boolean tiempo_cumplido
        string estado
        text observacion
    }

    VERIFICACION_LIMPIEZA {
        int id
        int registro_limpieza_id
        string tipo
        string resultado
        string unidad
        string limite_aceptable
        text metodo_validacion
        int responsable_id
        date fecha_prueba
    }

    %% ─── MÓDULO PLAGAS ───

    PROGRAMA_PLAGAS {
        int id
        int programa_id
        string objetivo
        string alcance
        text procedimiento_general
    }

    REGISTRO_PLAGAS {
        int id
        int registro_id
        int programa_plagas_id
        string tipo_actividad
        string resultado_general
    }

    DIAGNOSTICO_PLAGAS {
        int id
        int programa_plagas_id
        date fecha
        text areas_evaluadas
        text plagas_identificadas
        string nivel_riesgo
        text observaciones
    }

    EMPRESA_FUMIGADORA {
        int id
        int programa_plagas_id
        string nit
        string nombre_empresa
        string num_cert_sanitario
        date fecha_venc_cert
        string registro_sds
        string telefono_contacto
    }

    CRONOGRAMA_PLAGAS {
        int id
        int programa_plagas_id
        int anio_vigencia
        string frecuencia_control
        string metodo_control
        string responsable
    }

    AREA_PLAGAS {
        int id
        int programa_plagas_id
        string nombre
        string descripcion
        string nivel_riesgo
    }

    TRAMPA {
        int id
        int area_plagas_id
        string codigo
        string tipo
        string ubicacion
        string estado
        date fecha_instalacion
        date ultima_revision
    }

    TIPO_PLAGA {
        int id
        string nombre
        string categoria
        string riesgo_sanitario
    }

    HALLAZGO_PLAGAS {
        int id
        int registro_plagas_id
        int tipo_plaga_id
        string descripcion
        string severidad
        date fecha
        string estado
    }

    PLAGUICIDA {
        int id
        int programa_plagas_id
        string codigo_registro
        string nombre_comercial
        string ingrediente_activo
        string categoria_oms
        string dosis_aplicacion
        string registro_ica
        text ficha_tecnica_url
    }

    ACCION_CORRECTIVA_PLAGAS {
        int id
        int hallazgo_id
        int plaguicida_id
        string descripcion
        date fecha
        string responsable
        string estado
        string prioridad
    }

    EVIDENCIA_PLAGAS {
        int id
        int registro_plagas_id
        string tipo_archivo
        string url_archivo
        string descripcion
        date fecha_carga
    }

    %% ─── MÓDULO AGUA ───

    PROGRAMA_AGUA {
        int id
        int programa_id
        string objetivo
        string alcance
        text procedimiento_general
    }

    REGISTRO_AGUA {
        int id
        int registro_id
        int programa_agua_id
        string tipo_actividad
        string resultado_general
    }

    FUENTE_AGUA {
        int id
        int programa_agua_id
        string nombre
        string tipo
        string proveedor
        string ubicacion
        boolean requiere_tanque
        string estado
    }

    TANQUE_ALMACENAMIENTO {
        int id
        int fuente_agua_id
        double capacidad_litros
        string material_grado_alimenticio
        date fecha_ultimo_lavado
        boolean tiene_tapa
    }

    CONTROL_DIARIO_POTABILIDAD {
        int id
        int fuente_agua_id
        int registro_agua_id
        datetime fecha_hora
        double cloro_residual
        double ph
        double turbiedad
        boolean cumple_norma
    }

    ANALISIS_LABORATORIO {
        int id
        int fuente_agua_id
        int registro_agua_id
        string numero_certificado
        date fecha_muestreo
        boolean coliformes_totales
        boolean e_coli
        double mesofilos
        double irca
        string nivel_riesgo
        string resultado
        string link_documento_pdf
    }

    MANTENIMIENTO_LAVADO {
        int id
        int fuente_agua_id
        int registro_agua_id
        date fecha_programada
        date fecha_ejecucion
        string metodo_limpieza
        string observaciones
        string estado
    }

    INSUMO_QUIMICO {
        int id
        int mantenimiento_id
        string nombre
        string registro_sanitario_invima
        string lote
        date fecha_vencimiento
        double concentracion
    }

    ACCION_CORRECTIVA_AGUA {
        int id
        int registro_agua_id
        string descripcion_desviacion
        string medida_tomada
        string resultado_verificacion
        date fecha
        string responsable
        string estado
    }

    %% ─── MÓDULO RESIDUOS ───

    PROGRAMA_RESIDUOS {
        int id
        int programa_id
        string objetivo
        string alcance
        text procedimiento_general
    }

    REGISTRO_RESIDUOS {
        int id
        int registro_id
        int programa_residuos_id
        string tipo_actividad
        string resultado_general
    }

    TIPO_RESIDUO {
        int id
        int programa_residuos_id
        string nombre
        string color_contenedor
        string descripcion
        boolean es_peligroso
    }

    CONTENEDOR {
        int id
        int programa_residuos_id
        string color
        string capacidad
        string ubicacion
        string estado
    }

    AREA_GENERACION {
        int id
        int programa_residuos_id
        string nombre
        string descripcion
    }

    RESIDUO {
        int id
        int programa_residuos_id
        int tipo_residuo_id
        int contenedor_id
        int area_generacion_id
        string nombre
        string descripcion
        date fecha_registro
        string estado
    }

    RECOLECCION {
        int id
        int registro_residuos_id
        date fecha
        string responsable
        float cantidad_recolectada
        string observaciones
    }

    DISPOSICION_FINAL {
        int id
        int recoleccion_id
        string metodo
        string empresa_encargada
        date fecha_disposicion
    }

    CHECKLIST_RESIDUOS {
        int id
        int registro_residuos_id
        string titulo
        string descripcion
        float porcentaje_cumplimiento
    }

    EVIDENCIA_RESIDUOS {
        int id
        int registro_residuos_id
        string tipo_archivo
        string url_archivo
        string descripcion
        date fecha_carga
    }

    %% ─── RELACIONES GENERALES ───

    EMPRESA ||--o{ TIPO_ALIMENTO : "fabrica"
    EMPRESA ||--o{ PLAN_PSB : "tiene"
    EMPRESA ||--o{ USUARIO : "tiene"

    TIPO_ALIMENTO ||--o{ PLAN_PSB : "origen_riesgo"

    PLAN_PSB ||--|{ PROGRAMA : "contiene"
    PLAN_PSB ||--o{ VERSION_PLAN : "historial"

    VERSION_PLAN }o--|| USUARIO : "modificado_por"

    PROGRAMA ||--o{ REGISTRO : "ejecuta"
    PROGRAMA ||--o{ NOTIFICACION : "genera"

    USUARIO ||--o{ REGISTRO : "genera"
    USUARIO ||--o{ NOTIFICACION : "recibe"

    REGISTRO ||--o{ NOTIFICACION : "resultado"

    %% ─── RELACIONES LIMPIEZA ───

    PROGRAMA ||--|| PROGRAMA_LIMPIEZA : "detalle"
    PROGRAMA_LIMPIEZA ||--o{ PASO_LIMPIEZA : "define_pasos"
    PASO_LIMPIEZA ||--o{ PASO_LIMPIEZA_PQ : "usa_producto"
    PASO_LIMPIEZA_PQ }o--|| PRODUCTO_QUIMICO : "producto"
    REGISTRO ||--o{ REGISTRO_LIMPIEZA : "especializa"
    REGISTRO_LIMPIEZA ||--o{ CHECKLIST_LIMPIEZA : "verifica"
    REGISTRO_LIMPIEZA ||--o{ VERIFICACION_LIMPIEZA : "valida"
    VERIFICACION_LIMPIEZA }o--|| USUARIO : "responsable"

    %% ─── RELACIONES PLAGAS ───

    PROGRAMA ||--|| PROGRAMA_PLAGAS : "detalle"
    PROGRAMA_PLAGAS ||--o{ DIAGNOSTICO_PLAGAS : "diagnostica"
    PROGRAMA_PLAGAS ||--o{ EMPRESA_FUMIGADORA : "contrata"
    PROGRAMA_PLAGAS ||--o{ CRONOGRAMA_PLAGAS : "planifica"
    PROGRAMA_PLAGAS ||--o{ AREA_PLAGAS : "cubre"
    PROGRAMA_PLAGAS ||--o{ PLAGUICIDA : "referencia"
    AREA_PLAGAS ||--o{ TRAMPA : "contiene"
    REGISTRO ||--o{ REGISTRO_PLAGAS : "especializa"
    REGISTRO_PLAGAS ||--o{ HALLAZGO_PLAGAS : "genera"
    REGISTRO_PLAGAS ||--o{ EVIDENCIA_PLAGAS : "adjunta"
    HALLAZGO_PLAGAS }o--|| TIPO_PLAGA : "clasifica"
    HALLAZGO_PLAGAS ||--o{ ACCION_CORRECTIVA_PLAGAS : "origina"
    ACCION_CORRECTIVA_PLAGAS }o--|| PLAGUICIDA : "usa"

    %% ─── RELACIONES AGUA ───

    PROGRAMA ||--|| PROGRAMA_AGUA : "detalle"
    PROGRAMA_AGUA ||--o{ FUENTE_AGUA : "abastece"
    FUENTE_AGUA ||--o| TANQUE_ALMACENAMIENTO : "almacena"
    FUENTE_AGUA ||--o{ CONTROL_DIARIO_POTABILIDAD : "controla"
    FUENTE_AGUA ||--o{ ANALISIS_LABORATORIO : "analiza"
    FUENTE_AGUA ||--o{ MANTENIMIENTO_LAVADO : "mantiene"
    MANTENIMIENTO_LAVADO ||--o{ INSUMO_QUIMICO : "usa"
    REGISTRO ||--o{ REGISTRO_AGUA : "especializa"
    REGISTRO_AGUA ||--o{ CONTROL_DIARIO_POTABILIDAD : "registra"
    REGISTRO_AGUA ||--o{ ANALISIS_LABORATORIO : "registra"
    REGISTRO_AGUA ||--o{ MANTENIMIENTO_LAVADO : "registra"
    REGISTRO_AGUA ||--o{ ACCION_CORRECTIVA_AGUA : "genera"

    %% ─── RELACIONES RESIDUOS ───

    PROGRAMA ||--|| PROGRAMA_RESIDUOS : "detalle"
    PROGRAMA_RESIDUOS ||--o{ TIPO_RESIDUO : "clasifica"
    PROGRAMA_RESIDUOS ||--o{ CONTENEDOR : "gestiona"
    PROGRAMA_RESIDUOS ||--o{ AREA_GENERACION : "cubre"
    PROGRAMA_RESIDUOS ||--o{ RESIDUO : "registra"
    TIPO_RESIDUO ||--o{ RESIDUO : "tipifica"
    CONTENEDOR ||--o{ RESIDUO : "almacena"
    AREA_GENERACION ||--o{ RESIDUO : "genera"
    REGISTRO ||--o{ REGISTRO_RESIDUOS : "especializa"
    REGISTRO_RESIDUOS ||--o{ RECOLECCION : "registra"
    REGISTRO_RESIDUOS ||--o{ CHECKLIST_RESIDUOS : "verifica"
    REGISTRO_RESIDUOS ||--o{ EVIDENCIA_RESIDUOS : "adjunta"
    RECOLECCION ||--o| DISPOSICION_FINAL : "termina_en"