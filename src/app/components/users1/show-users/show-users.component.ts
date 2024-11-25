import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UsersService } from '../../../services/users/users.service';
import { UserI } from '../../../models/User';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  public users: UserI[] = []; // Holds the list of active users

  constructor(
    private usersService: UsersService, // Inject the UsersService
    private router: Router // Inject the Router for navigation
  ) { }

  ngOnInit(): void {
    this.showUsers(); // Fetch users on component initialization
  }

  /**
   * Fetches all active users from the service and assigns them to the users property.
   */
  showUsers() {
    this.usersService.getAllUsers()
      .subscribe({
        next: (data) => {
          // Filter only active users (status: true)
          this.users = data.users.filter(user => user.status);
        },
        error: (err) => {
          console.error('Error fetching users:', err); // Log any errors
        }
      });
  }

  /**
   * Soft deletes a user by updating their status to false.
   * @param id - The ID of the user to delete.
   */
  deleteUser(id: number): void {
    const updatedUser = { status: false }; // Soft delete payload
    this.usersService.updateUser(id, updatedUser as UserI).subscribe(
      () => {
        this.showUsers(); // Refresh the user list after deletion
      },
      err => {
        console.error('Error deleting user:', err); // Log error to console
      }
    );
  }


}
