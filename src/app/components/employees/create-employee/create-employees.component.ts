import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesService } from '../../../services/employee/employee.service';
import { Router } from '@angular/router';
import { EmployeeI, EmployeeTypeI } from '../../../models/Employee';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-create-employees',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    RippleModule,
  ],
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css'],
})
export class CreateEmployeesComponent implements OnInit {
  public form!: FormGroup;
  public employeeTypes: { label: string; value: number }[] = []; // Para el dropdown
  selectedEmployeeType: number | null = null;

  private employeesService = inject(EmployeesService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      employeeTypeId: [null, [Validators.required]],
      status: [true],
    });
  }

  ngOnInit(): void {
    this.loadEmployeeTypes();
  }

  private loadEmployeeTypes(): void {
    this.employeesService.getAllEmployeeTypes().subscribe({
      next: (data) => {
        console.log('Tipos de empleados:', data); // Confirmar datos
        this.employeeTypes = data.map((type) => ({
          label: type.jobTitle, // Etiqueta visible en el dropdown
          value: type.id,       // Valor asociado
        }));
      },
      error: (err) => {
        console.error('Error al obtener los tipos de empleados:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue: EmployeeI = {
        ...this.form.value,
        employeeType: this.employeeTypes.find(
          (type) => type.value === this.form.value.employeeTypeId
        ), // Asociar el tipo de empleado seleccionado
      };

      this.employeesService.createEmployee(formValue).subscribe({
        next: () => {
          this.router.navigateByUrl('employees');
        },
        error: (err) => {
          console.error('Error al crear el empleado', err);
        },
      });
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/employees');
  }

  // Getters para los controles del formulario
  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get employeeTypeId() {
    return this.form.get('employeeTypeId');
  }
}
