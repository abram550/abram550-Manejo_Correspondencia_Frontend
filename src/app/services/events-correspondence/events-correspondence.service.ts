// src/app/services/eventos-correspondencia/events-correspondence.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorrespondenceEventsI } from '../../models/CorrespondenceEvents';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceEventsService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/events`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all correspondence events
   * @returns Observable with an array of CorrespondenceEventsI
   */
  getAllEvents(): Observable<{ events: CorrespondenceEventsI[] }> {
    return this.http.get<{ events: CorrespondenceEventsI[] }>(this.base_path);
  }

  /**
   * Retrieves a single correspondence event by ID
   * @param id - ID of the correspondence event to retrieve
   * @returns Observable with a CorrespondenceEventsI object
   */
  getOneEvent(id: number): Observable<{ event: CorrespondenceEventsI }> {
    return this.http.get<{ event: CorrespondenceEventsI }>(`${this.base_path}/${id}`);
  }

  /**
   * Creates a new correspondence event
   * @param data - Data for the new correspondence event
   * @returns Observable of the created CorrespondenceEventsI
   */
  createEvent(data: any): Observable<CorrespondenceEventsI> {
    return this.http.post<CorrespondenceEventsI>(this.base_path, data);
  }

  /**
   * Updates an existing correspondence event
   * @param id - ID of the correspondence event to update
   * @param data - Updated event data
   * @returns Observable of the updated CorrespondenceEventsI
   */
  updateEvent(id: number, data: any): Observable<CorrespondenceEventsI> {
    return this.http.put<CorrespondenceEventsI>(`${this.base_path}/${id}`, data);
  }

  /**
   * Deletes a correspondence event by ID
   * @param id - ID of the correspondence event to delete
   * @returns Observable of the deleted CorrespondenceEventsI
   */
  deleteEvent(id: number): Observable<CorrespondenceEventsI> {
    return this.http.delete<CorrespondenceEventsI>(`${this.base_path}/${id}`);
  }
}
