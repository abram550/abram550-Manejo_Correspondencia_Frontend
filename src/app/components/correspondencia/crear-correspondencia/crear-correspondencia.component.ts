import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrespondenciaService } from '../../../services/correspondence/correspondence.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card'; // Asegúrate de importar CardModule
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crear-correspondencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule,CardModule,ButtonModule],
  templateUrl: './crear-correspondencia.component.html',
  styleUrls: ['./crear-correspondencia.component.css']
})
export class CrearCorrespondenciaComponent implements OnInit {
  
  public form: FormGroup; // Declaración de la propiedad form
  correspondenciaService = inject(CorrespondenciaService); // Inyección del servicio
  router = inject(Router); // Inyección del router

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
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

  ngOnInit(): void { }

  onSubmit(): void {
    const formValue = this.form.value; // Obteniendo el valor del formulario
    console.log(formValue);
    this.correspondenciaService.createCorrespondencia(formValue).subscribe(
      () => {
        console.log(formValue);
        this.router.navigateByUrl('correspondencia'); // Redirigir a la lista de correspondencia
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/correspondencia'); // Redirigir a la lista de correspondencia
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
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
