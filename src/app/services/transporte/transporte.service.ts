// src/app/services/transporte/transporte.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransporteI, TipoVehiculoI } from '../../models/transporte'; 

@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/transportes`;
  tipos_vehiculo_path = `${this.api_uri_node}/tipovehiculoss`; // Ruta para tipos de vehículos

  constructor(private http: HttpClient) {}

  getAllTransportes(): Observable<{ transportes: TransporteI[] }> {
    return this.http.get<{ transportes: TransporteI[] }>(this.base_path);
  }

  getOneTransporte(id: number): Observable<{ transporte: TransporteI }> {
    return this.http.get<{ transporte: TransporteI }>(`${this.base_path}/${id}`);
  }

  createTransporte(data: TransporteI): Observable<TransporteI> {
    return this.http.post<TransporteI>(this.base_path, data);
  }

  updateTransporte(id: number, data: TransporteI): Observable<TransporteI> {
    return this.http.put<TransporteI>(`${this.base_path}/${id}`, data);
  }

  deleteTransporte(id: number): Observable<TransporteI> {
    return this.http.delete<TransporteI>(`${this.base_path}/${id}`);
  }

  // Método para obtener todos los tipos de vehículos
  getAllTiposVehiculo(): Observable<TipoVehiculoI[]> {
    return this.http.get<TipoVehiculoI[]>(this.tipos_vehiculo_path);
  }
}
