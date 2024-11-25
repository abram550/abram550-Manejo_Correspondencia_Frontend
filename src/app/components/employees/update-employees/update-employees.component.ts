import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesService } from '../../../services/employee/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeI, EmployeeTypeI } from '../../../models/Employee';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-update-employees',
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
  templateUrl: './update-employees.component.html',
  styleUrls: ['./update-employees.component.css'],
})
export class UpdateEmployeesComponent implements OnInit {
  public form!: FormGroup;
  public employeeTypes: { label: string; value: number }[] = [];
  public employee: EmployeeI | null = null; // Almacena el empleado a editar

  private employeesService = inject(EmployeesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
    this.loadEmployee();
  }

  private loadEmployeeTypes(): void {
    this.employeesService.getAllEmployeeTypes().subscribe({
      next: (data: EmployeeTypeI[]) => { // Asegúrate de que 'data' es un arreglo de EmployeeTypeI
        console.log('Tipos de empleados:', data);
        // Mapea los tipos de empleados al formato adecuado para el dropdown
        this.employeeTypes = data.map((type: EmployeeTypeI) => ({
          label: type.jobTitle,
          value: type.id,
        }));
      },
      error: (err) => {
        console.error('Error al obtener los tipos de empleados:', err);
      },
    });
  }

  private loadEmployee(): void {
    const employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(employeeId)) {
      this.employeesService.getOneEmployee(employeeId).subscribe({
        next: (response) => {
          this.employee = response.employee;
          this.form.patchValue({
            name: this.employee?.name,
            email: this.employee?.email,
            phone: this.employee?.phone,
            employeeTypeId: this.employee?.employeeType?.id,
            status: this.employee?.status,
          });
        },
        error: (err) => {
          console.error('Error al cargar el empleado:', err);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.employee) {
      const updatedEmployee: EmployeeI = {
        ...this.employee,
        ...this.form.value,
      };

      this.employeesService.updateEmployee(this.employee.id, updatedEmployee).subscribe({
        next: () => {
          this.router.navigateByUrl('employees');
        },
        error: (err) => {
          console.error('Error al actualizar el empleado:', err);
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
