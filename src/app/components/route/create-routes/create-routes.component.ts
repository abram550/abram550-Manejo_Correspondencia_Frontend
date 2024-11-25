import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../../services/routes-/routes.service';  // Service to handle route operations
import { Router } from '@angular/router';  // Angular Router for navigation
import { RouteI } from '../../../models/Route';  // Interface for route model
import { CardModule } from 'primeng/card';  // PrimeNG card component for layout
import { ButtonModule } from 'primeng/button';  // PrimeNG button component
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';  // Reactive Forms for form handling
import { ToastModule } from 'primeng/toast';  // PrimeNG toast notifications
import { DropdownModule } from 'primeng/dropdown';  // PrimeNG dropdown component
import { BranchI } from '../../../models/Branch';  // Interface for branch model

@Component({
  selector: 'app-create-routes',  // Component selector for Angular
  standalone: true,  // Indicates this component is standalone and not part of a module
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],  // Imported modules for the component
  templateUrl: './create-routes.component.html',  // Path to the HTML template for the component
  styleUrls: ['./create-routes.component.css']  // Path to the CSS styles for the component
})
export class CreateRoutesComponent implements OnInit {
  public form: FormGroup;  // Form group for managing form state
  public branches: BranchI[] = [];  // Array to store the list of branches
  routeService = inject(RouteService);  // Injecting the RouteService to interact with routes
  router = inject(Router);  // Injecting Router for navigation

  constructor(private formBuilder: FormBuilder) {
    // Initializing the form group in the constructor
    this.form = this.formBuilder.group({
      sourceBranchId: ['', [Validators.required]],  // Required field for source branch
      destinationBranchId: ['', [Validators.required]],  // Required field for destination branch
      distanceKm: ['', [Validators.required, Validators.min(1)]],  // Required field for distance (min 1)
      estimatedTimeHours: ['', [Validators.required, Validators.min(1)]],  // Required field for estimated time (min 1 hour)
    });
  }

  ngOnInit(): void {
    // Fetching all branches when the component initializes
    this.routeService.getAllBranches().subscribe(branchesData => {
      this.branches = branchesData.branches;  // Storing the fetched branches
    });
  }

  // Method triggered on form submission
  onSubmit(): void {
    const formValue: RouteI = this.form.value;  // Getting the form values
    console.log(formValue);  // Logging the form values
    this.routeService.createRoute(formValue).subscribe(
      () => {
        console.log(formValue);  // Logging the form data
        this.router.navigateByUrl('routes');  // Redirecting to the list of routes
      },
      err => {
        console.log(err);  // Logging errors if any occur
        console.log('Route creation failed');
      }
    );
  }

  // Method to handle cancelation and navigation back to the routes list
  cancel() {
    this.router.navigateByUrl('/routes');  // Redirecting to the list of routes
  }

  // Form control getters for easier access in the template
  get sourceBranchId() { return this.form.get('sourceBranchId'); }
  get destinationBranchId() { return this.form.get('destinationBranchId'); }
  get distanceKm() { return this.form.get('distanceKm'); }
  get estimatedTimeHours() { return this.form.get('estimatedTimeHours'); }
}
