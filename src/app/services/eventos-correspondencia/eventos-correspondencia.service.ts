// src/app/services/eventos-correspondencia/eventos-correspondencia.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventosCorrespondenciaI } from '../../models/eventoscorrespondencia'; 

@Injectable({
  providedIn: 'root'
})
export class EventosCorrespondenciaService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/eventos`;

  constructor(private http: HttpClient) {}

  getAllEventos(): Observable<{ eventos: EventosCorrespondenciaI[] }> {
    return this.http.get<{ eventos: EventosCorrespondenciaI[] }>(this.base_path);
  }

  getOneEvento(id: number): Observable<{ evento: EventosCorrespondenciaI }> {
    return this.http.get<{ evento: EventosCorrespondenciaI }>(`${this.base_path}/${id}`);
  }

  createEvento(data: any): Observable<EventosCorrespondenciaI> {
    return this.http.post<EventosCorrespondenciaI>(this.base_path, data);
  }

  updateEvento(id: number, data: any): Observable<EventosCorrespondenciaI> {
    return this.http.put<EventosCorrespondenciaI>(`${this.base_path}/${id}`, data);
  }

  deleteEvento(id: number): Observable<EventosCorrespondenciaI> {
    return this.http.delete<EventosCorrespondenciaI>(`${this.base_path}/${id}`);
  }
}
