// src/app/services/routes/routes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouteI } from '../../models/Route';
import { BranchI } from '../../models/Branch';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/routes`;
  branches_path = `${this.api_uri_node}/branches`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all routes
   * @returns Observable containing an array of RouteI objects
   */
  getAllRoutes(): Observable<{ routes: RouteI[] }> {
    return this.http.get<{ routes: RouteI[] }>(this.base_path);
  }

  /**
   * Retrieves a route by ID
   * @param id - Route ID to retrieve
   * @returns Observable containing a RouteI object
   */
  getOneRoute(id: number): Observable<{ route: RouteI }> {
    return this.http.get<{ route: RouteI }>(`${this.base_path}/${id}`);
  }

  /**
   * Creates a new route
   * @param data - Route data to create
   * @returns Observable of the created RouteI
   */
  createRoute(data: RouteI): Observable<RouteI> {
    return this.http.post<RouteI>(this.base_path, data);
  }

  /**
   * Updates an existing route
   * @param id - ID of the route to update
   * @param data - Updated route data
   * @returns Observable of the updated RouteI
   */
  updateRoute(id: number, data: RouteI): Observable<RouteI> {
    return this.http.put<RouteI>(`${this.base_path}/${id}`, data);
  }

  /**
   * Deletes a route by ID
   * @param id - Route ID to delete
   * @returns Observable of the deleted RouteI
   */
  deleteRoute(id: number): Observable<RouteI> {
    return this.http.delete<RouteI>(`${this.base_path}/${id}`);
  }

  /**
   * Retrieves all branches
   * @returns Observable containing an array of BranchI objects
   */
  getAllBranches(): Observable<BranchI[]> {
    return this.http.get<BranchI[]>(this.branches_path);
  }
}
