import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EmployeeTypeService } from '../../../services/employee-type/employee-type.service';
import { EmployeeTypeI } from '../../../models/Employee';

@Component({
  selector: 'app-show-employee-type',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-employee-type.component.html',
  styleUrls: ['./show-employee-type.component.css']
})
export class ShowEmployeeTypeComponent implements OnInit  {

  public types: EmployeeTypeI[] = [];

  constructor(
    private employeeTypeService: EmployeeTypeService,
    private router: Router
  ) { }

  /**
   * On initialization, loads the employee types.
   */
  ngOnInit(): void {
    this.showTypes();
  }

  /**
   * Fetches all employee types from the service and stores them in the 'types' variable.
   */
  showTypes() {
    this.employeeTypeService.getAllTypes()
      .subscribe({
        next: (data) => {
          this.types = data.employeeTypes;
        }
      });
  }

  /**
   * Deletes an employee type by its ID and refreshes the list.
   * @param id - The ID of the employee type to be deleted.
   */
  delete(id: number): void {
    this.employeeTypeService.deleteType(id).subscribe(
      () => {
        this.showTypes();
      },
      err => {
        console.log('error');
      }
    );
  }
}
