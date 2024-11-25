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
  branches_path = `${this.api_uri_node}/branches`;  // Usar api_uri_node aquí

  constructor(private http: HttpClient) {}

  getAllRoutes(): Observable<{ routes: RouteI[] }> {
    return this.http.get<{ routes: RouteI[] }>(this.base_path);
  }

  getOneRoute(id: number): Observable<{ route: RouteI }> {
    return this.http.get<{ route: RouteI }>(`${this.base_path}/${id}`);
  }

  createRoute(data: RouteI): Observable<RouteI> {
    return this.http.post<RouteI>(this.base_path, data);
  }

  updateRoute(id: number, data: RouteI): Observable<RouteI> {
    return this.http.put<RouteI>(`${this.base_path}/${id}`, data);
  }

  deleteRoute(id: number): Observable<RouteI> {
    return this.http.delete<RouteI>(`${this.base_path}/${id}`);
  }

  getAllBranches(): Observable<{ branches: BranchI[] }> {
    return this.http.get<{ branches: BranchI[] }>(this.branches_path); // Usa branches_path aquí
  }
}
