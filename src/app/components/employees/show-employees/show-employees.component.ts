import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EmployeesService } from '../../../services/employee/employee.service';
import { EmployeeI, EmployeeTypeI } from '../../../models/Employee';

@Component({
  selector: 'app-show-employees',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-employees.component.html',
  styleUrls: ['./show-employees.component.css']
})
export class ShowEmployeesComponent implements OnInit {

  public employees: EmployeeI[] = []; // Array to store employees
  public employeeTypes: EmployeeTypeI[] = []; // Array to store employee types

  constructor(
    private employeesService: EmployeesService, // Inject EmployeesService to fetch data
    private router: Router // Inject Router for navigation
  ) { }

  ngOnInit(): void {
    this.loadEmployees(); // Load employees on component initialization
    this.loadEmployeeTypes(); // Load employee types on component initialization
  }

  // Method to fetch all employees from the service
  loadEmployees() {
    this.employeesService.getAllEmployees()
      .subscribe({
        next: (data) => {
          this.employees = data.employees; // Assign fetched data to employees array
        }
      });
  }

  // Method to fetch all employee types from the service
  loadEmployeeTypes() {
    this.employeesService.getAllEmployeeTypes()
      .subscribe({
        next: (data) => {
          this.employeeTypes = data; // Assign fetched data to employeeTypes array
        }
      });
  }

  // Method to delete an employee by ID
  delete(id: number): void {
    this.employeesService.deleteEmployee(id).subscribe(
      () => {
        this.loadEmployees(); // Reload employees after deletion
      },
      err => {
        console.log('Error deleting employee'); // Log error in case of failure
      }
    );
  }
}
