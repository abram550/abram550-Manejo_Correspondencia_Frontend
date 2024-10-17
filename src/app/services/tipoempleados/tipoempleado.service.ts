import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEmpleadoI } from '../../models/empleado'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class TipoEmpleadoService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/tipoempleados`; // Ruta para la API de tipo empleados

  constructor(private http: HttpClient) {}

  // Obtener todos los tipos de empleados
  getAllTipos(): Observable<{ tiposEmpleado: TipoEmpleadoI[] }> {
    return this.http.get<{ tiposEmpleado: TipoEmpleadoI[] }>(this.base_path);
  }

  // Obtener un tipo de empleado por su id
  getOneTipo(id: number): Observable<{ tipoEmpleado: TipoEmpleadoI }> {
    return this.http.get<{ tipoEmpleado: TipoEmpleadoI }>(`${this.base_path}/${id}`);
  }

  // Crear un nuevo tipo de empleado
  createTipo(data: any): Observable<TipoEmpleadoI> {
    return this.http.post<TipoEmpleadoI>(this.base_path, data);
  }

  // Actualizar un tipo de empleado existente
  updateTipo(id: number, data: any): Observable<TipoEmpleadoI> {
    return this.http.put<TipoEmpleadoI>(`${this.base_path}/${id}`, data);
  }

  // Eliminar un tipo de empleado
  deleteTipo(id: number): Observable<TipoEmpleadoI> {
    return this.http.delete<TipoEmpleadoI>(`${this.base_path}/${id}`);
  }
}
