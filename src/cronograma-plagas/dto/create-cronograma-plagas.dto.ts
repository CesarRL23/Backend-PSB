import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCronogramaPlagasDto {
              @IsString()
              @IsNotEmpty()
              programaPlagasId!: string;
            
              @IsNumber()
              @IsNotEmpty()
              anioVigencia?: number;
            
              @IsString()
              @IsNotEmpty()
              frecuenciaControl?: string;
        
              @IsString()
              @IsNotEmpty()
              metodoControl?: string;
            
              @IsString()
              @IsNotEmpty()
              responsable?: string; 
              

}
