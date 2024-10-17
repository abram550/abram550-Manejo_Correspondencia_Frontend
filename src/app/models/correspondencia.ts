export interface CorrespondenciaI {
  id?: number; // Asegúrate de que el id sea opcional
  remitenteId: number;
  destinatarioId: number;
  empleadoId: number;
  tipoCorrespondenciaId: number;
  estadoCorrespondenciaId: number;
  sucursalOrigenId: number;
  sucursalDestinoId: number;
  transporteId: number;
  fechaEnvio: Date; // Cambia a Date si es necesario
  fechaEntrega: Date; // Cambia a Date si es necesario
  descripcion: string;
}
