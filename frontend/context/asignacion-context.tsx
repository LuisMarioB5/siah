import { string } from "prop-types";
import { createContext, useContext, useState, ReactNode } from "react";

// 1. Definimos la estructura de los datos que se manejarán
interface DatosAsignacion {
  // Página 1
  anioId: number | null;
  cursoId: number | null;
  materiasIds: number[];
  dias: string[];
  docentesIds: number[];
  aulasIds: number[];
  requisitos: {
    requiere_lab: boolean;
    requiere_proyector: boolean;
    requiere_pc: boolean;
  };

  // Página 2
  bloques: {
    id: number,
    tipo: string;
    horaInicio: string;
    horaFin: string;
    observacion: string;
  }[];

  // Página 3
  criterios: {
    docente: {
      antiguedad: number,
      disponibilidad: number,
      experiencia: number,
      especialidad: number,
    },
    aula: {
      capacidad: number,
      equipamiento: number,
      ubicacion: number,
    },
    personalizados: {
      nombre: string,
      puntos: number
    }[],
    opcionesAvanzadas: {
      balancearCarga: boolean,
      minimizarDesplazamientos: boolean,
      horasConsecutivas: boolean,
      especializacion: boolean,
    },
    maxHorasDocente: number,
    maxVecesDocente: number,
    umbralMinimo: number,
    notas: string
  }
}

// 2. Definimos el tipo del contexto
interface AsignacionContextType {
  datosAsignacion: DatosAsignacion;
  updateAsignacion: (nuevosDatos: Partial<DatosAsignacion>) => void;
}

// 3. Creamos el contexto correctamente
const AsignacionContext = createContext<AsignacionContextType | undefined>(undefined);

// 4. Proveedor
export const AsignacionProvider = ({ children }: { children: ReactNode }) => {
  const [datosAsignacion, setDatosAsignacion] = useState<DatosAsignacion>({
    anioId: null,
    cursoId: null,
    materiasIds: [],
    dias: [],
    docentesIds: [],
    aulasIds: [],
    requisitos: {
      requiere_lab: false,
      requiere_proyector: false,
      requiere_pc: false,
    },
    bloques: [],
    criterios: [],
  });

  const updateAsignacion = (nuevosDatos: Partial<DatosAsignacion>) => {
    setDatosAsignacion((prev) => ({
      ...prev,
      ...nuevosDatos,
    }));
  };

  return (
    <AsignacionContext.Provider value={{ datosAsignacion, updateAsignacion }}>
      {children}
    </AsignacionContext.Provider>
  );
};

// 5. Hook para usar el contexto
export const useAsignacion = () => {
  const context = useContext(AsignacionContext);
  if (!context) throw new Error("useAsignacion debe usarse dentro de AsignacionProvider");
  return context;
};
