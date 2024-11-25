import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CorrespondenceService } from '../../../services/correspondence/correspondence.service';
import { CorrespondenceI } from '../../../models/Correspondence';
import { UserI } from '../../../models/User';
import { EmployeeI } from '../../../models/Employee';
import { CorrespondenceTypeI } from '../../../models/CorrespondenceType';
import { CorrespondenceStateI } from '../../../models/CorrespondenceState';
import { BranchI } from '../../../models/Branch';
import { TransportI } from '../../../models/Transport';

@Component({
  selector: 'app-display-correspondence',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './display-correspondence.component.html',
  styleUrls: ['./display-correspondence.component.css']
})
export class DisplayCorrespondenceComponent implements OnInit {
  public correspondence: CorrespondenceI[] = [];
  public users: UserI[] = [];
  public employees: EmployeeI[] = [];
  public correspondenceTypes: CorrespondenceTypeI[] = [];
  public correspondenceStates: CorrespondenceStateI[] = [];
  public branches: BranchI[] = [];
  public transports: TransportI[] = [];

  constructor(
    private correspondenceService: CorrespondenceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loadCorrespondences();
    this.loadUsers();
    this.loadEmployees();
    this.loadCorrespondenceTypes();
    this.loadCorrespondenceStates();
    this.loadBranches();
    this.loadTransports();
  }

  loadCorrespondences(): void {
    this.correspondenceService.getAllCorrespondences().subscribe({
      next: (data) => {
        console.log('Correspondences loaded:', data);
        this.correspondence = data.correspondences;
      },
      error: (err) => {
        console.error('Error loading correspondences:', err);
      }
    });
  }

  loadUsers(): void {
    this.correspondenceService.getAllUsers().subscribe({
      next: (data: any) => {
        console.log('Users loaded:', data);
        this.users = data.users; // Acceder a la propiedad users
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  loadEmployees(): void {
    this.correspondenceService.getAllEmployees().subscribe({
      next: (data: any) => {
        console.log('Employees loaded:', data);
        this.employees = data.employees; // Acceder a la propiedad employees
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      }
    });
  }

  loadCorrespondenceTypes(): void {
    this.correspondenceService.getAllCorrespondenceTypes().subscribe({
      next: (data: any) => {
        console.log('Correspondence types loaded:', data);
        this.correspondenceTypes = data.types; // Acceder a la propiedad types
      },
      error: (err) => {
        console.error('Error loading correspondence types:', err);
      }
    });
  }

  loadCorrespondenceStates(): void {
    this.correspondenceService.getAllCorrespondenceStates().subscribe({
      next: (data: any) => {
        console.log('Correspondence states loaded:', data);
        this.correspondenceStates = data.states; // Acceder a la propiedad states
      },
      error: (err) => {
        console.error('Error loading correspondence states:', err);
      }
    });
  }
  
  loadBranches(): void {
    this.correspondenceService.getAllBranches().subscribe({
      next: (data: any) => {
        console.log('Branches loaded:', data);
        this.branches = data.branches; // Acceder a la propiedad branches
      },
      error: (err) => {
        console.error('Error loading branches:', err);
      }
    });
  }
  
  loadTransports(): void {
    this.correspondenceService.getAllTransports().subscribe({
      next: (data: any) => {
        console.log('Transports loaded:', data);
        this.transports = data.transports; // Acceder a la propiedad transports
      },
      error: (err) => {
        console.error('Error loading transports:', err);
      }
    });
  }

  getSenderName(id: number): string {
    if (!this.users || this.users.length === 0) {
      return 'Loading...';
    }
    const user = this.users.find(u => u.id === id);
    return user ? user.name : 'Sender not found';
  }

  getRecipientName(id: number): string {
    if (!this.users || this.users.length === 0) {
      return 'Loading...';
    }
    const user = this.users.find(u => u.id === id);
    return user ? user.name : 'Recipient not found';
  }

  getEmployeeName(id: number): string {
    if (!this.employees || this.employees.length === 0) {
      return 'Loading...';
    }
    const employee = this.employees.find(e => e.id === id);
    return employee ? employee.name : 'Employee not found';
  }

  getCorrespondenceTypeName(id: number): string {
    if (!this.correspondenceTypes || this.correspondenceTypes.length === 0) {
      return 'Loading...';
    }
    const type = this.correspondenceTypes.find(t => t.id === id);
    return type ? type.type : 'Type not found';
  }

  getCorrespondenceStateName(id: number): string {
    if (!this.correspondenceStates || this.correspondenceStates.length === 0) {
      return 'Loading...';
    }
    const state = this.correspondenceStates.find(s => s.id === id);
    return state ? state.state : 'State not found';
  }

  getOriginBranchName(id: number): string {
    if (!this.branches || this.branches.length === 0) {
      return 'Loading...';
    }
    const branch = this.branches.find(b => b.id === id);
    return branch ? branch.name : 'Origin branch not found';
  }

  getDestinationBranchName(id: number): string {
    if (!this.branches || this.branches.length === 0) {
      return 'Loading...';
    }
    const branch = this.branches.find(b => b.id === id);
    return branch ? branch.name : 'Destination branch not found';
  }

  getTransportName(id: number): string {
    if (!this.transports || this.transports.length === 0) {
      return 'Loading...';
    }
    const transport = this.transports.find(t => t.id === id);
    return transport ? transport.plate : 'Transport not found';
  }

  delete(id: number): void {
    this.correspondenceService.deleteCorrespondence(id).subscribe({
      next: () => {
        console.log(`Correspondence with ID ${id} deleted successfully.`);
        this.loadCorrespondences();
      },
      error: (err) => {
        console.error('Error deleting correspondence:', err);
      }
    });
  }
}