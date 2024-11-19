// src/app/services/payments/payments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentI, PaymentTypeI } from '../../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/payments`;
  payment_types_path = `${this.api_uri_node}/paymenttypes`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all payments
   * @returns Observable containing an array of PaymentI objects
   */
  getAllPayments(): Observable<{ payments: PaymentI[] }> {
    return this.http.get<{ payments: PaymentI[] }>(this.base_path);
  }

  /**
   * Retrieves a payment by ID
   * @param id - Payment ID to retrieve
   * @returns Observable containing a PaymentI object
   */
  getOnePayment(id: number): Observable<{ payment: PaymentI }> {
    return this.http.get<{ payment: PaymentI }>(`${this.base_path}/${id}`);
  }

  /**
   * Creates a new payment
   * @param paymentData - Payment data to create
   * @returns Observable of the created PaymentI
   */
  createPayment(paymentData: { payment: PaymentI }): Observable<any> {
    return this.http.post(this.base_path, paymentData);
  }

  /**
   * Updates an existing payment
   * @param id - ID of the payment to update
   * @param data - Updated payment data
   * @returns Observable of the updated PaymentI
   */
  updatePayment(id: number, data: PaymentI): Observable<PaymentI> {
    return this.http.put<PaymentI>(`${this.base_path}/${id}`, data);
  }

  /**
   * Deletes a payment by ID
   * @param id - Payment ID to delete
   * @returns Observable of the deleted PaymentI
   */
  deletePayment(id: number): Observable<PaymentI> {
    return this.http.delete<PaymentI>(`${this.base_path}/${id}`);
  }

  /**
   * Retrieves all payment types
   * @returns Observable containing an array of PaymentTypeI objects
   */
  getAllPaymentTypes(): Observable<PaymentTypeI[]> {
    return this.http.get<PaymentTypeI[]>(this.payment_types_path);
  }
}
