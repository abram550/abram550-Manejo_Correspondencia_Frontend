import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoCorrespondenciaI } from '../../../models/CorrespondenceType';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TipoCorrespondenciaService } from '../../../services/correspondence-type/correspondence-type.service';

@Component({
  selector: 'app-crear-tipo-correspondencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-tipo-correspondencia.component.html',
  styleUrls: ['./crear-tipo-correspondencia.component.css']
})
export class CrearTipoCorrespondenciaComponent implements OnInit {
  
  public form: FormGroup; 
  tipoCorrespondenciaService = inject(TipoCorrespondenciaService); 
  router = inject(Router); 

  tiposExistentes: TipoCorrespondenciaI[] = [];
  errorMessage: string = ''; // Mensaje de error

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      tipo: ['', [Validators.required]],
      nuevoTipo: [''] // Campo para nuevo tipo
    });
  }

  ngOnInit(): void {
    this.fetchTiposExistentes();
    this.onTipoChange(); 
  }

  fetchTiposExistentes(): void {
    this.tipoCorrespondenciaService.getAllTipos().subscribe(
      response => {
        this.tiposExistentes = response.tipos;
      },
      error => {
        console.error('Error al cargar los tipos existentes', error);
      }
    );
  }

  onTipoChange(): void {
    this.form.get('tipo')?.valueChanges.subscribe(value => {
      const nuevoTipoControl = this.form.get('nuevoTipo');

      // Verificación de tipo existente
      const tipoExistente = this.tiposExistentes.find(tipo => tipo.tipo.toLowerCase() === value.toLowerCase());
      if (tipoExistente) {
        nuevoTipoControl?.setValue(''); // Limpia nuevoTipo
        nuevoTipoControl?.setValidators([Validators.required]); // Requiere que se complete nuevoTipo
        nuevoTipoControl?.updateValueAndValidity();

        // Muestra mensaje de error
        this.errorMessage = 'Este tipo de correspondencia ya existe. Por favor, ingrese un nuevo tipo.';
      } else {
        nuevoTipoControl?.clearValidators(); // Elimina la validación si no hay tipo existente
        nuevoTipoControl?.updateValueAndValidity();
        this.errorMessage = ''; // Limpia el mensaje de error
      }
    });
  }

  onSubmit(): void {
    const formValue: TipoCorrespondenciaI = this.form.value;

    // Verificar si el tipo ya existe
    const tipoExistente = this.tiposExistentes.find(tipo => tipo.tipo.toLowerCase() === formValue.tipo.toLowerCase());

    if (tipoExistente) {
      // Si existe, guardar nuevoTipo
      if (!formValue.nuevoTipo) {
        this.errorMessage = 'El tipo de correspondencia ya existe. Ingrese un nuevo tipo.';
        return;
      }

      // Crear un nuevo tipo basado en nuevoTipo
      formValue.tipo = formValue.nuevoTipo; // Cambiar tipo a nuevoTipo
    }

    // Lógica para guardar el nuevo tipo
    this.tipoCorrespondenciaService.createTipo(formValue).subscribe(
      () => {
        console.log('Tipo creado correctamente:', formValue);
        this.router.navigateByUrl('tipo-correspondencia'); 
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/tipo-correspondencia'); 
  }

  get tipo() { return this.form.get('tipo'); }
}
