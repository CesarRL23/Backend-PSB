import { IsString, IsNotEmpty } from "class-validator";

export class CreateProgramaPlagasDto {
      @IsString()
      @IsNotEmpty()
      programaId?: string;
    
      @IsString()
      @IsNotEmpty()
      objetivo?: string;
    
      @IsString()
      @IsNotEmpty()
      nivel_riesgo?: string;

      @IsString()
      @IsNotEmpty()
      alcance?: string;
    
      @IsString()
      @IsNotEmpty()
      procGeneral?: string; 
      
      @IsNotEmpty()
      fecha_envio?: Date;

      @IsNotEmpty()
      fecha_limite?: Date;

      @IsNotEmpty()
      empresaFumigadoraIds?: string[];

      @IsNotEmpty()
      diagnosticoPlagasIds?: string[];

      @IsNotEmpty()
      cronogramaPlagasIds?: string[];

      @IsNotEmpty()
      areaPlagasIds?: string[];

      @IsNotEmpty()
      plaguicidaIds?: string[];

      @IsNotEmpty()
      registroPlagasIds?: string[];





}
