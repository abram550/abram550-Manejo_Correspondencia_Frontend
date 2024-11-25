import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CorrespondenceService } from '../../../services/correspondence/correspondence.service';
import { UserI } from '../../../models/User';
import { EmployeeI } from '../../../models/Employee';
import { CorrespondenceTypeI } from '../../../models/CorrespondenceType';
import { CorrespondenceStateI } from '../../../models/CorrespondenceState';
import { BranchI } from '../../../models/Branch';
import { TransportI } from '../../../models/Transport';
import { CorrespondenceI } from '../../../models/Correspondence';

@Component({
  selector: 'app-update-correspondence',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ToastModule, 
    CardModule, 
    ButtonModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule
  ],
  templateUrl: './update-correspondence.component.html',
  styleUrls: ['./update-correspondence.component.css']
})
export class UpdateCorrespondenceComponent implements OnInit {
  public form: FormGroup;
  correspondenceService = inject(CorrespondenceService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  errorMessage: string = '';

  users: UserI[] = [];
  employees: EmployeeI[] = [];
  states: CorrespondenceStateI[] = [];
  branches: BranchI[] = [];
  transports: TransportI[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      senderId: ['', [Validators.required]],
      recipientId: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      correspondenceStateId: ['', [Validators.required]],
      originBranchId: ['', [Validators.required]],
      destinationBranchId: ['', [Validators.required]],
      transportId: ['', [Validators.required]],
      sendDate: ['', [Validators.required]],
      deliveryDate: [''],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
    this.loadCorrespondence();
  }

  loadDropdownData(): void {
    this.correspondenceService.getAllUsers().subscribe(
      response => this.users = response.users,
      error => console.error('Error loading users:', error)
    );

    this.correspondenceService.getAllEmployees().subscribe(
      response => this.employees = response.employees,
      error => console.error('Error loading employees:', error)
    );

    this.correspondenceService.getAllCorrespondenceStates().subscribe(
      response => this.states = response.states,
      error => console.error('Error loading states:', error)
    );

    this.correspondenceService.getAllBranches().subscribe(
      response => this.branches = response.branches,
      error => console.error('Error loading branches:', error)
    );

    this.correspondenceService.getAllTransports().subscribe(
      response => this.transports = response.transports,
      error => console.error('Error loading transports:', error)
    );
  }

  loadCorrespondence(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.correspondenceService.getOneCorrespondence(Number(id)).subscribe(
        response => {
          const correspondence = response.correspondence;
          this.form.patchValue({
            senderId: correspondence.senderId,
            recipientId: correspondence.recipientId,
            employeeId: correspondence.employeeId,
            correspondenceStateId: correspondence.correspondenceStateId,
            originBranchId: correspondence.originBranchId,
            destinationBranchId: correspondence.destinationBranchId,
            transportId: correspondence.transportId,
            sendDate: new Date(correspondence.sendDate),
            deliveryDate: correspondence.deliveryDate ? new Date(correspondence.deliveryDate) : null,
            description: correspondence.description
          });
        },
        error => {
          console.error('Error loading correspondence:', error);
          this.errorMessage = 'Could not load the correspondence. Please try again later.';
        }
      );
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue: CorrespondenceI = this.form.value;
      const id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        this.correspondenceService.updateCorrespondence(Number(id), formValue).subscribe(
          () => {
            console.log('Correspondence updated successfully:', formValue);
            this.router.navigateByUrl('/correspondence');
          },
          err => {
            console.error('Update failed:', err);
            this.errorMessage = 'Failed to update correspondence. Please try again.';
          }
        );
      }
    }
  }

  cancel() {
    this.router.navigateByUrl('/correspondence');
  }
}