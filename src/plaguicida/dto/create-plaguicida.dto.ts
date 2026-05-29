import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlaguicidaDto {
              @IsString()
              @IsNotEmpty()
              programaPlagasId!: string;
            
              @IsString()
              @IsNotEmpty()
              codigoRegistro?: string;
            
              @IsString()
              @IsNotEmpty()
              nombreComercial?: string;
        
              @IsString()
              @IsNotEmpty()
              ingredienteActivo?: string;
            
              @IsString()
              @IsNotEmpty()
              categoriaOms?: string; 

              @IsString()
              @IsNotEmpty()
              dosisAplicacion?: string;

              
              @IsString()
              @IsNotEmpty()
              registroIca?: string;


              @IsString()
              @IsNotEmpty()
              fichaTecnicaUrl?: string;

              @IsNotEmpty()
              accionesCorrectivasPlagas!: string[];
              

}
