// src/app/services/transport/transport.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransportI, VehicleTypeI } from '../../models/Transport';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransportService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/transports`;
  vehicle_types_path = `${this.api_uri_node}/vehicleTypes`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all transports from the server.
   */
  getAllTransports(): Observable<{ transports: TransportI[] }> {
    return this.http.get<{ transports: TransportI[] }>(this.base_path);
  }

  /**
   * Retrieves a specific transport by ID.
   */
  getOneTransport(id: number): Observable<{ transport: TransportI }> {
    return this.http.get<{ transport: TransportI }>(`${this.base_path}/${id}`);
  }

  /**
   * Creates a new transport on the server.
   */
  createTransport(data: TransportI): Observable<TransportI> {
    return this.http.post<TransportI>(this.base_path, data);
  }

  /**
   * Updates an existing transport on the server.
   */
  updateTransport(id: number, data: TransportI): Observable<TransportI> {
    return this.http.put<TransportI>(`${this.base_path}/${id}`, data);
  }

  /**
   * Deletes a transport from the server by ID.
   */
  deleteTransport(id: number): Observable<TransportI> {
    return this.http.delete<TransportI>(`${this.base_path}/${id}`);
  }

  /**
   * Retrieves all vehicle types from the server.
   */
  getAllVehicleTypes(): Observable<VehicleTypeI[]> {
    return this.http.get<{ vehicleTypes: VehicleTypeI[] }>(this.vehicle_types_path).pipe(
      map((data) => data.vehicleTypes),
      catchError((error) => {
        console.error('Error fetching vehicle types:', error);
        return of([]);
      })
    );
  }
}
