export interface EventosCorrespondenciaI {
    id?: number;
    correspondenciaId: number;
    sucursalId: number;
    empleadoId: number;
    estadoCorrespondenciaId: number;
    fechaEvento: Date;
    descripcion: string;
  }