// src/app/services/ruta/ruta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RutaI } from '../../models/ruta'; 
import { SucursalI } from '../../models/sucursal';
@Injectable({
  providedIn: 'root'
})
export class RutaService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/rutas`;
  sucursales_path = `${this.api_uri_node}/sucursaless`; // Ruta para sucursales

  constructor(private http: HttpClient) {}

  // Método para obtener todas las rutas
  getAllRutas(): Observable<{ rutas: RutaI[] }> {
    return this.http.get<{ rutas: RutaI[] }>(this.base_path);
  }

  // Método para obtener una ruta por ID
  getOneRuta(id: number): Observable<{ ruta: RutaI }> {
    return this.http.get<{ ruta: RutaI }>(`${this.base_path}/${id}`);
  }

  // Método para crear una nueva ruta
  createRuta(data: RutaI): Observable<RutaI> {
    return this.http.post<RutaI>(this.base_path, data);
  }

  // Método para actualizar una ruta existente
  updateRuta(id: number, data: RutaI): Observable<RutaI> {
    return this.http.put<RutaI>(`${this.base_path}/${id}`, data);
  }

  // Método para eliminar una ruta
  deleteRuta(id: number): Observable<RutaI> {
    return this.http.delete<RutaI>(`${this.base_path}/${id}`);
  }

  // Método para obtener todas las sucursales
  getAllSucursales(): Observable<SucursalI[]> {
    return this.http.get<SucursalI[]>(this.sucursales_path);
  }
}
