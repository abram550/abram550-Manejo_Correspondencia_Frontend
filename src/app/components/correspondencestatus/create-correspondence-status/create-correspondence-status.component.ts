import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CorrespondenceStateService } from '../../../services/correspondence-state/correspondence-state.service';
import { CorrespondenceStateI } from '../../../models/CorrespondenceState';

@Component({
  selector: 'app-create-correspondence-status',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-correspondence-status.component.html',
  styleUrls: ['./create-correspondence-status.component.css']
})
export class CreateCorrespondenceStatusComponent implements OnInit {

  public form: FormGroup;
  correspondenceStateService = inject(CorrespondenceStateService);
  router = inject(Router);

  existingStates: CorrespondenceStateI[] = [];
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      state: ['', [Validators.required]],
      status: [true, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadExistingStates();
    this.onStateChange();
  }

  /**
   * Loads all existing correspondence states from the service.
   */
  loadExistingStates(): void {
    this.correspondenceStateService.getAllCorrespondenceStates().subscribe(
      response => {
        this.existingStates = response.states;
      },
      error => {
        console.error('Error loading existing states', error);
      }
    );
  }

  /**
   * Detects changes in the "state" input and validates against existing states.
   */
  onStateChange(): void {
    this.form.get('state')?.valueChanges.subscribe(value => {
      const existingState = this.existingStates.find(
        state => state.state.toLowerCase() === value.toLowerCase()
      );

      if (existingState) {
        this.errorMessage = 'This correspondence state already exists. Please enter a unique state.';
      } else {
        this.errorMessage = '';
      }
    });
  }

  /**
   * Submits the form to create a new correspondence state.
   */
  onSubmit(): void {
    const formValue: CorrespondenceStateI = this.form.value;

    const existingState = this.existingStates.find(
      state => state.state.toLowerCase() === formValue.state.toLowerCase()
    );

    if (existingState) {
      this.errorMessage = 'The correspondence state already exists. Please provide a unique state.';
      return;
    }

    this.correspondenceStateService.createCorrespondenceState(formValue).subscribe(
      () => {
        console.log('State created successfully:', formValue);
        this.router.navigateByUrl('correspondence-status');
      },
      err => {
        console.error('Failed to create the state', err);
      }
    );
  }

  /**
   * Cancels the operation and navigates back to the correspondence status list.
   */
  cancel() {
    this.router.navigateByUrl('/correspondence-status');
  }

  // Getter for the 'state' form control
  get state() { return this.form.get('state'); }
}
