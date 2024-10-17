import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioI, TipoUsuarioI } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/usuarios`;
  tipos_usuario_path = `${this.api_uri_node}/tipousuarioss`; // Ruta para tipos de usuario

  constructor(private http: HttpClient) { }

  getAllusuarios(): Observable<{ usuarios: UsuarioI[] }> {
    return this.http.get<{ usuarios: UsuarioI[] }>(this.base_path);
  }

  getOneusuarios(id: number): Observable<{ usuario: UsuarioI }> {
    return this.http.get<{ usuario: UsuarioI }>(`${this.base_path}/${id}`);
  }
  
  createusuarios(data: UsuarioI): Observable<UsuarioI> {
    return this.http.post<UsuarioI>(this.base_path, data);
  }

  updateusuarios(id: number, data: UsuarioI): Observable<UsuarioI> {
    return this.http.put<UsuarioI>(`${this.base_path}/${id}`, data);
  }

  deleteusuarios(id: number): Observable<UsuarioI> {
    return this.http.delete<UsuarioI>(`${this.base_path}/${id}`);
  }

  getAllTiposUsuario(): Observable<TipoUsuarioI[]> {
    return this.http.get<TipoUsuarioI[]>(this.tipos_usuario_path);
  }
  
}
