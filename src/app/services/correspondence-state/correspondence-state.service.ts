// src/app/services/correspondence-state/correspondence-state.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorrespondenceStateI } from '../../models/CorrespondenceState';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceStateService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/states`;

  constructor(private http: HttpClient) {}

  /** 
   * Retrieves all correspondence states
   * @returns Observable containing an array of CorrespondenceStateI objects
   */
  getAllCorrespondenceStates(): Observable<{ states: CorrespondenceStateI[] }> {
    return this.http.get<{ states: CorrespondenceStateI[] }>(this.base_path);
  }

  /** 
   * Retrieves a correspondence state by ID
   * @param id - Correspondence state ID to retrieve
   * @returns Observable containing a single CorrespondenceStateI object
   */
  getOneCorrespondenceState(id: number): Observable<{ state: CorrespondenceStateI }> {
    return this.http.get<{ state: CorrespondenceStateI }>(`${this.base_path}/${id}`);
  }

  /** 
   * Creates a new correspondence state
   * @param data - Correspondence state data to create
   * @returns Observable of the created CorrespondenceStateI
   */
  createCorrespondenceState(data: CorrespondenceStateI): Observable<CorrespondenceStateI> {
    return this.http.post<CorrespondenceStateI>(this.base_path, data);
  }

  /** 
   * Updates an existing correspondence state
   * @param id - ID of the correspondence state to update
   * @param data - Updated correspondence state data
   * @returns Observable of the updated CorrespondenceStateI
   */
  updateCorrespondenceState(id: number, data: CorrespondenceStateI): Observable<CorrespondenceStateI> {
    return this.http.put<CorrespondenceStateI>(`${this.base_path}/${id}`, data);
  }

  /** 
   * Deletes a correspondence state by ID
   * @param id - Correspondence state ID to delete
   * @returns Observable of the deleted CorrespondenceStateI
   */
  deleteCorrespondenceState(id: number): Observable<CorrespondenceStateI> {
    return this.http.delete<CorrespondenceStateI>(`${this.base_path}/${id}`);
  }
}
