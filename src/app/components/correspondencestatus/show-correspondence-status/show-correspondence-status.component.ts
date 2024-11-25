import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CorrespondenceStateService } from '../../../services/correspondence-state/correspondence-state.service';
import { CorrespondenceStateI } from '../../../models/CorrespondenceState';

/**
 * Component for displaying a list of correspondence statuses.
 */
@Component({
  selector: 'app-show-correspondence-status',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-correspondence-status.component.html',
  styleUrls: ['./show-correspondence-status.component.css']
})
export class ShowCorrespondenceStatusComponent implements OnInit {

  // Array to store the list of correspondence statuses
  public states: CorrespondenceStateI[] = [];

  constructor(
    private correspondenceStateService: CorrespondenceStateService, // Service for API communication
    private router: Router // Router for navigation
  ) { }

  /**
   * Lifecycle hook that runs when the component is initialized.
   */
  ngOnInit(): void {
    this.fetchStates();
  }

  /**
   * Fetches all correspondence statuses from the API and stores them in the `states` array.
   */
  fetchStates(): void {
    this.correspondenceStateService.getAllCorrespondenceStates()
      .subscribe({
        next: (data) => {
          this.states = data.states;
        },
        error: () => {
          console.error('Failed to fetch correspondence statuses.');
        }
      });
  }

  /**
   * Deletes a correspondence status by ID and refreshes the list.
   * @param id - ID of the correspondence status to delete.
   */
  delete(id: number): void {
    this.correspondenceStateService.deleteCorrespondenceState(id).subscribe(
      () => {
        this.fetchStates();
      },
      () => {
        console.error('Failed to delete the correspondence status.');
      }
    );
  }
}
