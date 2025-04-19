import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, IsDateString, ValidateNested, IsEnum, IsOptional } from 'class-validator';
import { tipo_bloque, dia_semana } from '@prisma/client';

export class BloqueDto {
  @IsEnum(tipo_bloque)
  tipo: tipo_bloque;

  @IsString()
  @IsDateString()
  hora_inicio: string;

  @IsString()
  @IsDateString()
  hora_fin: string;
  
  @IsOptional()
  @IsString()
  observacion: string;
}

export class GenerarHorarioDto {
  @IsInt()
  anioEscolarId: number;

  @IsArray()
  @IsInt({ each: true })
  cursoIds: number[];

  @IsArray()
  @IsEnum(dia_semana, { each: true })
  dias: dia_semana[]; 

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BloqueDto)
  bloques: BloqueDto[];
}
