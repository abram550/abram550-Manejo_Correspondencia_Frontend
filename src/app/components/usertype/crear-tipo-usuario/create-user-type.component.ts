import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTypeService } from '../../../services/user-type/user-type.service'; // Renamed service
import { Router } from '@angular/router';
import { UserTypeI } from '../../../models/User'; // Renamed model
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

/**
 * Component for creating a new user type.
 * It provides a form to input the description of the user type and submit it to the server.
 */
@Component({
  selector: 'app-create-user-type', // Renamed selector
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-user-type.component.html', // Renamed HTML file
  styleUrls: ['./create-user-type.component.css'] // Renamed CSS file
})
export class CreateUserTypeComponent implements OnInit { // Renamed class

  public form: FormGroup; // Declare form group for form validation
  userTypeService = inject(UserTypeService); // Inject service to handle API calls
  router = inject(Router); // Inject router for navigation

  constructor(private formBuilder: FormBuilder) {
    // Initialize form with a 'description' field, required validation
    this.form = this.formBuilder.group({
      description: ['', [Validators.required]] // Changed from 'puesto' to 'description'
    });
  }

  ngOnInit(): void {}

  /**
   * Handles form submission. If the form is valid, it creates a new user type.
   */
  onSubmit(): void {
    if (this.form.valid) { // Check if the form is valid
      const formValue: UserTypeI = this.form.value; // Get form values
      this.userTypeService.createType(formValue).subscribe(
        () => {
          this.router.navigateByUrl('user-type'); // Navigate to user-type list on success
        },
        err => {
          console.error(err); // Log any errors
        }
      );
    }
  }

  /**
   * Cancels the form submission and redirects to the user type list.
   */
  cancel() {
    this.router.navigateByUrl('/user-type'); // Navigate to user-type list
  }

  // Getter for description form control
  get description() { return this.form.get('description'); }
}
