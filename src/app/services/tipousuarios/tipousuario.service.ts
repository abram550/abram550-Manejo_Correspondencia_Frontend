import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoUsuarioI } from '../../models/usuario'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/tipousuarios`; // Ruta para la API de tipos de usuario

  constructor(private http: HttpClient) {}

  // Obtener todos los tipos de usuario
  getAllTipos(): Observable<{ tiposUsuario: TipoUsuarioI[] }> {
    return this.http.get<{ tiposUsuario: TipoUsuarioI[] }>(this.base_path);
  }

  // Obtener un tipo de usuario por su id
  getOneTipo(id: number): Observable<{ tipoUsuario: TipoUsuarioI }> {
    return this.http.get<{ tipoUsuario: TipoUsuarioI }>(`${this.base_path}/${id}`);
  }

  // Crear un nuevo tipo de usuario
  createTipo(data: any): Observable<TipoUsuarioI> {
    return this.http.post<TipoUsuarioI>(this.base_path, data);
  }

  // Actualizar un tipo de usuario existente
  updateTipo(id: number, data: any): Observable<TipoUsuarioI> {
    return this.http.put<TipoUsuarioI>(`${this.base_path}/${id}`, data);
  }

  // Eliminar un tipo de usuario
  deleteTipo(id: number): Observable<TipoUsuarioI> {
    return this.http.delete<TipoUsuarioI>(`${this.base_path}/${id}`);
  }
}
