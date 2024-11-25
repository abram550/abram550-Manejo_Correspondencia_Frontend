import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BranchService } from '../../../services/branches/branches.service';
import { BranchI } from '../../../models/Branch';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-show-branches',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule], // Add RouterModule here
  templateUrl: './show-branches.component.html',
  styleUrls: ['./show-branches.component.css']
})
export class ShowBranchesComponent implements OnInit  {

  public branches: BranchI[] = [];

  constructor(
    private branchService: BranchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showBranches();
  }

  /**
   * Fetches all branches and updates the 'branches' array.
   */
  showBranches() {
    this.branchService.getAllBranches()
      .subscribe({
        next: (data) => {
          this.branches = data.branches;
        }
      });
  }

  /**
   * Deletes a branch by its ID.
   * @param id - The ID of the branch to delete
   */
  delete(id: number): void {
    this.branchService.deleteBranch(id).subscribe(
      () => {
        this.showBranches();
      },
      err => {
        console.log('error');
      }
    );
  }
}
