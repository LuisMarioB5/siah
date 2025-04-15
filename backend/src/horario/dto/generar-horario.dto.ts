import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, ValidateNested, IsEnum, IsDate, IsOptional } from 'class-validator';
import { tipo_bloque, dia_semana } from '@prisma/client';

export class BloqueDto {
  @IsEnum(tipo_bloque)
  tipo: tipo_bloque;

  @IsDate()
  hora_inicio: Date

  @IsDate()
  hora_fin: Date
  
  @IsOptional()
  @IsString()
  observacion: string
}

export class GenerarHorarioDto {

  @IsInt()
  anioEscolarId: number;

  @IsInt()
  cursoId: number;

  @IsArray()
  @IsInt({ each: true })
  materiasIds: number[];

  @IsArray()
  @IsInt({ each: true })
  docentesIds: number[];

  @IsArray()
  @IsEnum(dia_semana, { each: true })
  dias: dia_semana[]; 
  
  @IsArray()
  @IsInt({ each: true })
  aulasIds: number[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BloqueDto)
  bloques: BloqueDto[];
}
