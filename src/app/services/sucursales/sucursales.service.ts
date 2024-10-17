import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SucursalI } from '../../models/sucursal'; 

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/sucursales`;

  constructor(private http: HttpClient) {}

  getAllSucursales(): Observable<{ sucursales: SucursalI[] }> {
    return this.http.get<{ sucursales: SucursalI[] }>(this.base_path);
  }

  getOneSucursal(id: number): Observable<{ sucursal: SucursalI }> {
    return this.http.get<{ sucursal: SucursalI }>(`${this.base_path}/${id}`);
  }

  createSucursal(data: any): Observable<SucursalI> {
    return this.http.post<SucursalI>(this.base_path, data);
  }

  updateSucursal(id: number, data: any): Observable<SucursalI> {
    return this.http.put<SucursalI>(`${this.base_path}/${id}`, data);
  }

  deleteSucursal(id: number): Observable<SucursalI> {
    return this.http.delete<SucursalI>(`${this.base_path}/${id}`);
  }
}
