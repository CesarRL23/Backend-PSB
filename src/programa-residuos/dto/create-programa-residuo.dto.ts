import { IsNotEmpty, IsString, IsUUID, IsOptional, IsEnum } from "class-validator";
import { FrecuenciaPrograma } from "../../programa/entities/programa.entity";

export class CreateProgramaResiduoDto {
    @IsUUID()
    @IsOptional()
    programaId?: string;

    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @IsString()
    @IsNotEmpty()
    responsable!: string;

    @IsEnum(FrecuenciaPrograma)
    @IsNotEmpty()
    frecuencia!: FrecuenciaPrograma;

    @IsString()
    @IsNotEmpty()
    objetivo!: string;

    @IsString()
    @IsNotEmpty()
    alcance!: string;

    @IsString()
    @IsNotEmpty()
    procedimiento_general!: string;
}
