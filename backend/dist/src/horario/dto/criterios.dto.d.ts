export declare class CustomCriteria {
    nombre: string;
    puntos: number;
}
export declare class CriteriaDto {
    docente: {
        antiguedad: number;
        disponibilidad: number;
        experiencia: number;
        especialidad: number;
    };
    aula: {
        capacidad: number;
        equipamiento: number;
        ubicacion: number;
    };
    personalizados: CustomCriteria[];
    opcionesAvanzadas: {
        balancearCarga: boolean;
        minimizarDesplazamientos: boolean;
        horasConsecutivas: boolean;
        especializacion: boolean;
    };
    maxHorasDocente: number;
    maxVecesDocente: number;
    umbralMinimo: number;
    notas?: string;
}
