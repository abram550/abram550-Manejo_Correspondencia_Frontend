export interface EmpleadoI {
  id?: number;
  nombre: string;
  correo: string;
  telefono: string;
  tipoEmpleado: TipoEmpleadoI; // Mantenemos el objeto completo
  tipoEmpleadoId: number; // Asegúrate de tener este campo
}

export interface TipoEmpleadoI {
  id: number;
  puesto: string;
}
