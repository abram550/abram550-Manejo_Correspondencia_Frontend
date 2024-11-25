import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrespondenceTypeI } from '../../../models/CorrespondenceType';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CorrespondenceTypeService } from '../../../services/correspondence-type/correspondence-type.service';

/**
 * Component to create a new correspondence type.
 */
@Component({
  selector: 'app-create-correspondence-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-correspondence-type.component.html',
  styleUrls: ['./create-correspondence-type.component.css']
})
export class CreateCorrespondenceTypeComponent implements OnInit {

  public form: FormGroup; 
  correspondenceTypeService = inject(CorrespondenceTypeService); // Inject correspondence type service
  router = inject(Router); // Inject router

  existingTypes: CorrespondenceTypeI[] = []; // Store existing correspondence types
  errorMessage: string = ''; // Error message

  constructor(private formBuilder: FormBuilder) {
    // Initialize form group with 'type' and 'newType'
    this.form = this.formBuilder.group({
      type: ['', [Validators.required]], // 'type' is required
      newType: [''] // Optional field for a new type
    });
  }

  ngOnInit(): void {
    this.fetchExistingTypes(); // Fetch existing types on component initialization
    this.onTypeChange(); // Monitor changes to 'type' field
  }

  /**
   * Fetches all existing correspondence types from the service.
   */
  fetchExistingTypes(): void {
    this.correspondenceTypeService.getAllTypes().subscribe(
      response => {
        this.existingTypes = response.types; // Populate existingTypes array with response data
      },
      error => {
        console.error('Error loading existing types', error); // Handle error if fetching fails
      }
    );
  }

  /**
   * Listens for changes in the 'type' field to validate the 'newType' field.
   */
  onTypeChange(): void {
    this.form.get('type')?.valueChanges.subscribe(value => {
      const newTypeControl = this.form.get('newType');

      // Check if the entered 'type' already exists
      const existingType = this.existingTypes.find(type => type.type.toLowerCase() === value.toLowerCase());
      if (existingType) {
        newTypeControl?.setValue(''); // Clear newType field if 'type' exists
        newTypeControl?.setValidators([Validators.required]); // Make newType required
        newTypeControl?.updateValueAndValidity();

        // Set error message if type already exists
        this.errorMessage = 'This correspondence type already exists. Please enter a new type.';
      } else {
        newTypeControl?.clearValidators(); // Remove validation if 'type' does not exist
        newTypeControl?.updateValueAndValidity();
        this.errorMessage = ''; // Clear error message
      }
    });
  }

  /**
   * Submits the form to create a new correspondence type or handle the existing type.
   */
  onSubmit(): void {
    const formValue = this.form.value; // Get form values

    // Check if the entered 'type' already exists
    const existingType = this.existingTypes.find(type => type.type.toLowerCase() === formValue.type.toLowerCase());

    if (existingType) {
      // If the type exists, save 'newType' if provided
      if (!formValue.newType) {
        this.errorMessage = 'This correspondence type already exists. Please enter a new type.';
        return;
      }

      // Set 'type' to 'newType' if it is provided
      formValue.type = formValue.newType;
    }

    // Submit the new type to the service
    this.correspondenceTypeService.createType(formValue).subscribe(
      () => {
        console.log('Type created successfully:', formValue);
        this.router.navigateByUrl('correspondence-type'); // Navigate to the correspondence type list page
      },
      err => {
        console.log(err);
        console.log('Failed to create type');
      }
    );
  }

  /**
   * Cancels the form submission and navigates to the correspondence type list page.
   */
  cancel() {
    this.router.navigateByUrl('/correspondence-type'); // Navigate to the list page
  }

  get type() { return this.form.get('type'); } // Getter for 'type' form control
}
