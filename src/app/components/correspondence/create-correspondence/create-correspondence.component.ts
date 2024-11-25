import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrespondenceService } from '../../../services/correspondence/correspondence.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UserI } from '../../../models/User';
import { EmployeeI } from '../../../models/Employee';
import { CorrespondenceTypeI } from '../../../models/CorrespondenceType';
import { CorrespondenceStateI } from '../../../models/CorrespondenceState';
import { BranchI } from '../../../models/Branch';
import { TransportI } from '../../../models/Transport';

@Component({
  selector: 'app-create-correspondence',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ToastModule, 
    CardModule, 
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule
  ],
  templateUrl: './create-correspondence.component.html',
  styleUrls: ['./create-correspondence.component.css']
})
export class CreateCorrespondenceComponent implements OnInit {
  
  public form: FormGroup;
  correspondenceService = inject(CorrespondenceService);
  router = inject(Router);

  // Lists for dropdowns
  users: UserI[] = [];
  employees: EmployeeI[] = [];
  correspondenceTypes: CorrespondenceTypeI[] = [];
  correspondenceStates: CorrespondenceStateI[] = [];
  branches: BranchI[] = [];
  transports: TransportI[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      remitenteId: ['', [Validators.required]],
      destinatarioId: ['', [Validators.required]],
      empleadoId: ['', [Validators.required]],
      tipoCorrespondenciaId: ['', [Validators.required]],
      estadoCorrespondenciaId: ['', [Validators.required]],
      sucursalOrigenId: ['', [Validators.required]],
      sucursalDestinoId: ['', [Validators.required]],
      transporteId: ['', [Validators.required]],
      fechaEnvio: [new Date(), [Validators.required]],
      fechaEntrega: [null],
      descripcion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData(): void {
    // Load users
    this.correspondenceService.getAllUsers().subscribe(
      response => {
        this.users = response.users;
      },
      error => console.error('Error loading users:', error)
    );

    // Load employees
    this.correspondenceService.getAllEmployees().subscribe(
      response => {
        this.employees = response.employees;
      },
      error => console.error('Error loading employees:', error)
    );

    // Load correspondence types
    this.correspondenceService.getAllCorrespondenceTypes().subscribe(
      response => {
        this.correspondenceTypes = response.types;
      },
      error => console.error('Error loading correspondence types:', error)
    );

    // Load correspondence states
    this.correspondenceService.getAllCorrespondenceStates().subscribe(
      response => {
        this.correspondenceStates = response.states;
      },
      error => console.error('Error loading correspondence states:', error)
    );

    // Load branches
    this.correspondenceService.getAllBranches().subscribe(
      response => {
        this.branches = response.branches;
      },
      error => console.error('Error loading branches:', error)
    );

    // Load transports
    this.correspondenceService.getAllTransports().subscribe(
      response => {
        this.transports = response.transports;
      },
      error => console.error('Error loading transports:', error)
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.correspondenceService.createCorrespondence(formValue).subscribe(
        () => {
          console.log('Correspondence created successfully');
          this.router.navigateByUrl('correspondence');
        },
        error => {
          console.error('Error creating correspondence:', error);
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/correspondence');
  }

  // Form getters
  get remitenteId() { return this.form.get('remitenteId'); }
  get destinatarioId() { return this.form.get('destinatarioId'); }
  get empleadoId() { return this.form.get('empleadoId'); }
  get tipoCorrespondenciaId() { return this.form.get('tipoCorrespondenciaId'); }
  get estadoCorrespondenciaId() { return this.form.get('estadoCorrespondenciaId'); }
  get sucursalOrigenId() { return this.form.get('sucursalOrigenId'); }
  get sucursalDestinoId() { return this.form.get('sucursalDestinoId'); }
  get transporteId() { return this.form.get('transporteId'); }
  get fechaEnvio() { return this.form.get('fechaEnvio'); }
  get fechaEntrega() { return this.form.get('fechaEntrega'); }
  get descripcion() { return this.form.get('descripcion'); }
}