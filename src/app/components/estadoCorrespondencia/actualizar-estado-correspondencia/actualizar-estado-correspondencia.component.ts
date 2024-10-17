import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { EstadoCorrespondenciaService } from '../../../services/estado-correspondencia/estado-correspondencia.service';
import { EstadoCorrespondenciaI } from '../../../models/estadocorrespondencia';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-actualizar-estado-correspondencia',
  standalone: true,
  imports: [DropdownModule, CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './actualizar-estado-correspondencia.component.html',
  styleUrls: ['./actualizar-estado-correspondencia.component.css']
})
export class ActualizarEstadoCorrespondenciaComponent implements OnInit {

  public form: FormGroup;
  estadoCorrespondenciaService = inject(EstadoCorrespondenciaService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      estado: ['', [Validators.required]],
      nuevoEstado: ['']
    });
  }

  ngOnInit(): void {
    this.loadEstado(); // Cargar datos del estado al inicializar el componente
  }

  loadEstado(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.estadoCorrespondenciaService.getOneEstado(Number(id)).subscribe(
        response => {
          const estado = response.estado;
          this.form.patchValue({
            estado: estado.estado,
            nuevoEstado: ''
          });
        },
        error => {
          console.error('Error al cargar el estado:', error);
          this.errorMessage = 'No se pudo cargar el estado. Intente nuevamente más tarde.';
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: EstadoCorrespondenciaI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.estadoCorrespondenciaService.getOneEstado(Number(id)).subscribe(
        response => {
          const estadoActual = response.estado;

          // Verifica si el estado actual es el mismo que el nuevo estado
          if (estadoActual.estado === formValue.nuevoEstado) {
            this.errorMessage = 'El nuevo estado ingresado es el mismo que el actual.';
            return; // Detener la ejecución si los estados son iguales
          }

          // Procede a actualizar solo si el nuevo estado es diferente
          this.estadoCorrespondenciaService.updateEstado(Number(id), formValue).subscribe(
            () => {
              console.log('Estado de correspondencia actualizado correctamente:', formValue);
              this.router.navigateByUrl('estado-correspondencia');
            },
            err => {
              console.error(err);
              this.errorMessage = 'Error al actualizar el estado. Intente nuevamente más tarde.';
            }
          );
        },
        error => {
          console.error('Error al cargar el estado:', error);
          this.errorMessage = 'No se pudo cargar el estado. Intente nuevamente más tarde.';
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/estado-correspondencia'); // Redirigir a la lista de estados de correspondencia
  }
}
