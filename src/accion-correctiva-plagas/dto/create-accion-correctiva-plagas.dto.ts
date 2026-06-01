import { IsNotEmpty, IsString } from "class-validator";

export class CreateAccionCorrectivaPlagasDto {
    @IsString()
    @IsNotEmpty()
    hallazgoPlagaId!: string;

    @IsString()
    @IsNotEmpty()
    plaguicidaId!: string;


    @IsNotEmpty()
    fecha: Date;

    @IsString()
    @IsNotEmpty()
    descripcion?: string;

    @IsString()
    @IsNotEmpty()
    responsable?: string;

    @IsString()
    @IsNotEmpty()
    estado?: string;

    @IsString()
    @IsNotEmpty()
    prioridad?: string;

}
