import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { VehicleTypeService } from '../../../services/vehicle-type/vehicle-type.service';
import { VehicleTypeI } from '../../../models/Transport';

/**
 * Component to display the list of vehicle types and manage actions like 
 * creating, editing, and deleting vehicle types.
 */
@Component({
  selector: 'app-display-vehicle-type',  // Component selector for HTML tag
  standalone: true,  // Marks the component as standalone
  imports: [TableModule, ButtonModule, CardModule, RouterModule],  // Required modules for table, buttons, cards, and routing
  templateUrl: './display-vehicle-type.component.html',  // Path to the HTML template
  styleUrls: ['./display-vehicle-type.component.css']  // Path to the CSS styles
})
export class DisplayVehicleTypeComponent implements OnInit  {

  public types: VehicleTypeI[] = [];  // Array to hold vehicle types

  /**
   * Constructor to inject services used in this component.
   * 
   * @param vehicleTypeService - Service to handle vehicle type operations
   * @param router - Router service to navigate between pages
   */
  constructor(
    private vehicleTypeService: VehicleTypeService,
    private router: Router
  ) { }

  /**
   * Life cycle hook called when the component is initialized.
   * Calls the function to load vehicle types.
   */
  ngOnInit(): void {
    this.displayTypes();
  }

  /**
   * Function to fetch and display all vehicle types.
   * Makes an API call to the service to fetch vehicle types.
   */
  displayTypes() {
    this.vehicleTypeService.getAllTypes()
      .subscribe({
        next: (data) => {
          this.types = data.vehicleTypes;  // Assign fetched vehicle types to 'types' array
        },
        error: (err) => {
          console.error('Error fetching vehicle types', err);  // Log error in case of failure
        }
      });
  }

  /**
   * Function to delete a vehicle type.
   * Calls the service to delete the vehicle type by its id and refreshes the list.
   * 
   * @param id - ID of the vehicle type to delete
   */
  delete(id: number): void {
    this.vehicleTypeService.deleteType(id).subscribe(
      () => {
        this.displayTypes();  // Refresh the list after deletion
      },
      err => {
        console.error('Error deleting vehicle type', err);  // Log error in case of failure
      }
    );
  }
}
