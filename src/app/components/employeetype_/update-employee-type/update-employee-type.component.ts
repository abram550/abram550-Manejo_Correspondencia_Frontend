import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTypeService } from '../../../services/employee-type/employee-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { EmployeeTypeI } from '../../../models/Employee';

/**
 * This component allows updating the details of an employee type.
 * It contains a form to modify the 'jobTitle' of an employee type.
 */
@Component({
  selector: 'app-update-employee-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './update-employee-type.component.html',
  styleUrls: ['./update-employee-type.component.css']
})
export class UpdateEmployeeTypeComponent implements OnInit {

  public form: FormGroup; // Declaration of the form property
  employeeTypeService = inject(EmployeeTypeService); // Injection of the employee type service
  router = inject(Router); // Injection of the router
  activatedRoute = inject(ActivatedRoute); // Injection of the activated route

  /**
   * Constructor to initialize the form with a validation rule.
   */
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      jobTitle: ['', [Validators.required, Validators.minLength(3)]], // 'jobTitle' field with validation
    });
  }

  /**
   * Lifecycle hook to load the employee type data when the component initializes.
   */
  ngOnInit(): void {
    this.loadEmployeeType(); // Load the employee type data on initialization
  }

  /**
   * Loads the employee type data based on the ID retrieved from the route.
   */
  loadEmployeeType(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Retrieve the ID from the URL
    if (id) {
      this.employeeTypeService.getOneType(Number(id)).subscribe(
        response => {
          const employeeType = response.employeeType;
          this.form.patchValue({ // Populate the form with data
            jobTitle: employeeType.jobTitle
          });
        },
        error => {
          console.error('Error loading employee type:', error);
          // Handle the error if necessary
        }
      );
    }
  }

  /**
   * Handles the form submission to update the employee type.
   */
  onSubmit(): void {
    const formValue: EmployeeTypeI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Retrieve the ID from the URL

    if (id) {
      this.employeeTypeService.updateType(Number(id), formValue).subscribe(
        () => {
          console.log('Employee type updated successfully:', formValue);
          this.router.navigateByUrl('/employee-type'); // Redirect to the list of employee types
        },
        err => {
          console.error(err);
          console.log('Failed to update the employee type');
        }
      );
    }
  }

  /**
   * Cancels the update operation and redirects to the list of employee types.
   */
  cancel() {
    this.router.navigateByUrl('/employee-type'); // Redirect to the employee types list
  }

  /**
   * Getter for the 'jobTitle' form control.
   */
  get jobTitle() { return this.form.get('jobTitle'); }
}
