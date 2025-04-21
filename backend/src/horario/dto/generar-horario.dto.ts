import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  ValidateNested,
  IsEnum
} from 'class-validator';
import { BloqueDto } from './bloque.dto';
import { CriteriaDto } from './criterios.dto';
import { dia_semana } from '@prisma/client';

export class GenerarHorarioDto {
  @IsInt() 
  anioEscolarId: number;

  @IsArray() @IsInt({ each: true })
  cursoIds: number[];

  @IsArray() @IsEnum(dia_semana, { each: true })
  dias: dia_semana[];

  @IsArray() @ValidateNested({ each: true })
  @Type(() => BloqueDto)
  bloques: BloqueDto[];

  @ValidateNested()
  @Type(() => CriteriaDto)
  criterios: CriteriaDto;
}
