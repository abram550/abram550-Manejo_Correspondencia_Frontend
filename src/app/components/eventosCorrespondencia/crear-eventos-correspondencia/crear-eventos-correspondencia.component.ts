import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosCorrespondenciaService } from '../../../services/events-correspondence/events-correspondence.service';
import { Router } from '@angular/router';
import { EventosCorrespondenciaI } from '../../../models/CorrespondenceEvents';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-crear-eventos-correspondencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './crear-eventos-correspondencia.component.html',
  styleUrls: ['./crear-eventos-correspondencia.component.css']
})
export class CrearEventosCorrespondenciaComponent implements OnInit {
  
  public form: FormGroup; // Declaración de la propiedad form
  eventosService = inject(EventosCorrespondenciaService); // Inyección del servicio
  router = inject(Router); // Inyección del router

  // Aquí puedes agregar arreglos para sucursales, empleados, y estados de correspondencia si es necesario.

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      correspondenciaId: ['', [Validators.required]],
      sucursalId: ['', [Validators.required]],
      empleadoId: ['', [Validators.required]],
      estadoCorrespondenciaId: ['', [Validators.required]],
      fechaEvento: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const formValue: EventosCorrespondenciaI = this.form.value;
    console.log(formValue);
    this.eventosService.createEvento(formValue).subscribe(
      () => {
        console.log(formValue);
        this.router.navigateByUrl('eventos-correspondencia'); // Redirigir a la lista de eventos
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
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
