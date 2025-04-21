import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { tipo_bloque } from '@prisma/client';

export class BloqueDto {
  @IsEnum(tipo_bloque)
  tipo: tipo_bloque;

  @IsDateString()
  hora_inicio: string;

  @IsDateString()
  hora_fin: string;

  @IsOptional() @IsString()
  observacion?: string;
}
