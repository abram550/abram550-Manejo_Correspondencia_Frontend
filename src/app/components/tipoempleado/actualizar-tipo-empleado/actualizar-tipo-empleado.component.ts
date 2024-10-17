import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoEmpleadoService } from '../../../services/tipoempleados/tipoempleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TipoEmpleadoI } from '../../../models/empleado';

@Component({
  selector: 'app-actualizar-tipo-empleado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './actualizar-tipo-empleado.component.html',
  styleUrls: ['./actualizar-tipo-empleado.component.css']
})
export class ActualizarTipoEmpleadoComponent implements OnInit {

  public form: FormGroup; // Declaración de la propiedad form
  tipoEmpleadoService = inject(TipoEmpleadoService); // Inyección del servicio
  router = inject(Router); // Inyección del router
  activatedRoute = inject(ActivatedRoute); // Inyección de la ruta activa

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      puesto: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.loadTipoEmpleado(); // Cargar datos del tipo de empleado al inicializar el componente
  }

  loadTipoEmpleado(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (id) {
      this.tipoEmpleadoService.getOneTipo(Number(id)).subscribe(
        response => {
          const tipoEmpleado = response.tipoEmpleado;
          this.form.patchValue({ // Cargar datos en el formulario
            puesto: tipoEmpleado.puesto
          });
        },
        error => {
          console.error('Error al cargar el tipo de empleado:', error);
          // Manejo de errores si es necesario
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: TipoEmpleadoI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL

    if (id) {
      this.tipoEmpleadoService.updateTipo(Number(id), formValue).subscribe(
        () => {
          console.log('Tipo de empleado actualizado correctamente:', formValue);
          this.router.navigateByUrl('/tipo-empleado'); // Redirigir a la lista de tipos de empleados
        },
        err => {
          console.error(err);
          console.log('No se ha actualizado correctamente');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/tipo-empleado'); // Redirigir a la lista de tipos de empleados
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get puesto() { return this.form.get('puesto'); }
}
