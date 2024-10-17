import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from '../../../services/empleados/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoI, TipoEmpleadoI } from '../../../models/empleado'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-actualizar-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './actualizar-empleados.component.html',
  styleUrls: ['./actualizar-empleados.component.css'] 
})
export class ActualizarEmpleadosComponent implements OnInit { 
  
  public id: number = 0;
  public form!: FormGroup;
  public tiposEmpleado: TipoEmpleadoI[] = []; // Array para almacenar los tipos de empleados
  public empleado!: EmpleadoI | null; // Puede ser null hasta que se cargue

  empleadosService = inject(EmpleadosService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID de la ruta
    this.loadEmpleado(); // Cargar los datos del empleado
    this.loadTiposEmpleado(); // Cargar los tipos de empleados
  }

  loadEmpleado(): void {
    this.empleadosService.getOneEmpleado(this.id).subscribe(empleado => {
      this.empleado = empleado.empleado; // Asegurarse de que tenga la información completa del empleado
      this.initializeForm(); // Inicializa el formulario después de cargar el empleado
    });
  }

  loadTiposEmpleado(): void {
    this.empleadosService.getAllTiposEmpleado().subscribe(tipos => {
      this.tiposEmpleado = tipos; // Cargar tipos de empleados al iniciar
    });
  }

  initializeForm(): void {
    if (this.empleado) { // Verificar que el empleado no sea null
      this.form = this.formBuilder.group({
        id: [this.empleado.id],
        nombre: [this.empleado.nombre, [Validators.required]],
        correo: [this.empleado.correo, [Validators.required, Validators.email]],
        telefono: [this.empleado.telefono, [Validators.required]],
        tipoEmpleadoId: [this.empleado.tipoEmpleado.id, [Validators.required]] // Cambiado a id del tipo de empleado
      });
    } else {
      this.form = this.formBuilder.group({
        id: [''],
        nombre: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required]],
        tipoEmpleadoId: ['', [Validators.required]] // Cambiado a id del tipo de empleado
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) { // Verificar que el formulario sea válido
      const formValue: EmpleadoI = {
        ...this.form.value,
        tipoEmpleado: { id: this.form.value.tipoEmpleadoId } as TipoEmpleadoI // Añadir tipoEmpleado completo para el envío
      };
      this.empleadosService.updateEmpleado(this.id, formValue).subscribe(
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
    this.router.navigateByUrl('/empleados'); // Redirigir a la lista de empleados
  }

  // Métodos getter para acceder fácilmente a los controles del formulario
  get nombre() { return this.form.get('nombre'); }
  get correo() { return this.form.get('correo'); }
  get telefono() { return this.form.get('telefono'); }
  get tipoEmpleadoId() { return this.form.get('tipoEmpleadoId'); } // Getter para tipoEmpleadoId
}
