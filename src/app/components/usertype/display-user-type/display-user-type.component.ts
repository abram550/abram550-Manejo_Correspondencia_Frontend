import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UserTypeService } from '../../../services/user-type/user-type.service';
import { UserTypeI } from '../../../models/User'

@Component({
  selector: 'app-display-user-type',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './display-user-type.component.html',
  styleUrls: ['./display-user-type.component.css']
})
export class DisplayUserTypeComponent implements OnInit {

  // Array to hold the user types
  public userTypes: UserTypeI[] = [];

  constructor(
    // Injecting the service and router
    private userTypeService: UserTypeService,
    private router: Router
  ) { }

  // Component initialization
  ngOnInit(): void {
    this.displayUserTypes();
  }

  // Method to fetch all user types from the service
  displayUserTypes() {
    this.userTypeService.getAllTypes()
      .subscribe({
        next: (data) => {
          // Storing the fetched user types in the array
          this.userTypes = data.userTypes;
        }
      });
  }

  // Method to delete a user type by id
  delete(id: number): void {
    this.userTypeService.deleteType(id).subscribe(
      () => {
        // Refresh the list after deletion
        this.displayUserTypes();
      },
      err => {
        // Handle error during deletion
        console.log('Error deleting the user type');
      }
    );
  }
}
