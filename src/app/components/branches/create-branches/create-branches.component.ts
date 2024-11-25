import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchService } from '../../../services/branches/branches.service';
import { Router } from '@angular/router';
import { BranchI } from '../../../models/Branch'; // Import the Branch interface
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-branches',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-branches.component.html',
  styleUrls: ['./create-branches.component.css']
})
export class CreateBranchesComponent implements OnInit {

  public form: FormGroup; // Declaration of the form property
  branchService = inject(BranchService); // Dependency injection for BranchService
  router = inject(Router); // Dependency injection for Router

  constructor(private formBuilder: FormBuilder) {
    // Initializing the form in the constructor
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  /**
   * Handles the form submission
   * Sends the form data to the service to create a new branch
   */
  onSubmit(): void {
    const formValue: BranchI = this.form.value;
    console.log(formValue);
    this.branchService.createBranch(formValue).subscribe(
      () => {
        console.log(formValue);
        this.router.navigateByUrl('branches'); // Redirect to the list of branches
      },
      err => {
        console.log(err);
        console.log('The branch was not created successfully');
      }
    );
  }

  /**
   * Cancels the form submission and redirects to the list of branches
   */
  cancel() {
    this.router.navigateByUrl('/branches'); // Redirect to the list of branches
  }

  // Ensure that the form control names are correct
  get name() { return this.form.get('name'); }
  get address() { return this.form.get('address'); }
  get city() { return this.form.get('city'); }
  get phone() { return this.form.get('phone'); }
}
