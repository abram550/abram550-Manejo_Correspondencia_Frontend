import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../services/payments/payments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { PaymentI } from '../../../models/Payment';

@Component({
  selector: 'app-update-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css']
})
export class UpdatePaymentComponent implements OnInit {
  
  public form: FormGroup; // Declaration of the form property
  paymentService = inject(PaymentService); // Injection of the payment service
  router = inject(Router); // Injection of the router
  activatedRoute = inject(ActivatedRoute); // Injection of the active route

  // Array of payment methods
  paymentMethods: { label: string, value: string }[] = [
    { label: 'Cash', value: 'cash' },
    { label: 'Credit Card', value: 'credit card' },
    { label: 'Bank Transfer', value: 'bank transfer' }
  ];

  constructor(private formBuilder: FormBuilder) {
    // Initialization of the form in the constructor
    this.form = this.formBuilder.group({
      correspondenceId: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      paymentMethod: ['', [Validators.required]],
      paymentDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadPayment(); // Load payment data when the component is initialized
  }

  loadPayment(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get the ID from the URL
    if (id) {
      this.paymentService.getOnePayment(Number(id)).subscribe(
        response => {
          const payment = response.payment;
          this.form.patchValue({ // Load the data into the form
            correspondenceId: payment.correspondenceId,
            amount: payment.amount,
            paymentDate: payment.paymentDate
          });
        },
        error => {
          console.error('Error loading payment:', error);
          // Handle errors if necessary
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: PaymentI = this.form.value; // Get the form data
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get the ID from the URL

    if (id) {
      this.paymentService.updatePayment(Number(id), formValue).subscribe(
        () => {
          console.log('Payment updated successfully:', formValue);
          this.router.navigateByUrl('payments'); // Redirect to the list of payments
        },
        err => {
          console.error(err);
          console.log('Payment update failed');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/payments'); // Redirect to the list of payments
  }

  // Make sure the form control names are correct
  get correspondenceId() { return this.form.get('correspondenceId'); }
  get amount() { return this.form.get('amount'); }
  get paymentMethod() { return this.form.get('paymentMethod'); }
  get paymentDate() { return this.form.get('paymentDate'); }
}
