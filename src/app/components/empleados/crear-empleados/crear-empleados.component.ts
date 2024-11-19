import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from '../../../services/employee/employee.service';
import { Router } from '@angular/router';
import { EmpleadoI, TipoEmpleadoI } from '../../../models/Employee'; // Asegúrate de importar ambos modelos
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-crear-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './crear-empleados.component.html',
  styleUrls: ['./crear-empleados.component.css']
})
export class CrearEmpleadosComponent implements OnInit {
  
  public form: FormGroup;
  public tiposEmpleado: TipoEmpleadoI[] = []; // Para almacenar los tipos de empleado
  empleadosService = inject(EmpleadosService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      tipoEmpleadoId: ['', [Validators.required]] // Cambiado para usar tipoEmpleadoId
    });
  }

  ngOnInit(): void {
    this.empleadosService.getAllTiposEmpleado().subscribe(tipos => {
      this.tiposEmpleado = tipos; // Cargar tipos de empleado al iniciar
    });
  }

  onSubmit(): void {
    if (this.form.valid) { // Verificar que el formulario sea válido
      const formValue: EmpleadoI = this.form.value;
      this.empleadosService.createEmpleado(formValue).subscribe(
        () => {
          this.router.navigateByUrl('empleados');
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/empleados');
  }

  get nombre() { return this.form.get('nombre'); }
  get correo() { return this.form.get('correo'); }
  get telefono() { return this.form.get('telefono'); }
  get tipoEmpleadoId() { return this.form.get('tipoEmpleadoId'); } // Añadido getter para tipoEmpleadoId
}
