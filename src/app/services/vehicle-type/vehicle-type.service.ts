// src/app/services/vehicle-type/vehicle-type.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleTypeI } from '../../models/Transport'; // Ensure the path is correct

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  apiUriNode = 'http://localhost:4000';
  basePath = `${this.apiUriNode}/vehicle-types`; // API path for vehicle types

  constructor(private http: HttpClient) {}

  /**
   * Fetches all vehicle types from the API.
   * @returns Observable containing an object with a list of vehicle types.
   */
  getAllTypes(): Observable<{ vehicleTypes: VehicleTypeI[] }> {
    return this.http.get<{ vehicleTypes: VehicleTypeI[] }>(this.basePath);
  }

  /**
   * Fetches a single vehicle type by its ID from the API.
   * @param id - The unique identifier of the vehicle type to retrieve.
   * @returns Observable containing an object with the requested vehicle type.
   */
  getOneType(id: number): Observable<{ vehicleType: VehicleTypeI }> {
    return this.http.get<{ vehicleType: VehicleTypeI }>(`${this.basePath}/${id}`);
  }

  /**
   * Creates a new vehicle type in the database through the API.
   * @param data - The data of the vehicle type to create.
   * @returns Observable containing the created vehicle type.
   */
  createType(data: any): Observable<VehicleTypeI> {
    return this.http.post<VehicleTypeI>(this.basePath, data);
  }

  /**
   * Updates an existing vehicle type in the database through the API.
   * @param id - The unique identifier of the vehicle type to update.
   * @param data - The updated data for the vehicle type.
   * @returns Observable containing the updated vehicle type.
   */
  updateType(id: number, data: any): Observable<VehicleTypeI> {
    return this.http.put<VehicleTypeI>(`${this.basePath}/${id}`, data);
  }

  /**
   * Deletes a vehicle type by its ID in the database through the API.
   * @param id - The unique identifier of the vehicle type to delete.
   * @returns Observable containing the deleted vehicle type.
   */
  deleteType(id: number): Observable<VehicleTypeI> {
    return this.http.delete<VehicleTypeI>(`${this.basePath}/${id}`);
  }
}
