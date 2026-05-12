import { IsNotEmpty, IsString } from "class-validator";
export class CreateAreaPlagasDto {
              @IsString()
              @IsNotEmpty()
              programaPlagasId!: string;
            
              @IsString()
              @IsNotEmpty()
              nombre?: string;
            
              @IsString()
              @IsNotEmpty()
              descripcion?: string;
        
              @IsString()
              @IsNotEmpty()
              nivelRiesgo?: string;
            
}
