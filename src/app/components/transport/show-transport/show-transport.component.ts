import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table'; 
import { ButtonModule } from 'primeng/button'; 
import { CardModule } from 'primeng/card'; 
import { TransportService } from '../../../services/transport/transport.service'; 
import { TransportI, VehicleTypeI } from '../../../models/Transport';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-show-transport',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-transport.component.html',
  styleUrls: ['./show-transport.component.css']
})
export class ShowTransportComponent implements OnInit {

  public transports: TransportI[] = []; // Array to store transport data
  public vehicleTypes: VehicleTypeI[] = []; // Array to store vehicle types

  constructor(
    private transportService: TransportService, // Inject the transport service
    private router: Router // Inject the router for navigation
  ) { }

  ngOnInit(): void {
    this.loadTransports(); // Load transports when the component is initialized
    this.loadVehicleTypes(); // Load vehicle types when the component is initialized
  }

  // Method to load all transports
  loadTransports(): void {
    this.transportService.getAllTransports()
      .subscribe({
        next: (data) => {
          this.transports = data.transports; // Populate the transports array
        }
      });
  }

  // Method to load all vehicle types
  loadVehicleTypes(): void {
    this.transportService.getAllVehicleTypes()
      .subscribe({
        next: (data) => {
          this.vehicleTypes = data; // Populate the vehicleTypes array
        }
      });
  }

  // Method to delete a transport by ID
  deleteTransport(id: number): void {
    this.transportService.deleteTransport(id).subscribe(
      () => {
        this.loadTransports(); // Reload transports after deletion
      },
      err => {
        console.log('Error deleting transport'); // Log an error if deletion fails
      }
    );
  }
}
