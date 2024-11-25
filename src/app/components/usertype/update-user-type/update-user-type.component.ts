import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTypeService } from '../../../services/user-type/user-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { UserTypeI } from '../../../models/User';

@Component({
  selector: 'app-update-user-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './update-user-type.component.html',
  styleUrls: ['./update-user-type.component.css']
})
export class UpdateUserTypeComponent implements OnInit {

  public form: FormGroup; // Declaration of the form
  userTypeService = inject(UserTypeService); // Injection of the service
  router = inject(Router); // Injection of the router
  activatedRoute = inject(ActivatedRoute); // Injection of the active route

  constructor(private formBuilder: FormBuilder) {
    // Initialization of the form in the constructor
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(3)]], // Form field validation for 'description'
    });
  }

  ngOnInit(): void {
    this.loadUserType(); // Load user type data when the component is initialized
  }

  /**
   * Loads the user type based on the ID from the route.
   */
  loadUserType(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get ID from the URL
    if (id) {
      this.userTypeService.getOneType(Number(id)).subscribe(
        response => {
          const userType = response.userType;
          this.form.patchValue({ // Load the data into the form
            description: userType.description
          });
        },
        error => {
          console.error('Error loading user type:', error);
        }
      );
    }
  }

  /**
   * Submits the form and updates the user type.
   */
  onSubmit(): void {
    const formValue: UserTypeI = this.form.value; // Get form value
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get ID from the URL

    if (id) {
      this.userTypeService.updateType(Number(id), formValue).subscribe(
        () => {
          console.log('User type updated successfully:', formValue);
          this.router.navigateByUrl('/user-type'); // Redirect to the user types list
        },
        err => {
          console.error(err);
          console.log('Failed to update user type');
        }
      );
    }
  }

  /**
   * Cancels the update and redirects to the user types list.
   */
  cancel() {
    this.router.navigateByUrl('/user-type'); // Redirect to the user types list
  }

  // Getter for the 'description' field to handle validations
  get description() { return this.form.get('description'); }
}
