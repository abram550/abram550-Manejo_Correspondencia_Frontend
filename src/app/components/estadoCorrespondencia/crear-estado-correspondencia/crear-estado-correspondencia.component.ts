import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { EstadoCorrespondenciaService } from '../../../services/estado-correspondencia/estado-correspondencia.service';
import { EstadoCorrespondenciaI } from '../../../models/estadocorrespondencia';

@Component({
  selector: 'app-crear-estado-correspondencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-estado-correspondencia.component.html',
  styleUrls: ['./crear-estado-correspondencia.component.css']
})
export class CrearEstadoCorrespondenciaComponent implements OnInit {

  public form: FormGroup;
  estadoCorrespondenciaService = inject(EstadoCorrespondenciaService);
  router = inject(Router);

  estadosExistentes: EstadoCorrespondenciaI[] = [];
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      estado: ['', [Validators.required]],
      nuevoEstado: ['']
    });
  }

  ngOnInit(): void {
    this.fetchEstadosExistentes();
    this.onEstadoChange();
  }

  fetchEstadosExistentes(): void {
    this.estadoCorrespondenciaService.getAllEstados().subscribe(
      response => {
        this.estadosExistentes = response.estados;
      },
      error => {
        console.error('Error al cargar los estados existentes', error);
      }
    );
  }

  onEstadoChange(): void {
    this.form.get('estado')?.valueChanges.subscribe(value => {
      const nuevoEstadoControl = this.form.get('nuevoEstado');
      const estadoExistente = this.estadosExistentes.find(estado => estado.estado.toLowerCase() === value.toLowerCase());

      if (estadoExistente) {
        nuevoEstadoControl?.setValue('');
        nuevoEstadoControl?.setValidators([Validators.required]);
        nuevoEstadoControl?.updateValueAndValidity();
        this.errorMessage = 'Este estado de correspondencia ya existe. Por favor, ingrese un nuevo estado.';
      } else {
        nuevoEstadoControl?.clearValidators();
        nuevoEstadoControl?.updateValueAndValidity();
        this.errorMessage = '';
      }
    });
  }

  onSubmit(): void {
    const formValue: EstadoCorrespondenciaI = this.form.value;

    const estadoExistente = this.estadosExistentes.find(estado => estado.estado.toLowerCase() === formValue.estado.toLowerCase());

    if (estadoExistente) {
      if (!formValue.nuevoEstado) {
        this.errorMessage = 'El estado de correspondencia ya existe. Ingrese un nuevo estado.';
        return;
      }
      formValue.estado = formValue.nuevoEstado;
    }

    this.estadoCorrespondenciaService.createEstado(formValue).subscribe(
      () => {
        console.log('Estado creado correctamente:', formValue);
        this.router.navigateByUrl('estado-correspondencia');
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/estado-correspondencia');
  }

  get estado() { return this.form.get('estado'); }
}
