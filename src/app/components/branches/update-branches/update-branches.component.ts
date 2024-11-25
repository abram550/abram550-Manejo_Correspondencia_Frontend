import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BranchService } from '../../../services/branches/branches.service';
import { BranchI } from '../../../models/Branch';

/**
 * Component for updating branches information.
 */
@Component({
  selector: 'app-update-branches',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './update-branches.component.html',
  styleUrls: ['./update-branches.component.css']
})
export class UpdateBranchesComponent implements OnInit {
  public form: FormGroup;  // Form group to handle the branch update form
  branchService = inject(BranchService);  // Injecting BranchService for API calls
  router = inject(Router);  // Injecting Router for navigation
  activatedRoute = inject(ActivatedRoute);  // Injecting ActivatedRoute to retrieve route parameters
  errorMessage: string = '';  // Error message to display in case of errors

  constructor(private formBuilder: FormBuilder) {
    // Initializing the form with required fields and validations
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],  // Name field, required
      address: ['', [Validators.required]],  // Address field, required
      city: ['', [Validators.required]],  // City field, required
      phone: ['', [Validators.required]]  // Phone field, required
    });
  }

  /**
   * On component initialization, load the branch data based on the route parameter.
   */
  ngOnInit(): void {
    this.loadBranch();  // Load branch when the component initializes
  }

  /**
   * Fetches the branch data from the API and populates the form with the data.
   */
  loadBranch(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');  // Get the branch ID from the URL
    if (id) {
      this.branchService.getOneBranch(Number(id)).subscribe(
        response => {
          const branch = response.branch;  // Extract branch data from the response
          this.form.patchValue({  // Populate form fields with the branch data
            name: branch.name,
            address: branch.address,
            city: branch.city,
            phone: branch.phone
          });
        },
        error => {
          console.error('Error loading the branch:', error);
          this.errorMessage = 'Could not load the branch. Please try again later.';  // Error message in case of failure
        }
      );
    }
  }

  /**
   * Handles the form submission to update the branch data.
   */
  onSubmit(): void {
    const formValue: BranchI = this.form.value;  // Get the form values
    const id = this.activatedRoute.snapshot.paramMap.get('id');  // Get the branch ID from the URL

    if (id) {
      this.branchService.updateBranch(Number(id), formValue).subscribe(
        () => {
          console.log('Branch updated successfully:', formValue);
          this.router.navigateByUrl('branches');  // Navigate to the branches list after successful update
        },
        err => {
          console.error(err);
          console.log('Branch update failed');
        }
      );
    }
  }

  /**
   * Handles the cancel action by redirecting to the branches list page.
   */
  cancel() {
    this.router.navigateByUrl('/branches');  // Navigate back to the branches list
  }

  // Getters for form controls for easier access in the template
  get name() { return this.form.get('name'); }
  get address() { return this.form.get('address'); }
  get city() { return this.form.get('city'); }
  get phone() { return this.form.get('phone'); }
}
