import { IsNotEmpty, IsString } from "class-validator";

export class CreateHallazgoPlagasDto {
                      @IsString()
                      @IsNotEmpty()
                      registroPlagaId!: string;

                      @IsString()
                      @IsNotEmpty()
                      tipoPlagaId!: string;
                    
                    
                    
                      @IsNotEmpty()
                      fecha: Date;
                    
                      @IsString()
                      @IsNotEmpty()
                      descripcion?: string;
                
                      @IsString()
                      @IsNotEmpty()
                      severidad?: string;
                    
                      @IsString()
                      @IsNotEmpty()
                      estado?: string;

                      @IsNotEmpty()
                      accionesCorrectivas?: string[];

}
