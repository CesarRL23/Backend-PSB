import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEvidenciaPlagasDto {
                  @IsString()
                  @IsNotEmpty()
                  registroPlagasId!: string;
                
                
                  @IsNotEmpty()
                  fecha_carga: Date;
                
                  @IsString()
                  @IsNotEmpty()
                  tipoArchivo?: string;
            
                  @IsString()
                  @IsNotEmpty()
                  urlArchivo?: string;
                
                  @IsString()
                  @IsNotEmpty()
                  descripcion?: string; 
}
