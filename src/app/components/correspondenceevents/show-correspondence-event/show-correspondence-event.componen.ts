import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CorrespondenceEventsService } from '../../../services/events-correspondence/events-correspondence.service';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { CorrespondenceEventsI } from '../../../models/CorrespondenceEvents';
/**
 * Component that displays the list of correspondence events, allowing the user
 * to create, edit, or delete an event.
 */
@Component({
  selector: 'app-show-correspondence-event',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule, CommonModule], // External modules used by the component
  templateUrl: './show-correspondence-event.component.html',
  styleUrls: ['./show-correspondence-event.component.css']
})
export class ShowCorrespondenceEventComponent implements OnInit {

  // Array to hold the list of events
  public events: CorrespondenceEventsI[] = [];

  constructor(
    @Inject(CorrespondenceEventsService) private correspondenceeventsService: CorrespondenceEventsService, // Use @Inject
    private router: Router // Router to navigate between routes
  ) { }

  ngOnInit(): void {
    // Load the events when the component is initialized
    this.loadEvents();
  }

  /**
   * Fetches all the events from the service and assigns them to the events array.
   */
  loadEvents() {
    this.correspondenceeventsService.getAllEvents()
      .subscribe({
        next: (data) => {
          this.events = data.events; // Populates the events array with the fetched data
        }
      });
  }

  /**
   * Deletes the event with the given ID by calling the delete method in the service.
   * @param id The ID of the event to delete.
   */
  deleteEvent(id: number): void {
    this.correspondenceeventsService.deleteEvent(id).subscribe(
      () => {
        // Reload the events after deletion
        this.loadEvents();
      },
      err => {
        // Handle error if deletion fails
        console.log('error');
      }
    );
  }
}
