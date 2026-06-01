import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmpresaFumigadoraDto {
          @IsString()
          @IsNotEmpty()
          programaPlagasId?: string;
        
          @IsString()
          @IsNotEmpty()
          nit?: string;
        
          @IsString()
          @IsNotEmpty()
          nombre_empresa?: string;
    
          @IsString()
          @IsNotEmpty()
          numCerSanitario?: string;
        
          @IsString()
          @IsNotEmpty()
          registroSds?: string; 
          
          @IsNotEmpty()
          fechaVencCer?: Date;

          @IsString()
          @IsNotEmpty()
          telefonoContacto?: string;
    
}
