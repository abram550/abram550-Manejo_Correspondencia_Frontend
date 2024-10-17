// src/app/services/empleados/empleados.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpleadoI, TipoEmpleadoI } from '../../models/empleado'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/empleados`;
  tipos_empleado_path = `${this.api_uri_node}/tipoempleadoss`; // Ruta para tipos de empleados

  constructor(private http: HttpClient) {}

  getAllEmpleados(): Observable<{ empleados: EmpleadoI[] }> {
    return this.http.get<{ empleados: EmpleadoI[] }>(this.base_path);
  }

  getOneEmpleado(id: number): Observable<{ empleado: EmpleadoI }> {
    return this.http.get<{ empleado: EmpleadoI }>(`${this.base_path}/${id}`);
  }

  createEmpleado(data: EmpleadoI): Observable<EmpleadoI> {
    return this.http.post<EmpleadoI>(this.base_path, data);
  }

  updateEmpleado(id: number, data: EmpleadoI): Observable<EmpleadoI> {
    return this.http.put<EmpleadoI>(`${this.base_path}/${id}`, data);
  }
  

  deleteEmpleado(id: number): Observable<EmpleadoI> {
    return this.http.delete<EmpleadoI>(`${this.base_path}/${id}`);
  }

  getAllTiposEmpleado(): Observable<TipoEmpleadoI[]> {
    return this.http.get<TipoEmpleadoI[]>(this.tipos_empleado_path);
  }
}
