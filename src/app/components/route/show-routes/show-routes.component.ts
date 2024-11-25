import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { RouteService } from '../../../services/routes-/routes.service';
import { RouteI } from '../../../models/Route';
import { BranchI } from '../../../models/Branch';

@Component({
  selector: 'app-show-routes',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-routes.component.html',
  styleUrls: ['./show-routes.component.css']
})
export class ShowRoutesComponent implements OnInit {
  public routes: RouteI[] = []; // Array to store route data
  public branches: BranchI[] = []; // Array to store branch data

  constructor(
    private routeService: RouteService, // Inject the route service
    private router: Router // Inject the router for navigation
  ) {}

  ngOnInit(): void {
    this.loadRoutes(); // Load routes when the component is initialized
    this.loadBranches(); // Load branches when the component is initialized
  }

  // Method to load all routes
  loadRoutes(): void {
    this.routeService.getAllRoutes().subscribe({
      next: (data) => {
        console.log('Routes loaded:', data);
        this.routes = data.routes; // Populate the routes array
      },
      error: (err) => {
        console.error('Error loading routes:', err);
      }
    });
  }

  // Method to load all branches
  loadBranches(): void {
    this.routeService.getAllBranches().subscribe({
      next: (data) => {
        console.log('Branches loaded:', data);
        this.branches = data.branches; // Asignar el array de sucursales
      },
      error: (err) => {
        console.error('Error loading branches:', err);
      },
    });
  }
  

  // Get branch name by ID
  getBranchName(branchId: number): string {
    if (!this.branches || this.branches.length === 0) {
      return 'Cargando...'; // Handle loading state
    }
    const branch = this.branches.find((b) => b.id === branchId);
    return branch ? branch.name : 'Sucursal no encontrada';
  }

  // Method to delete a route by ID
  deleteRoute(id: number): void {
    this.routeService.deleteRoute(id).subscribe({
      next: () => {
        console.log(`Route with ID ${id} deleted successfully.`);
        this.loadRoutes(); // Reload routes after deletion
      },
      error: (err) => {
        console.error('Error deleting route:', err);
      }
    });
  }
}
