import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CorrespondenceStateService } from '../../../services/correspondence-state/correspondence-state.service';
import { CorrespondenceStateI } from '../../../models/CorrespondenceState';
import { DropdownModule } from 'primeng/dropdown';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-update-correspondence-state',
  standalone: true,
  imports: [DropdownModule, CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './update-correspondence-status.component.html',
  styleUrls: ['./update-correspondence-status.component.css']
})
export class UpdateCorrespondenceStateComponent implements OnInit {

  public form: FormGroup;
  correspondenceStateService = inject(CorrespondenceStateService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  errorMessage: string = '';
  currentState: CorrespondenceStateI | null = null; // Para almacenar el estado actual

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      state: ['', [Validators.required]], // Nombre del estado
      status: [true, [Validators.required]] // Estado activo/inactivo
    });
  }

  ngOnInit(): void {
    this.loadState(); // Cargar datos al inicializar
  }

  /**
   * Carga el estado actual usando el ID de la URL.
   */
  loadState(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.correspondenceStateService.getOneCorrespondenceState(Number(id))
        .pipe(
          map((response: { state: CorrespondenceStateI }) => response.state) // Extraemos el objeto 'state'
        )
        .subscribe(
          (state: CorrespondenceStateI) => {
            this.currentState = state;
            this.form.patchValue({
              state: state.state,
              status: state.status
            });
          },
          error => {
            console.error('Error al cargar el estado:', error);
            this.errorMessage = 'No se pudo cargar el estado. Inténtalo nuevamente.';
          }
        );
    }
  }

  /**
   * Maneja la actualización del estado.
   */
  onSubmit(): void {
    if (!this.currentState) {
      this.errorMessage = 'El estado actual no está cargado. Inténtalo nuevamente.';
      return;
    }

    const updatedState: CorrespondenceStateI = {
      ...this.currentState,
      state: this.form.value.state,
      status: this.form.value.status
    };

    if (
      updatedState.state === this.currentState.state &&
      updatedState.status === this.currentState.status
    ) {
      this.errorMessage = 'No se detectaron cambios en los datos.';
      return;
    }

    this.correspondenceStateService.updateCorrespondenceState(updatedState.id, updatedState).subscribe(
      () => {
        console.log('Estado actualizado correctamente:', updatedState);
        this.router.navigateByUrl('correspondence-state');
      },
      err => {
        console.error('Error al actualizar el estado:', err);
        this.errorMessage = 'No se pudo actualizar el estado. Inténtalo nuevamente.';
      }
    );
  }

  /**
   * Cancela la operación y vuelve al listado.
   */
  cancel(): void {
    this.router.navigateByUrl('/correspondence-state');
  }
}
