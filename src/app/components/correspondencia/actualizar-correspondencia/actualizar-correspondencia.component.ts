import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CorrespondenciaService } from '../../../services/correspondence/correspondence.service';
import { CorrespondenciaI } from '../../../models/Correspondence';

@Component({
  selector: 'app-actualizar-correspondencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './actualizar-correspondencia.component.html',
  styleUrls: ['./actualizar-correspondencia.component.css']
})
export class ActualizarCorrespondenciaComponent implements OnInit {
  public form: FormGroup;
  correspondenciaService = inject(CorrespondenciaService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  errorMessage: string = '';

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
      fechaEnvio: ['', [Validators.required]],
      fechaEntrega: ['', []], // Puede ser nulo
      descripcion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCorrespondencia(); // Cargar correspondencia al inicializar el componente
  }

  loadCorrespondencia(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (id) {
      this.correspondenciaService.getOneCorrespondencia(Number(id)).subscribe(
        response => {
          const correspondencia = response.correspondencia;
          this.form.patchValue({ // Cargar datos en el formulario
            remitenteId: correspondencia.remitenteId,
            destinatarioId: correspondencia.destinatarioId,
            empleadoId: correspondencia.empleadoId,
            tipoCorrespondenciaId: correspondencia.tipoCorrespondenciaId,
            estadoCorrespondenciaId: correspondencia.estadoCorrespondenciaId,
            sucursalOrigenId: correspondencia.sucursalOrigenId,
            sucursalDestinoId: correspondencia.sucursalDestinoId,
            transporteId: correspondencia.transporteId,
            fechaEnvio: correspondencia.fechaEnvio,
            fechaEntrega: correspondencia.fechaEntrega,
            descripcion: correspondencia.descripcion
          });
        },
        error => {
          console.error('Error al cargar la correspondencia:', error);
          this.errorMessage = 'No se pudo cargar la correspondencia. Intente nuevamente más tarde.';
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: CorrespondenciaI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.correspondenciaService.updateCorrespondencia(Number(id), formValue).subscribe(
        () => {
          console.log('Correspondencia actualizada correctamente:', formValue);
          this.router.navigateByUrl('correspondencia'); // Redirigir a la lista de correspondencias
        },
        err => {
          console.error(err);
          console.log('No se ha actualizado correctamente');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/correspondencia');
  }

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
