// src/app/services/employee-type/employee-type.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeTypeI } from '../../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/employee-types`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all employee types from the server.
   */
  getAllTypes(): Observable<{ employeeTypes: EmployeeTypeI[] }> {
    return this.http.get<{ employeeTypes: EmployeeTypeI[] }>(this.base_path);
  }

  /**
   * Retrieves a specific employee type by ID.
   */
  getOneType(id: number): Observable<{ employeeType: EmployeeTypeI }> {
    return this.http.get<{ employeeType: EmployeeTypeI }>(`${this.base_path}/${id}`);
  }

  /**
   * Creates a new employee type on the server.
   */
  createType(data: any): Observable<EmployeeTypeI> {
    return this.http.post<EmployeeTypeI>(this.base_path, data);
  }

  /**
   * Updates an existing employee type on the server.
   */
  updateType(id: number, data: any): Observable<EmployeeTypeI> {
    return this.http.put<EmployeeTypeI>(`${this.base_path}/${id}`, data);
  }

  /**
   * Deletes an employee type from the server by ID.
   */
  deleteType(id: number): Observable<EmployeeTypeI> {
    return this.http.delete<EmployeeTypeI>(`${this.base_path}/${id}`);
  }
}
