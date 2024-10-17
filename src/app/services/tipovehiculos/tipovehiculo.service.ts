import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoVehiculoI } from '../../models/transporte'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class TipovehiculoService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/tipovehiculos`; // Ruta para la API de tipos de vehículos

  constructor(private http: HttpClient) {}

  // Obtener todos los tipos de vehículos
  getAllTipos(): Observable<{ tiposVehiculo: TipoVehiculoI[] }> {
    return this.http.get<{ tiposVehiculo: TipoVehiculoI[] }>(this.base_path);
  }

  // Obtener un tipo de vehículo por su id
  getOneTipo(id: number): Observable<{ tipoVehiculo: TipoVehiculoI }> {
    return this.http.get<{ tipoVehiculo: TipoVehiculoI }>(`${this.base_path}/${id}`);
  }

  // Crear un nuevo tipo de vehículo
  createTipo(data: any): Observable<TipoVehiculoI> {
    return this.http.post<TipoVehiculoI>(this.base_path, data);
  }

  // Actualizar un tipo de vehículo existente
  updateTipo(id: number, data: any): Observable<TipoVehiculoI> {
    return this.http.put<TipoVehiculoI>(`${this.base_path}/${id}`, data);
  }

  // Eliminar un tipo de vehículo
  deleteTipo(id: number): Observable<TipoVehiculoI> {
    return this.http.delete<TipoVehiculoI>(`${this.base_path}/${id}`);
  }
}
