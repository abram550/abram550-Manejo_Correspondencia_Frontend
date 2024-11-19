// src/app/services/payment-type/payment-type.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentTypeI } from '../../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/payment-types`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all payment types from the server.
   */
  getAllTypes(): Observable<{ paymentTypes: PaymentTypeI[] }> {
    return this.http.get<{ paymentTypes: PaymentTypeI[] }>(this.base_path);
  }

  /**
   * Retrieves a specific payment type by ID.
   */
  getOneType(id: number): Observable<{ paymentType: PaymentTypeI }> {
    return this.http.get<{ paymentType: PaymentTypeI }>(`${this.base_path}/${id}`);
  }

  /**
   * Creates a new payment type on the server.
   */
  createType(data: any): Observable<PaymentTypeI> {
    return this.http.post<PaymentTypeI>(this.base_path, data);
  }

  /**
   * Updates an existing payment type on the server.
   */
  updateType(id: number, data: any): Observable<PaymentTypeI> {
    return this.http.put<PaymentTypeI>(`${this.base_path}/${id}`, data);
  }

  /**
   * Deletes a payment type from the server by ID.
   */
  deleteType(id: number): Observable<PaymentTypeI> {
    return this.http.delete<PaymentTypeI>(`${this.base_path}/${id}`);
  }
}
