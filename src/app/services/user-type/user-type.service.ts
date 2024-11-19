// src/app/services/user-type/user-type.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserTypeI } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/user-types`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all user types from the server.
   */
  getAllTypes(): Observable<{ userTypes: UserTypeI[] }> {
    return this.http.get<{ userTypes: UserTypeI[] }>(this.base_path);
  }

  /**
   * Retrieves a specific user type by ID.
   */
  getOneType(id: number): Observable<{ userType: UserTypeI }> {
    return this.http.get<{ userType: UserTypeI }>(`${this.base_path}/${id}`);
  }

  /**
   * Creates a new user type on the server.
   */
  createType(data: any): Observable<UserTypeI> {
    return this.http.post<UserTypeI>(this.base_path, data);
  }

  /**
   * Updates an existing user type on the server.
   */
  updateType(id: number, data: any): Observable<UserTypeI> {
    return this.http.put<UserTypeI>(`${this.base_path}/${id}`, data);
  }

  /**
   * Deletes a user type from the server by ID.
   */
  deleteType(id: number): Observable<UserTypeI> {
    return this.http.delete<UserTypeI>(`${this.base_path}/${id}`);
  }
}
