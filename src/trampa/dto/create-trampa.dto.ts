import { IsNotEmpty, IsString } from "class-validator";

export class CreateTrampaDto {
    @IsString()
    @IsNotEmpty()
    areaPlagaId!: string;

    @IsString()
    @IsNotEmpty()
    codigo!: string;



    @IsNotEmpty()
    fecha_instalacion: Date;

    @IsNotEmpty()
    ultima_revision: Date;

    @IsString()
    @IsNotEmpty()
    tipo?: string;

    @IsString()
    @IsNotEmpty()
    ubicacion?: string;

    @IsString()
    @IsNotEmpty()
    estado?: string;

    @IsNotEmpty()
    accionesCorrectivas?: string[];
}
