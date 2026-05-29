import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegistroPlagasDto {
    @IsString()
    @IsNotEmpty()
    registroId?: string;

    @IsString()
    @IsNotEmpty()
    programaPlagasId?: string;

    @IsString()
    @IsNotEmpty()
    tipoActividad?: string;

    @IsString()
    @IsNotEmpty()
    resultadoGeneral?: string;




}
