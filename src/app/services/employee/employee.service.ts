// src/app/services/employees/employees.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeI, EmployeeTypeI } from '../../models/Employee';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/employees`;
  employeeTypes_path = `${this.api_uri_node}/employee-types`;

  constructor(private http: HttpClient) {}

  /** 
   * Retrieves all employees
   * @returns Observable containing an array of EmployeeI objects
   */
  getAllEmployees(): Observable<{ employees: EmployeeI[] }> {
    return this.http.get<{ employees: EmployeeI[] }>(this.base_path);
  }

  /** 
   * Retrieves an employee by ID
   * @param id - Employee ID to retrieve
   * @returns Observable containing a single EmployeeI object
   */
  getOneEmployee(id: number): Observable<{ employee: EmployeeI }> {
    return this.http.get<{ employee: EmployeeI }>(`${this.base_path}/${id}`);
  }

  /** 
   * Creates a new employee
   * @param data - Employee data to create
   * @returns Observable of the created EmployeeI
   */
  createEmployee(data: EmployeeI): Observable<EmployeeI> {
    return this.http.post<EmployeeI>(this.base_path, data);
  }

  /** 
   * Updates an existing employee
   * @param id - ID of the employee to update
   * @param data - Updated employee data
   * @returns Observable of the updated EmployeeI
   */
  updateEmployee(id: number, data: EmployeeI): Observable<EmployeeI> {
    return this.http.put<EmployeeI>(`${this.base_path}/${id}`, data);
  }

  /** 
   * Deletes an employee by ID
   * @param id - Employee ID to delete
   * @returns Observable of the deleted EmployeeI
   */
  deleteEmployee(id: number): Observable<EmployeeI> {
    return this.http.delete<EmployeeI>(`${this.base_path}/${id}`);
  }

  /** 
   * Retrieves all employee types
   * @returns Observable containing an array of EmployeeTypeI objects
   */
  /** Retrieves all employee types */
  getAllEmployeeTypes(): Observable<EmployeeTypeI[]> {
    return this.http.get<{ employeeTypes: EmployeeTypeI[] }>(this.employeeTypes_path).pipe(
      map((response) => response.employeeTypes) // Extrae el array de employeeTypes
    );
  }
}
