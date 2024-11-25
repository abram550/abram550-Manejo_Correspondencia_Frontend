import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTypeService } from '../../../services/payment-type/payment-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PaymentTypeI } from '../../../models/Payment';

/**
 * Component to update a payment type.
 */
@Component({
  selector: 'app-update-payment-type',  // Component selector
  standalone: true,  // Indicates that the component is standalone
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],  // Modules used in this component
  templateUrl: './update-payment-type.component.html',  // Path to HTML template
  styleUrls: ['./update-payment-type.component.css']  // Path to CSS styles
})
export class UpdatePaymentTypeComponent implements OnInit {

  public form: FormGroup;  // Declaration of the form property
  paymentTypeService = inject(PaymentTypeService);  // Dependency injection of the service
  router = inject(Router);  // Dependency injection of the router
  activatedRoute = inject(ActivatedRoute);  // Dependency injection of the active route

  /**
   * Constructor to initialize the form.
   * @param formBuilder Form builder to create the form.
   */
  constructor(private formBuilder: FormBuilder) {
    // Initialize the form in the constructor
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],  // Define form controls and their validation rules
    });
  }

  /**
   * ngOnInit lifecycle hook to load the payment type data when the component is initialized.
   */
  ngOnInit(): void {
    this.loadPaymentType();  // Load the payment type data when the component is initialized
  }

  /**
   * Method to load the payment type data.
   */
  loadPaymentType(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');  // Get the ID from the URL
    if (id) {
      this.paymentTypeService.getOneType(Number(id)).subscribe(
        response => {
          const paymentType = response.paymentType;
          this.form.patchValue({  // Update the form with the fetched data
            name: paymentType.name
          });
        },
        error => {
          console.error('Error loading the payment type:', error);
          // Handle errors if necessary
        }
      );
    }
  }

  /**
   * Method to handle form submission and update the payment type.
   */
  onSubmit(): void {
    const formValue: PaymentTypeI = this.form.value;  // Get the form data
    const id = this.activatedRoute.snapshot.paramMap.get('id');  // Get the ID from the URL

    if (id) {
      this.paymentTypeService.updateType(Number(id), formValue).subscribe(
        () => {
          console.log('Payment type updated successfully:', formValue);
          this.router.navigateByUrl('/payment-type');  // Redirect to the list of payment types
        },
        err => {
          console.error(err);
          console.log('Payment type update failed');
        }
      );
    }
  }

  /**
   * Method to cancel the update operation and navigate to the payment type list.
   */
  cancel() {
    this.router.navigateByUrl('/payment-type');  // Redirect to the list of payment types
  }

  /**
   * Getter for the name form control.
   */
  get name() { return this.form.get('name'); }
}
