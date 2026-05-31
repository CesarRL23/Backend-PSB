import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateProgramaPlagasDto {
    @IsString()
    @IsNotEmpty()
    programaId!: string;  // ← requerido

    @IsString()
    @IsNotEmpty()
    objetivo!: string;    // ← requerido

    @IsString()
    @IsNotEmpty()
    alcance!: string;     // ← requerido

    @IsString()
    @IsOptional()         // ← opcionales
    procGeneral?: string;

    @IsString()
    @IsOptional()
    nivel_riesgo?: string;

    @IsOptional()
    fecha_envio?: Date;

    @IsOptional()
    fecha_limite?: Date;

    @IsOptional()
    empresaFumigadoraIds?: string[];

    @IsOptional()
    diagnosticoPlagasIds?: string[];

    @IsOptional()
    cronogramaPlagasIds?: string[];

    @IsOptional()
    areaPlagasIds?: string[];

    @IsOptional()
    plaguicidaIds?: string[];

    @IsOptional()
    registroPlagasIds?: string[];
}