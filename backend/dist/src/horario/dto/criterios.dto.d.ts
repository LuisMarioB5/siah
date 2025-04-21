export declare class DocenteCriteria {
    antiguedad: number;
    disponibilidad: number;
    experiencia: number;
    especialidad: number;
}
export declare class AulaCriteria {
    capacidad: number;
    equipamiento: number;
    ubicacion: number;
}
export declare class CustomCriteria {
    nombre: string;
    puntos: number;
}
export declare class OpcionesAvanzadas {
    balancearCarga: boolean;
    minimizarDesplazamientos: boolean;
    horasConsecutivas: boolean;
    especializacion: boolean;
}
export declare class CriteriaDto {
    docente: DocenteCriteria;
    aula: AulaCriteria;
    personalizados: CustomCriteria[];
    opcionesAvanzadas: OpcionesAvanzadas;
    maxHorasDocente: number;
    maxVecesDocente: number;
    umbralMinimo: number;
    notas?: string;
}
