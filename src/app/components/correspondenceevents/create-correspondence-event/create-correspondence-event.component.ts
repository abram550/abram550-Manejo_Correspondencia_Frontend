import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrespondenceEventsService } from '../../../services/events-correspondence/events-correspondence.service';
import { Router } from '@angular/router';
import { CorrespondenceEventsI } from '../../../models/CorrespondenceEvents';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-create-correspondence-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './create-correspondence-event.component.html',
  styleUrls: ['./create-correspondence-event.component.css']
})
export class CreateCorrespondenceEventComponent implements OnInit {
  
  public form: FormGroup; // Declaration of the form property
  correspondenceService = inject(CorrespondenceEventsService); // Injection of the correspondence events service
  router = inject(Router); // Injection of the router

  // Here you can add arrays for branches, employees, and correspondence states if needed.

  constructor(private formBuilder: FormBuilder) {
    // Initializing the form in the constructor
    this.form = this.formBuilder.group({
      correspondenceId: ['', [Validators.required]],  // Correspondence ID field, required validation
      branchId: ['', [Validators.required]],         // Branch ID field, required validation
      employeeId: ['', [Validators.required]],       // Employee ID field, required validation
      correspondenceStateId: ['', [Validators.required]], // Correspondence state ID field, required validation
      eventDate: ['', [Validators.required]],        // Event date field, required validation
      description: ['', [Validators.required]],      // Description field, required validation
    });
  }

  ngOnInit(): void { }

  // Submit method for the form
  onSubmit(): void {
    const formValue: CorrespondenceEventsI = this.form.value; // Get the form values
    console.log(formValue); // Log the form data
    this.correspondenceService.createEvent(formValue).subscribe(
      () => {
        console.log(formValue); // Log the successful form submission
        this.router.navigateByUrl('correspondence-events'); // Redirect to the list of events
      },
      err => {
        console.log(err); // Log errors
        console.log('Event creation failed'); // Log failure message
      }
    );
  }

  // Method to cancel the form submission and redirect to the event list
  cancel() {
    this.router.navigateByUrl('/correspondence-events'); // Redirect to the event list
  }

  // Getter methods for the form controls
  get correspondenceId() { return this.form.get('correspondenceId'); }
  get branchId() { return this.form.get('branchId'); }
  get employeeId() { return this.form.get('employeeId'); }
  get correspondenceStateId() { return this.form.get('correspondenceStateId'); }
  get eventDate() { return this.form.get('eventDate'); }
  get description() { return this.form.get('description'); }
}
