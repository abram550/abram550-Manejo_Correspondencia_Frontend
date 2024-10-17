// src/app/services/pago/pago.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoI, TipoPagoI } from '../../models/pago'; // Asegúrate de importar TipoPagoI

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/pagos`;
  tipos_pago_path = `${this.api_uri_node}/tipopagoss`; // Ruta para tipos de pago

  constructor(private http: HttpClient) {}

  getAllPagos(): Observable<{ pagos: PagoI[] }> {
    return this.http.get<{ pagos: PagoI[] }>(this.base_path);
  }

  getOnePago(id: number): Observable<{ pago: PagoI }> {
    return this.http.get<{ pago: PagoI }>(`${this.base_path}/${id}`);
  }

  createPago(pagoData: { pago: PagoI }): Observable<any> {
    return this.http.post(this.base_path, pagoData);
  }
  

  updatePago(id: number, data: PagoI): Observable<PagoI> {
    return this.http.put<PagoI>(`${this.base_path}/${id}`, data);
  }

  deletePago(id: number): Observable<PagoI> {
    return this.http.delete<PagoI>(`${this.base_path}/${id}`);
  }

  getAllTiposPago(): Observable<TipoPagoI[]> {
    return this.http.get<TipoPagoI[]>(this.tipos_pago_path);
  }
}
