import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleTypeService } from '../../../services/vehicle-type/vehicle-type.service'; // Service for vehicle type management
import { Router } from '@angular/router'; // Angular router for navigation
import { VehicleTypeI } from '../../../models/Transport'; // Interface for vehicle type
import { CardModule } from 'primeng/card'; // PrimeNG card component
import { ButtonModule } from 'primeng/button'; // PrimeNG button component
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // Reactive Forms modules
import { ToastModule } from 'primeng/toast'; // PrimeNG toast notifications

@Component({
  selector: 'app-create-vehicle-type', // Component selector in HTML
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule], // Import required modules
  templateUrl: './create-vehicle-type.component.html', // Path to HTML template
  styleUrls: ['./create-vehicle-type.component.css'] // Path to component CSS
})
export class CreateVehicleTypeComponent implements OnInit {
  
  public form: FormGroup; // Reactive form group for the form
  vehicleTypeService = inject(VehicleTypeService); // Inject the service to handle vehicle types
  router = inject(Router); // Inject the router for navigation

  // Constructor initializes the form with a description field that is required
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required]] // Field for the vehicle type description
    });
  }

  // ngOnInit lifecycle hook, but no logic is implemented here
  ngOnInit(): void {}

  // Function to handle form submission
  onSubmit(): void {
    if (this.form.valid) { // Check if the form is valid
      const formValue: VehicleTypeI = this.form.value; // Get the form data
      this.vehicleTypeService.createType(formValue).subscribe(
        () => {
          this.router.navigateByUrl('vehicle-type'); // Navigate to the list of vehicle types
        },
        err => {
          console.error(err); // Log any errors
        }
      );
    }
  }

  // Function to handle the cancel action
  cancel() {
    this.router.navigateByUrl('/vehicle-type'); // Cancel and navigate to the vehicle type list
  }

  // Getter for the description form control
  get description() { return this.form.get('description'); }
}
