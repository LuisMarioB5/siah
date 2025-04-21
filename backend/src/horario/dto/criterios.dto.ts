// src/horario/dto/criteria.dto.ts
import { IsInt, IsBoolean, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomCriteria {
  @IsString()
  nombre: string;

  @IsInt()
  puntos: number;
}

export class CriteriaDto {
  @ValidateNested()
  @Type(() => Object)
  docente: {
    antiguedad: number;
    disponibilidad: number;
    experiencia: number;
    especialidad: number;
  };

  @ValidateNested()
  @Type(() => Object)
  aula: {
    capacidad: number;
    equipamiento: number;
    ubicacion: number;
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomCriteria)
  personalizados: CustomCriteria[];

  @ValidateNested()
  @Type(() => Object)
  opcionesAvanzadas: {
    balancearCarga: boolean;
    minimizarDesplazamientos: boolean;
    horasConsecutivas: boolean;
    especializacion: boolean;
  };

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
