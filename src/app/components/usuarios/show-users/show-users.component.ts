import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UsersService } from '../../../services/users/users.service';
import { UserI } from '../../../models/User';

@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css'] // Fixed the property name from styleUrl to styleUrls
})
export class ShowUsersComponent implements OnInit {

  public users: UserI[] = []; // Holds the list of users

  constructor(
    private usersService: UsersService, // Inject the UsersService
    private router: Router // Inject the Router for navigation
  ) { }

  ngOnInit(): void {
    this.showUsers(); // Fetch users on component initialization
  }

  /**
   * Fetches all users from the service and assigns them to the users property.
   */
  showUsers() {
    this.usersService.getAllUsers()
      .subscribe({
        next: (data) => {
          this.users = data.users; // Assign fetched users to the component property
        }
      });
  }

  /**
   * Deletes a user by their ID and navigates back to the user list.
   * @param id - The ID of the user to delete.
   */
  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe(
      () => {
        this.showUsers(); // Refresh the user list after deletion
      },
      err => {
        console.error('Error deleting user:', err); // Log error to console
        this.router.navigateByUrl('/users'); // Navigate back to user list on error
      }
    );
  }
}
