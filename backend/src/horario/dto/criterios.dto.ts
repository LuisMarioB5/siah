import { IsInt, IsBoolean, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class DocenteCriteria {
  @IsInt() 
  antiguedad: number;
  
  @IsInt() 
  disponibilidad: number;
  
  @IsInt() 
  experiencia: number;
  
  @IsInt() 
  especialidad: number;
}

export class AulaCriteria {
  @IsInt()
  capacidad: number;
  
  @IsInt()
  equipamiento: number;
  
  @IsInt()
  ubicacion: number;
}

export class CustomCriteria {
  @IsString()
  nombre: string;

  @IsInt()
  puntos: number;
}

export class OpcionesAvanzadas {
  @IsBoolean()
  balancearCarga: boolean;
  
  @IsBoolean()
  minimizarDesplazamientos: boolean;
  
  @IsBoolean()
  horasConsecutivas: boolean;
  
  @IsBoolean()
  especializacion: boolean;
}

export class CriteriaDto {
  @ValidateNested()
  @Type(() => DocenteCriteria)
  docente: DocenteCriteria

  @ValidateNested()
  @Type(() => AulaCriteria)
  aula: AulaCriteria

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomCriteria)
  personalizados: CustomCriteria[];

  @ValidateNested()
  @Type(() => OpcionesAvanzadas)
  opcionesAvanzadas: OpcionesAvanzadas

  @IsInt()
  maxHorasDocente: number;

  @IsInt()
  maxVecesDocente: number;

  @IsInt()
  umbralMinimo: number;

  @IsOptional()
  @IsString()
  notas?: string;
}