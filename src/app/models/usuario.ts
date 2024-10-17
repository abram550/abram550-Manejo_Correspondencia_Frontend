export interface TipoUsuarioI {
  id: number;
  descripcion: string;
}

export interface UsuarioI {
  id?: number;
  nombre: string;
  direccion: string;
  correo: string;
  telefono: string;
  tipoUsuario: TipoUsuarioI; // Mantenemos el objeto completo
  tipoUsuarioId: number;
}
