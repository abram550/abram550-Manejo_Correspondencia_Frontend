// src/app/services/estado-correspondencia/estado-correspondencia.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoCorrespondenciaI } from '../../models/estadocorrespondencia'; 

@Injectable({
  providedIn: 'root'
})
export class EstadoCorrespondenciaService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/estados`;

  constructor(private http: HttpClient) {}

  getAllEstados(): Observable<{ estados: EstadoCorrespondenciaI[] }> {
    return this.http.get<{ estados: EstadoCorrespondenciaI[] }>(this.base_path);
  }

  getOneEstado(id: number): Observable<{ estado: EstadoCorrespondenciaI }> {
    return this.http.get<{ estado: EstadoCorrespondenciaI }>(`${this.base_path}/${id}`);
  }

  createEstado(data: any): Observable<EstadoCorrespondenciaI> {
    return this.http.post<EstadoCorrespondenciaI>(this.base_path, data);
  }

  updateEstado(id: number, data: any): Observable<EstadoCorrespondenciaI> {
    return this.http.put<EstadoCorrespondenciaI>(`${this.base_path}/${id}`, data);
  }

  deleteEstado(id: number): Observable<EstadoCorrespondenciaI> {
    return this.http.delete<EstadoCorrespondenciaI>(`${this.base_path}/${id}`);
  }
}
