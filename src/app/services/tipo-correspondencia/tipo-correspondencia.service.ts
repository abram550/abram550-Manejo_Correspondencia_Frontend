// src/app/services/tipo-correspondencia/tipo-correspondencia.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCorrespondenciaI } from '../../models/tipocorrespondencia'; 

@Injectable({
  providedIn: 'root'
})
export class TipoCorrespondenciaService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/tipo-correspondencia`;

  constructor(private http: HttpClient) {}

  getAllTipos(): Observable<{ tipos: TipoCorrespondenciaI[] }> {
    return this.http.get<{ tipos: TipoCorrespondenciaI[] }>(this.base_path);
  }

  getOneTipo(id: number): Observable<{ tipo: TipoCorrespondenciaI }> {
    return this.http.get<{ tipo: TipoCorrespondenciaI }>(`${this.base_path}/${id}`);
  }

  createTipo(data: any): Observable<TipoCorrespondenciaI> {
    return this.http.post<TipoCorrespondenciaI>(this.base_path, data);
  }

  updateTipo(id: number, data: any): Observable<TipoCorrespondenciaI> {
    return this.http.put<TipoCorrespondenciaI>(`${this.base_path}/${id}`, data);
  }

  deleteTipo(id: number): Observable<TipoCorrespondenciaI> {
    return this.http.delete<TipoCorrespondenciaI>(`${this.base_path}/${id}`);
  }
}
