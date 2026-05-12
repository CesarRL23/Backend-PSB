import { IsNotEmpty, IsString } from "class-validator";
export class CreateDiagnosticoPlagasDto {
    @IsString()
    @IsNotEmpty()
    programaPlagasId!: string;

    @IsString()
    @IsNotEmpty()
    areasEvaluadas?: string;

    @IsString()
    @IsNotEmpty()
    nivelRiesgo?: string;

    @IsString()
    @IsNotEmpty()
    observaciones?: string;

    @IsString()
    @IsNotEmpty()
    plagasIdentificadas?: string;

    @IsNotEmpty()
    fecha!: Date;


}
