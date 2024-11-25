import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // Base URL de la API
  private apiUri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los usuarios.
   * @returns Observable con un array de usuarios.
   */
  getAllUsers(): Observable<{ users: UserI[] }> {
    return this.http.get<{ users: UserI[] }>(this.apiUri);
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id - ID del usuario a obtener.
   * @returns Observable con el usuario solicitado.
   */
  getOneUser(id: number): Observable<{ user: UserI }> {
    return this.http.get<{ user: UserI }>(`${this.apiUri}/${id}`);
  }

  /**
   * Crea un nuevo usuario.
   * @param data - Datos del usuario a crear.
   * @returns Observable con el usuario creado.
   */
  createUser(data: Partial<UserI>): Observable<UserI> {
    return this.http.post<UserI>(this.apiUri, data);
  }

  /**
   * Actualiza un usuario existente.
   * @param id - ID del usuario a actualizar.
   * @param data - Datos actualizados del usuario.
   * @returns Observable con el usuario actualizado.
   */
  updateUser(id: number, data: Partial<UserI>): Observable<UserI> {
    return this.http.put<UserI>(`${this.apiUri}/${id}`, data);
  }

  /**
   * Elimina un usuario (borrado lógico utilizando `status`).
   * @param id - ID del usuario a eliminar.
   * @returns Observable con el usuario eliminado.
   */
  deleteUser(id: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUri}/${id}`);
  }
}
