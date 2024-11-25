import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTypeService } from '../../../services/employee-type/employee-type.service';
import { Router } from '@angular/router';
import { EmployeeTypeI } from '../../../models/Employee';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-employee-type', // Renamed selector for English
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-employee-type.component.html', // Renamed HTML file to match English
  styleUrls: ['./create-employee-type.component.css']
})
export class CreateEmployeeTypeComponent implements OnInit { // Renamed component class to match English

  public form: FormGroup;
  employeeTypeService = inject(EmployeeTypeService); // Inject the service
  router = inject(Router); // Inject the router

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form group with validation
    this.form = this.formBuilder.group({
      jobTitle: ['', [Validators.required]] // 'puesto' translated to 'jobTitle'
    });
  }

  ngOnInit(): void {}

  // Submit handler for the form
  onSubmit(): void {
    if (this.form.valid) { // Check if the form is valid
      const formValue: EmployeeTypeI = this.form.value; // Capture form data
      this.employeeTypeService.createType(formValue).subscribe(
        () => {
          this.router.navigateByUrl('employee-type'); // Redirect on success
        },
        err => {
          console.error(err); // Log errors
        }
      );
    }
  }

  // Cancel handler to navigate to the employee-type list page
  cancel() {
    this.router.navigateByUrl('/employee-type');
  }

  // Getter for jobTitle form control
  get jobTitle() { return this.form.get('jobTitle'); }
}
