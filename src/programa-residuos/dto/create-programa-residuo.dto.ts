import { IsNotEmpty, IsString } from "class-validator";

export class CreateProgramaResiduoDto {

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
