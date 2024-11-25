import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaymentService } from '../../../services/payments/payments.service';
import { PaymentI, PaymentTypeI } from '../../../models/Payment';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Component to display the list of payments and their types.
 */
@Component({
  selector: 'app-show-payment',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './show-payment.component.html',
  styleUrls: ['./show-payment.component.css']
})
export class ShowPaymentsComponent implements OnInit {

  public payments: PaymentI[] = [];
  public paymentTypes: PaymentTypeI[] = [];

  /**
   * Constructor to initialize the component with necessary services.
   * @param paymentService Service to handle payments logic.
   * @param router Angular router service for navigation.
   */
  constructor(
    private paymentService: PaymentService,
    private router: Router
  ) { }

  /**
   * Lifecycle hook called when the component is initialized.
   * It loads payment types first and then loads payments.
   */
  ngOnInit(): void {
    this.loadPaymentTypes(); // Load payment types first
    this.showPayments(); // Then, display the payments
  }

  /**
   * Fetches all payments from the payment service and maps them to include payment type information.
   */
  showPayments() {
    this.paymentService.getAllPayments().subscribe({
      next: (data) => {
        this.payments = data.payments.map(payment => {
          const paymentType = this.paymentTypes.find(type => type.id === payment.paymentTypeId);

          // If no payment type is found, assign a complete object with a default 'status' value
          return {
            ...payment,
            paymentType: paymentType || { id: 0, name: 'Unknown', status: false } // Added 'status' here to prevent type errors
          };
        });
      },
      error: (err) => {
        console.error('Error loading payments:', err);
      }
    });
  }

  /**
   * Fetches all payment types from the payment service.
   */
  loadPaymentTypes() {
    this.paymentService.getAllPaymentTypes().subscribe({
      next: (data) => {
        this.paymentTypes = data; // Load available payment types
      },
      error: (err) => {
        console.error('Error loading payment types:', err);
      }
    });
  }

  /**
   * Deletes a payment by its ID.
   * @param id The ID of the payment to delete.
   */
  delete(id: number): void {
    this.paymentService.deletePayment(id).subscribe({
      next: () => {
        this.showPayments(); // Refresh the payment list after deletion
      },
      error: (err) => {
        console.error('Error deleting payment:', err);
      }
    });
  }
}
