import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoPagoI } from '../../models/pago'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class TipopagoService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/tipopagos`; // Ruta para la API de tipo de pagos

  constructor(private http: HttpClient) {}

  // Obtener todos los tipos de pago
  getAllTipos(): Observable<{ tiposPago: TipoPagoI[] }> {
    return this.http.get<{ tiposPago: TipoPagoI[] }>(this.base_path);
  }

  // Obtener un tipo de pago por su id
  getOneTipo(id: number): Observable<{ tipoPago: TipoPagoI }> {
    return this.http.get<{ tipoPago: TipoPagoI }>(`${this.base_path}/${id}`);
  }

  // Crear un nuevo tipo de pago
  createTipo(data: any): Observable<TipoPagoI> {
    return this.http.post<TipoPagoI>(this.base_path, data);
  }

  // Actualizar un tipo de pago existente
  updateTipo(id: number, data: any): Observable<TipoPagoI> {
    return this.http.put<TipoPagoI>(`${this.base_path}/${id}`, data);
  }

  // Eliminar un tipo de pago
  deleteTipo(id: number): Observable<TipoPagoI> {
    return this.http.delete<TipoPagoI>(`${this.base_path}/${id}`);
  }
}
