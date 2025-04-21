import { AsignacionCatalogoService } from './asignacion-catalogo.service';
export declare class AsignacionCatalogoController {
    private readonly catalogoService;
    constructor(catalogoService: AsignacionCatalogoService);
    getMaterias(): Promise<{
        pk_id: number;
        nombre: string;
        clave: string;
        require_lab: boolean;
        require_pc: boolean;
        observaciones: string | null;
    }[]>;
    getDocentes(): Promise<({
        persona: {
            pk_id: number;
            nombre: string;
            fk_id_sexo: number;
            apellido: string;
            fecha_nacimiento: Date;
            correo_electronico: string;
            telefono: string;
            direccion: string;
            tipo: import(".prisma/client").$Enums.tipo_persona;
        };
    } & {
        pk_id: number;
        fk_id_persona: number;
        horas_max_semana: import("@prisma/client/runtime/library").Decimal;
        fecha_ingreso: Date;
        activo: boolean;
    })[]>;
    getAulas(): Promise<{
        pk_id: number;
        nombre: string;
        tipo: import(".prisma/client").$Enums.tipo_aula;
        capacidad: number;
        posicion: number;
        tiene_pc: boolean;
        tiene_proyector: boolean;
        tiene_lab: boolean;
    }[]>;
    getAniosEscolares(): Promise<{
        pk_id: number;
        nombre: string;
        fecha_inicio: Date;
        fecha_fin: Date;
    }[]>;
    getCursos(): Promise<{
        pk_id: number;
        nombre: string;
        descripcion: string | null;
    }[]>;
}
