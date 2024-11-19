// src/app/services/user/users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI, UserTypeI } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // API base URL
  api_uri_node = 'http://localhost:4000';
  
  // Endpoint paths for users and user types
  base_path = `${this.api_uri_node}/users`;
  user_types_path = `${this.api_uri_node}/usertypes`;

  constructor(private http: HttpClient) {}

  /**
   * Fetches all users.
   * @returns Observable containing an array of users.
   */
  getAllUsers(): Observable<{ users: UserI[] }> {
    return this.http.get<{ users: UserI[] }>(this.base_path);
  }

  /**
   * Fetches a single user by ID.
   * @param id - ID of the user to retrieve.
   * @returns Observable containing the requested user.
   */
  getOneUser(id: number): Observable<{ user: UserI }> {
    return this.http.get<{ user: UserI }>(`${this.base_path}/${id}`);
  }
  
  /**
   * Creates a new user.
   * @param data - User data to create the new user.
   * @returns Observable containing the created user.
   */
  createUser(data: UserI): Observable<UserI> {
    return this.http.post<UserI>(this.base_path, data);
  }

  /**
   * Updates an existing user by ID.
   * @param id - ID of the user to update.
   * @param data - Updated user data.
   * @returns Observable containing the updated user.
   */
  updateUser(id: number, data: UserI): Observable<UserI> {
    return this.http.put<UserI>(`${this.base_path}/${id}`, data);
  }

  /**
   * Deletes a user by ID.
   * @param id - ID of the user to delete.
   * @returns Observable containing the deleted user.
   */
  deleteUser(id: number): Observable<UserI> {
    return this.http.delete<UserI>(`${this.base_path}/${id}`);
  }

  /**
   * Fetches all user types.
   * @returns Observable containing an array of user types.
   */
  getAllUserTypes(): Observable<UserTypeI[]> {
    return this.http.get<UserTypeI[]>(this.user_types_path);
  }
}
