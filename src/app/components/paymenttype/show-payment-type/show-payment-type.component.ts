import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaymentTypeService } from '../../../services/payment-type/payment-type.service';
import { PaymentTypeI } from '../../../models/Payment';

/**
 * Component to show payment types.
 */
@Component({
  selector: 'app-show-payment-type',  // Component selector
  standalone: true,  // Indicates that the component is standalone
  imports: [TableModule, ButtonModule, CardModule, RouterModule],  // Modules used in this component
  templateUrl: './show-payment-type.component.html',  // Path to HTML template
  styleUrls: ['./show-payment-type.component.css']  // Path to CSS styles
})
export class ShowPaymentTypeComponent implements OnInit {

  public types: PaymentTypeI[] = [];  // Array to store payment types

  /**
   * Constructor to inject services.
   * @param paymentTypeService Service for payment type operations.
   * @param router Router to navigate between pages.
   */
  constructor(
    private paymentTypeService: PaymentTypeService,  // Payment type service
    private router: Router  // Router for navigation
  ) { }

  /**
   * ngOnInit lifecycle hook to fetch payment types on initialization.
   */
  ngOnInit(): void {
    this.showTypes();  // Fetch and display payment types
  }

  /**
   * Method to fetch all payment types from the service.
   */
  showTypes() {
    this.paymentTypeService.getAllTypes()  // Get all payment types from the service
      .subscribe({
        next: (data) => {
          this.types = data.paymentTypes;  // Assign the fetched types to the local array
        }
      });
  }

  /**
   * Method to delete a payment type by its ID.
   * @param id ID of the payment type to delete.
   */
  delete(id: number): void {
    this.paymentTypeService.deleteType(id)  // Call service to delete the type
      .subscribe(
        () => {
          this.showTypes();  // Refresh the list of types after deletion
        },
        err => {
          console.log('Error deleting the payment type');  // Log any error encountered during deletion
        }
      );
  }
}
