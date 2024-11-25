import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouteService } from '../../../services/routes-/routes.service';
import { RouteI } from '../../../models/Route';
import { BranchI } from '../../../models/Branch';

@Component({
  selector: 'app-update-routes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './update-routes.component.html',
  styleUrls: ['./update-routes.component.css']
})
export class UpdateRoutesComponent implements OnInit {
  public form: FormGroup; // Form group to hold form controls
  public branches: BranchI[] = []; // Array to store branch data
  routeService = inject(RouteService); // Inject the RouteService to interact with API
  router = inject(Router); // Inject Router for navigation
  activatedRoute = inject(ActivatedRoute); // Inject ActivatedRoute to access route parameters
  errorMessage: string = ''; // Error message for failed API calls

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form with form controls and validators
    this.form = this.formBuilder.group({
      branchOriginId: ['', [Validators.required]], // Branch Origin field with required validation
      branchDestinationId: ['', [Validators.required]], // Branch Destination field with required validation
      distanceKm: ['', [Validators.required]], // Distance field with required validation
      estimatedTimeHours: ['', [Validators.required]] // Estimated Time field with required validation
    });
  }

  ngOnInit(): void {
    this.loadBranches(); // Load branches when the component initializes
    this.loadRoute(); // Load the route if it exists
  }

  // Method to load branches from the service
  loadBranches(): void {
    this.routeService.getAllBranches().subscribe(
      branchesData => {
        this.branches = branchesData.branches; // Store the fetched branches in the array
      },
      error => {
        console.error('Error loading branches:', error);
        this.errorMessage = 'Could not load branches. Please try again later.'; // Display error message if API call fails
      }
    );
  }

  // Method to load the route based on the ID from the URL
  loadRoute(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get route ID from the URL
    if (id) {
      this.routeService.getOneRoute(Number(id)).subscribe(
        response => {
          const route = response.route;
          this.form.patchValue({ // Patch the form with the route details
            branchOriginId: route.originBranchId,
            branchDestinationId: route.destinationBranchId,
            distanceKm: route.distanceKm,
            estimatedTimeHours: route.estimatedTimeHours
          });
        },
        error => {
          console.error('Error loading route:', error);
          this.errorMessage = 'Could not load the route. Please try again later.'; // Display error message if route fetching fails
        }
      );
    }
  }

  // Submit the form data to update the route
  onSubmit(): void {
    const formValue: RouteI = this.form.value; // Get the form data
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get route ID from the URL

    if (id) {
      this.routeService.updateRoute(Number(id), formValue).subscribe(
        () => {
          console.log('Route updated successfully:', formValue);
          this.router.navigateByUrl('routes'); // Navigate to the routes list after success
        },
        err => {
          console.error(err);
          console.log('Route update failed');
        }
      );
    }
  }

  // Method to handle cancel button click and navigate back to the routes list
  cancel() {
    this.router.navigateByUrl('/routes'); // Navigate back to the routes list
  }

  // Getters for form controls to avoid repetition in the template
  get branchOriginId() { return this.form.get('branchOriginId'); }
  get branchDestinationId() { return this.form.get('branchDestinationId'); }
  get distanceKm() { return this.form.get('distanceKm'); }
  get estimatedTimeHours() { return this.form.get('estimatedTimeHours'); }
}
