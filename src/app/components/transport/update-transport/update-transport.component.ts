import { Component, OnInit, inject } from '@angular/core'; // Importing Angular core modules
import { CommonModule } from '@angular/common'; // Importing common Angular module
import { TransportService } from '../../../services/transport/transport.service'; // Importing the transport service
import { Router, ActivatedRoute } from '@angular/router'; // Importing Router and ActivatedRoute for navigation
import { TransportI, VehicleTypeI } from '../../../models/Transport'; // Importing models for Transport and VehicleType
import { CardModule } from 'primeng/card'; // Importing PrimeNG Card module for UI
import { ButtonModule } from 'primeng/button'; // Importing PrimeNG Button module for UI
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importing Reactive forms modules
import { ToastModule } from 'primeng/toast'; // Importing Toast module for UI notifications
import { DropdownModule } from 'primeng/dropdown'; // Importing Dropdown module for vehicle type selection

@Component({
  selector: 'app-update-transport', // Component selector
  standalone: true, // Set to true for standalone components
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule], // Importing dependencies
  templateUrl: './update-transport.component.html', // Path to the template
  styleUrls: ['./update-transport.component.css'] // Path to the styles
})
export class UpdateTransportComponent implements OnInit {
  
  public form: FormGroup; // Declaration of the form property
  public vehicleTypes: VehicleTypeI[] = []; // New property to store vehicle types
  transportService = inject(TransportService); // Dependency injection of transport service
  router = inject(Router); // Dependency injection of Router for navigation
  activatedRoute = inject(ActivatedRoute); // Dependency injection of ActivatedRoute to get route parameters

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form in the constructor
    this.form = this.formBuilder.group({
      id: [''], // Add ID field
      vehicleTypeId: ['', [Validators.required]], // Change to vehicleTypeId for vehicle type
      plate: ['', [Validators.required]], // Plate field with required validation
      capacityKg: ['', [Validators.required, Validators.min(0)]], // Capacity field with required and minimum value validation
    });
  }

  ngOnInit(): void {
    this.loadTransport(); // Load transport data on component initialization
    this.loadVehicleTypes(); // Load vehicle types for dropdown
  }

  loadTransport(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get ID from URL parameters
    if (id) {
      this.transportService.getOneTransport(Number(id)).subscribe(
        response => {
          const transport = response.transport; // Get the transport data from the response
          this.form.patchValue({ // Patch the form with the transport data
            id: transport.id, // Assign ID to the form
            vehicleTypeId: transport.vehicleTypeId, // Assign vehicle type ID to the form
            plate: transport.plate, // Assign plate number
            capacityKg: transport.capacityKg // Assign capacity in kilograms
          });
        },
        error => {
          console.error('Error loading transport:', error); // Log error if transport data loading fails
        }
      );
    }
  }

  loadVehicleTypes(): void {
    this.transportService.getAllVehicleTypes().subscribe(
      types => {
        this.vehicleTypes = types; // Load vehicle types into the array
      },
      error => {
        console.error('Error loading vehicle types:', error); // Log error if vehicle types loading fails
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) { // Check if the form is valid before submission
      const formValue: TransportI = {
        ...this.form.value, // Spread form values
        vehicleType: { id: this.form.value.vehicleTypeId } // Add complete vehicleType for submission
      };
      const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get the ID from URL parameters
      if (id) {
        this.transportService.updateTransport(Number(id), formValue).subscribe(
          () => {
            console.log('Transport updated successfully:', formValue); // Log success on successful update
            this.router.navigateByUrl('transport'); // Redirect to the transport list page
          },
          err => {
            console.error('Transport update failed:', err); // Log error if update fails
          }
        );
      }
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/transport'); // Navigate to the transport list page on cancel
  }

  // Getter methods to access form controls more easily
  get vehicleTypeId() { return this.form.get('vehicleTypeId'); }
  get plate() { return this.form.get('plate'); }
  get capacityKg() { return this.form.get('capacityKg'); }
}
