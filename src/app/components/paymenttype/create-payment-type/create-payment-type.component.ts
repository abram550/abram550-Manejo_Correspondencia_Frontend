import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTypeService } from '../../../services/payment-type/payment-type.service';
import { Router } from '@angular/router';
import { PaymentTypeI } from '../../../models/Payment';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-payment-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-payment-type.component.html',
  styleUrls: ['./create-payment-type.component.css']
})
export class CreatePaymentTypeComponent implements OnInit {
  
  public form: FormGroup;
  paymentTypeService = inject(PaymentTypeService); // Inject the payment type service
  router = inject(Router); // Inject the router for navigation

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form with the 'name' field and required validation
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]] // Field for the payment type name
    });
  }

  ngOnInit(): void {}

  // Handles form submission
  onSubmit(): void {
    if (this.form.valid) { // Ensure the form is valid before proceeding
      const formValue: PaymentTypeI = this.form.value; // Get the form values
      this.paymentTypeService.createType(formValue).subscribe(
        () => {
          this.router.navigateByUrl('payment-type'); // Redirect to the payment types list
        },
        err => {
          console.error(err); // Log any errors
        }
      );
    }
  }

  // Cancels the creation process and redirects to the payment types list
  cancel() {
    this.router.navigateByUrl('/payment-type'); // Redirect to the list of payment types
  }

  // Getter for the form control 'name'
  get name() { return this.form.get('name'); }
}
