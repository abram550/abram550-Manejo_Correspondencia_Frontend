import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosCorrespondenciaService } from '../../../services/events-correspondence/events-correspondence.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventosCorrespondenciaI } from '../../../models/CorrespondenceEvents';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-actualizar-eventos-correspondencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './actualizar-eventos-correspondencia.component.html',
  styleUrls: ['./actualizar-eventos-correspondencia.component.css']
})
export class ActualizarEventosCorrespondenciaComponent implements OnInit {
  public form: FormGroup; // Declaración de la propiedad form
  eventosService = inject(EventosCorrespondenciaService); // Inyección del servicio
  router = inject(Router); // Inyección del router
  activatedRoute = inject(ActivatedRoute); // Inyección de la ruta activa

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      correspondenciaId: ['', [Validators.required]],
      sucursalId: ['', [Validators.required, Validators.min(0)]], // Validación para que no sea negativo
      empleadoId: ['', [Validators.required, Validators.min(0)]], // Validación para que no sea negativo
      estadoCorrespondenciaId: ['', [Validators.required, Validators.min(0)]], // Validación para que no sea negativo
      fechaEvento: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadEvento(); // Cargar datos del evento al inicializar el componente
  }

  loadEvento(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (id) {
      this.eventosService.getOneEvento(Number(id)).subscribe(
        response => {
          const evento = response.evento;
          this.form.patchValue({ // Cargar datos en el formulario
            correspondenciaId: evento.correspondenciaId,
            sucursalId: evento.sucursalId,
            empleadoId: evento.empleadoId,
            estadoCorrespondenciaId: evento.estadoCorrespondenciaId,
            fechaEvento: evento.fechaEvento,
            descripcion: evento.descripcion
          });
        },
        error => {
          console.error('Error al cargar el evento:', error);
          // Manejo de errores si es necesario
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: EventosCorrespondenciaI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL

    if (id) {
      this.eventosService.updateEvento(Number(id), formValue).subscribe(
        () => {
          console.log('Evento actualizado correctamente:', formValue);
          this.router.navigateByUrl('eventos-correspondencia'); // Redirigir a la lista de eventos
        },
        err => {
          console.error(err);
          console.log('No se ha actualizado correctamente');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/eventos-correspondencia'); // Redirigir a la lista de eventos
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get correspondenciaId() { return this.form.get('correspondenciaId'); }
  get sucursalId() { return this.form.get('sucursalId'); }
  get empleadoId() { return this.form.get('empleadoId'); }
  get estadoCorrespondenciaId() { return this.form.get('estadoCorrespondenciaId'); }
  get fechaEvento() { return this.form.get('fechaEvento'); }
  get descripcion() { return this.form.get('descripcion'); }
}
