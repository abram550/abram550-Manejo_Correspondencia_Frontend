// src/app/services/correspondence-type/correspondence-type.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorrespondenceTypeI } from '../../models/CorrespondenceType';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceTypeService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/correspondence-types`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all correspondence types from the server.
   */
  getAllTypes(): Observable<{ types: CorrespondenceTypeI[] }> {
    return this.http.get<{ types: CorrespondenceTypeI[] }>(this.base_path);
  }

  /**
   * Retrieves a specific correspondence type by ID.
   */
  getOneType(id: number): Observable<{ type: CorrespondenceTypeI }> {
    return this.http.get<{ type: CorrespondenceTypeI }>(`${this.base_path}/${id}`);
  }

  /**
   * Creates a new correspondence type on the server.
   */
  createType(data: any): Observable<CorrespondenceTypeI> {
    return this.http.post<CorrespondenceTypeI>(this.base_path, data);
  }

  /**
   * Updates an existing correspondence type on the server.
   */
  updateType(id: number, data: any): Observable<CorrespondenceTypeI> {
    return this.http.put<CorrespondenceTypeI>(`${this.base_path}/${id}`, data);
  }

  /**
   * Deletes a correspondence type from the server by ID.
   */
  deleteType(id: number): Observable<CorrespondenceTypeI> {
    return this.http.delete<CorrespondenceTypeI>(`${this.base_path}/${id}`);
  }
}
