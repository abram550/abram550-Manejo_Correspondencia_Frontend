import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrespondenceEventsService } from '../../../services/events-correspondence/events-correspondence.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CorrespondenceEventsI } from '../../../models/CorrespondenceEvents';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-update-correspondence-events', // Component selector in English
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './update-correspondence-events.component.html', // Updated component template path
  styleUrls: ['./update-correspondence-events.component.css'] // Updated styles path
})
export class UpdateCorrespondenceEventsComponent implements OnInit {

  public form: FormGroup; // Declaration of the form property
  eventsService = inject(CorrespondenceEventsService); // Injecting the events service
  router = inject(Router); // Injecting the router
  activatedRoute = inject(ActivatedRoute); // Injecting the activated route

  constructor(private formBuilder: FormBuilder) {
    // Initializing the form in the constructor
    this.form = this.formBuilder.group({
      correspondenceId: ['', [Validators.required]], // Correspondence ID with required validation
      branchId: ['', [Validators.required, Validators.min(0)]], // Branch ID with non-negative validation
      employeeId: ['', [Validators.required, Validators.min(0)]], // Employee ID with non-negative validation
      correspondenceStatusId: ['', [Validators.required, Validators.min(0)]], // Status ID with non-negative validation
      eventDate: ['', [Validators.required]], // Event date with required validation
      description: ['', [Validators.required]], // Description with required validation
    });
  }

  ngOnInit(): void {
    this.loadEvent(); // Load event data when the component initializes
  }

  // Method to load event data from the API
  loadEvent(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Retrieve ID from the URL
    if (id) {
      this.eventsService.getOneEvent(Number(id)).subscribe(
        response => {
          const event = response.event;
          this.form.patchValue({ // Patching the form with retrieved event data
            correspondenceId: event.correspondenceId,
            branchId: event.branchId,
            employeeId: event.employeeId,
            correspondenceStatusId: event.correspondencestateId,
            eventDate: event.eventDate,
            description: event.description
          });
        },
        error => {
          console.error('Error loading the event:', error); // Handling errors if necessary
        }
      );
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    const formValue: CorrespondenceEventsI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Get ID from URL

    if (id) {
      this.eventsService.updateEvent(Number(id), formValue).subscribe(
        () => {
          console.log('Event updated successfully:', formValue);
          this.router.navigateByUrl('correspondence-events'); // Redirect to the list of events
        },
        err => {
          console.error(err);
          console.log('Update failed');
        }
      );
    }
  }

  // Method to handle cancelation
  cancel() {
    this.router.navigateByUrl('/correspondence-events'); // Redirect to the list of events
  }

  // Getter methods to access form controls
  get correspondenceId() { return this.form.get('correspondenceId'); }
  get branchId() { return this.form.get('branchId'); }
  get employeeId() { return this.form.get('employeeId'); }
  get correspondenceStatusId() { return this.form.get('correspondenceStatusId'); }
  get eventDate() { return this.form.get('eventDate'); }
  get description() { return this.form.get('description'); }
}
