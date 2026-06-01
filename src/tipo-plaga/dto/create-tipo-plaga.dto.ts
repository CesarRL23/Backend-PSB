import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoPlagaDto {
              @IsString()
              @IsNotEmpty()
              nombre?: string;
            
              @IsString()
              @IsNotEmpty()
              categoria?: string;
            
              @IsString()
              @IsNotEmpty()
              riesgoSanitario?: string;

        
}
