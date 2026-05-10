# iPSB Backend

API REST desarrollada con NestJS para el sistema de generación de Planes de Saneamiento Básico.

**Cliente:** Alimentos 360 | **Equipo:** Zolvema

---

## Requisitos

- Node.js 22 LTS
- npm 10+
- PostgreSQL 16
- Cuenta en Supabase

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd ipsb-backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

---

## Variables de entorno

```env
# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=xxxx
SUPABASE_JWT_SECRET=xxxx

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=xxxx
DB_NAME=ipsb

# App
PORT=3000
```

---

## Correr el proyecto

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

---

## Generar módulos (CLI)

```bash
# Módulo completo (module + controller + service)
nest g module <nombre>
nest g controller <nombre>
nest g service <nombre>

# Crear carpetas entities y dto
mkdir -p src/<nombre>/entities src/<nombre>/dto
```

### Módulos del proyecto

| Módulo | Descripción |
|---|---|
| `empresa` | Gestión de empresas registradas |
| `tipo-alimento` | Tipos de alimento y nivel de riesgo |
| `plan-psb` | Planes de Saneamiento Básico |
| `programa` | Los 4 programas del PSB |
| `operario` | Operarios por empresa |
| `version-plan` | Historial de versiones del plan |
| `paso-limpieza` | Pasos del programa de limpieza |
| `producto-quimico` | Catálogo de productos químicos |
| `registro` | Bitácoras de ejecución con fotos |
| `checklist-limpieza` | Verificación de limpieza por registro |
| `verificacion-limpieza` | Validaciones técnicas (pH, ATP, cloro) |

---

## Stack

| Herramienta | Versión |
|---|---|
| Node.js | 22 LTS |
| NestJS | 10.x |
| TypeORM | 0.3.x |
| PostgreSQL | 16 |
| Supabase (Auth) | — |
| Multer (fotos) | 1.4.x |