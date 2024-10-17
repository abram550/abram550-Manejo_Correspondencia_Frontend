import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorrespondenciaI, } from '../../models/correspondencia'; 
import { UsuarioI } from '../../models/usuario';
import { EmpleadoI } from '../../models/empleado';
import { TipoCorrespondenciaI } from '../../models/tipocorrespondencia';
import { EstadoCorrespondenciaI } from '../../models/estadocorrespondencia';
import { SucursalI } from '../../models/sucursal';
import { TransporteI } from '../../models/transporte';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenciaService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/correspondencia`;
  usuarios_path = `${this.api_uri_node}/usuarioss`;
  empleados_path = `${this.api_uri_node}/empleadoss`;
  tiposCorrespondencia_path = `${this.api_uri_node}/tipo-correspondenciaa`;
  estadosCorrespondencia_path = `${this.api_uri_node}/estadoss`;
  sucursales_path = `${this.api_uri_node}/sucursaless`;
  transportes_path = `${this.api_uri_node}/transportess`;

  constructor(private http: HttpClient) {}

  // Método para obtener todas las correspondencias
  getAllCorrespondencias(): Observable<{ correspondencias: CorrespondenciaI[] }> {
    return this.http.get<{ correspondencias: CorrespondenciaI[] }>(this.base_path);
  }

  // Método para obtener una correspondencia por ID
  getOneCorrespondencia(id: number): Observable<{ correspondencia: CorrespondenciaI }> {
    return this.http.get<{ correspondencia: CorrespondenciaI }>(`${this.base_path}/${id}`);
  }

  // Método para crear una nueva correspondencia
  createCorrespondencia(data: CorrespondenciaI): Observable<CorrespondenciaI> {
    return this.http.post<CorrespondenciaI>(this.base_path, data);
  }

  // Método para actualizar una correspondencia existente
  updateCorrespondencia(id: number, data: CorrespondenciaI): Observable<CorrespondenciaI> {
    return this.http.put<CorrespondenciaI>(`${this.base_path}/${id}`, data);
  }

  // Método para eliminar una correspondencia
  deleteCorrespondencia(id: number): Observable<CorrespondenciaI> {
    return this.http.delete<CorrespondenciaI>(`${this.base_path}/${id}`);
  }

  // Método para obtener todos los usuarios
  getAllUsuarios(): Observable<UsuarioI[]> {
    return this.http.get<UsuarioI[]>(this.usuarios_path);
  }

  // Método para obtener un usuario por ID
  getOneUsuario(id: number): Observable<{ usuario: UsuarioI }> {
    return this.http.get<{ usuario: UsuarioI }>(`${this.usuarios_path}/${id}`);
  }

  // Método para obtener todos los empleados
  getAllEmpleados(): Observable<EmpleadoI[]> {
    return this.http.get<EmpleadoI[]>(this.empleados_path);
  }

  // Método para obtener un empleado por ID
  getOneEmpleado(id: number): Observable<{ empleado: EmpleadoI }> {
    return this.http.get<{ empleado: EmpleadoI }>(`${this.empleados_path}/${id}`);
  }

  // Método para obtener todos los tipos de correspondencia
  getAllTiposCorrespondencia(): Observable<TipoCorrespondenciaI[]> {
    return this.http.get<TipoCorrespondenciaI[]>(this.tiposCorrespondencia_path);
  }

  // Método para obtener un tipo de correspondencia por ID
  getOneTipoCorrespondencia(id: number): Observable<{ tipoCorrespondencia: TipoCorrespondenciaI }> {
    return this.http.get<{ tipoCorrespondencia: TipoCorrespondenciaI }>(`${this.tiposCorrespondencia_path}/${id}`);
  }

  // Método para obtener todos los estados de correspondencia
  getAllEstadosCorrespondencia(): Observable<EstadoCorrespondenciaI[]> {
    return this.http.get<EstadoCorrespondenciaI[]>(this.estadosCorrespondencia_path);
  }

  // Método para obtener un estado de correspondencia por ID
  getOneEstadoCorrespondencia(id: number): Observable<{ estadoCorrespondencia: EstadoCorrespondenciaI }> {
    return this.http.get<{ estadoCorrespondencia: EstadoCorrespondenciaI }>(`${this.estadosCorrespondencia_path}/${id}`);
  }

  // Método para obtener todas las sucursales
  getAllSucursales(): Observable<SucursalI[]> {
    return this.http.get<SucursalI[]>(this.sucursales_path);
  }

  // Método para obtener una sucursal por ID
  getOneSucursal(id: number): Observable<{ sucursal: SucursalI }> {
    return this.http.get<{ sucursal: SucursalI }>(`${this.sucursales_path}/${id}`);
  }

  // Método para obtener todos los transportes
  getAllTransportes(): Observable<TransporteI[]> {
    return this.http.get<TransporteI[]>(this.transportes_path);
  }

  // Método para obtener un transporte por ID
  getOneTransporte(id: number): Observable<{ transporte: TransporteI }> {
    return this.http.get<{ transporte: TransporteI }>(`${this.transportes_path}/${id}`);
  }
}
