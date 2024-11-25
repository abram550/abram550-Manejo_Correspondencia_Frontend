import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleTypeService } from '../../../services/vehicle-type/vehicle-type.service'; // Renamed service to 'VehicleTypeService'
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { VehicleTypeI } from '../../../models/Transport'; // Renamed model to 'VehicleTypeI'

@Component({
  selector: 'app-update-vehicle-type', // Changed to English for consistency
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './update-vehicle-type.component.html', // Changed to English for consistency
  styleUrls: ['./update-vehicle-type.component.css'] // Changed to English for consistency
})
export class UpdateVehicleTypeComponent implements OnInit {

  public form: FormGroup; // Declare the form property
  vehicleTypeService = inject(VehicleTypeService); // Inject the service
  router = inject(Router); // Inject the router
  activatedRoute = inject(ActivatedRoute); // Inject the activated route

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form in the constructor
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(3)]], // 'description' form control with validation
    });
  }

  ngOnInit(): void {
    this.loadVehicleType(); // Load vehicle type data when the component initializes
  }

  /**
   * Loads the vehicle type data by fetching it using the ID from the route parameter.
   */
  loadVehicleType(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get ID from the URL
    if (id) {
      this.vehicleTypeService.getOneType(Number(id)).subscribe(
        response => {
          const vehicleType = response.vehicleType; // Extract vehicle type data from the response
          this.form.patchValue({ // Load data into the form
            description: vehicleType.description
          });
        },
        error => {
          console.error('Error loading vehicle type:', error); // Handle any errors
          // Additional error handling if necessary
        }
      );
    }
  }

  /**
   * Handles form submission and updates the vehicle type.
   */
  onSubmit(): void {
    const formValue: VehicleTypeI = this.form.value; // Get the form value
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get ID from the URL

    if (id) {
      this.vehicleTypeService.updateType(Number(id), formValue).subscribe(
        () => {
          console.log('Vehicle type updated successfully:', formValue); // Log success
          this.router.navigateByUrl('/vehicle-type'); // Navigate to the vehicle types list
        },
        err => {
          console.error(err); // Log error
          console.log('Failed to update vehicle type'); // Log failure
        }
      );
    }
  }

  /**
   * Cancels the update and navigates back to the vehicle types list.
   */
  cancel() {
    this.router.navigateByUrl('/vehicle-type'); // Navigate to the vehicle types list
  }

  // Ensure that the form control names are correct
  get description() { return this.form.get('description'); } // Getter for the description control
}
