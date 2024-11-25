import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users/users.service';
import { Router } from '@angular/router';
import { UserI } from '../../../models/User';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

/**
 * Component for creating new users.
 * Handles the form, form validation, and submission logic.
 */
@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  public form: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    // Initializing the form with validation rules
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      status: [true] // Default status is true for new users
    });
  }

  ngOnInit(): void {}

  /**
   * Handles form submission.
   * If the form is valid, it sends the data to the backend.
   */
  onSubmit(): void {
    if (this.form.valid) {
      const formValue: UserI = this.form.value;
      this.usersService.createUser(formValue).subscribe(
        () => {
          this.router.navigateByUrl('users');
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  /**
   * Navigates back to the user list without saving.
   */
  cancel() {
    this.router.navigateByUrl('/users');
  }

  // Getters for form controls
  get name() { return this.form.get('name'); }
  get address() { return this.form.get('address'); }
  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }
  get password() { return this.form.get('password'); }
}
