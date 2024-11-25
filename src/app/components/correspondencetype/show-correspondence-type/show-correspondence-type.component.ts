// src/app/components/correspondence-type/show-correspondence-type/show-correspondence-type.component.ts
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CorrespondenceTypeService } from '../../../services/correspondence-type/correspondence-type.service';
import { CorrespondenceTypeI } from '../../../models/CorrespondenceType';

/**
 * Component for displaying the list of correspondence types.
 */
@Component({
  selector: 'app-show-correspondence-type',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-correspondence-type.component.html',
  styleUrls: ['./show-correspondence-type.component.css']
})
export class ShowCorrespondenceTypeComponent implements OnInit  {

  public types: CorrespondenceTypeI[] = []; // Array to store the list of correspondence types

  constructor(
    private correspondenceTypeService: CorrespondenceTypeService, // Service to manage correspondence types
    private router: Router // Router to navigate between pages
  ) { }

  /**
   * OnInit lifecycle hook that loads the correspondence types when the component is initialized.
   */
  ngOnInit(): void {
    this.loadTypes(); // Load the types on component initialization
  }

  /**
   * Fetches the list of all correspondence types from the service.
   */
  loadTypes() {
    this.correspondenceTypeService.getAllTypes()
      .subscribe({
        next: (data) => {
          this.types = data.types; // Update the types array with the fetched data
        }
      });
  }

  /**
   * Deletes a correspondence type by ID.
   * @param id - The ID of the correspondence type to be deleted.
   */
  delete(id: number): void {
    this.correspondenceTypeService.deleteType(id).subscribe(
      () => {
        this.loadTypes(); // Reload the types list after deletion
      },
      err => {
        console.log('error'); // Log error if deletion fails
      }
    );
  }
}
