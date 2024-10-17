import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoCorrespondenciaI } from '../../../models/tipocorrespondencia';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TipoCorrespondenciaService } from '../../../services/tipo-correspondencia/tipo-correspondencia.service';

@Component({
  selector: 'app-actualizar-tipo-correspondencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './actualizar-tipo-correspondencia.component.html',
  styleUrls: ['./actualizar-tipo-correspondencia.component.css']
})
export class ActualizarTipoCorrespondenciaComponent implements OnInit { 

  public form: FormGroup;
  tipoCorrespondenciaService = inject(TipoCorrespondenciaService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  tiposExistentes: TipoCorrespondenciaI[] = [];
  errorMessage: string = '';
  id: number = 0; // ID de tipo de correspondencia

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      tipo: ['', [Validators.required]],
      nuevoTipo: ['']
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la URL y cargar el tipo de correspondencia
    this.id = this.route.snapshot.params['id'];
    this.getTipoCorrespondencia(this.id);
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

  // Obtener los datos del tipo de correspondencia y cargarlos en el formulario
  getTipoCorrespondencia(id: number) {
    this.tipoCorrespondenciaService.getOneTipo(id).subscribe(
      response => {
        const tipo = response.tipo; // Se obtiene el tipo de correspondencia
        this.form.patchValue({
          tipo: tipo.tipo,
          nuevoTipo: '' // Limpiar el campo nuevo tipo por defecto
        });
      },
      error => {
        console.error('Error al cargar el tipo de correspondencia', error);
      }
    );
  }

  onTipoChange(): void {
    this.form.get('tipo')?.valueChanges.subscribe(value => {
      const nuevoTipoControl = this.form.get('nuevoTipo');

      const tipoExistente = this.tiposExistentes.find(tipo => tipo.tipo.toLowerCase() === value.toLowerCase());
      if (tipoExistente) {
        nuevoTipoControl?.setValue(''); 
        nuevoTipoControl?.clearValidators(); 
        this.errorMessage = 'Este tipo de correspondencia ya existe. Por favor, ingrese un nuevo tipo.';
      } else {
        nuevoTipoControl?.setValidators([Validators.required]); 
        nuevoTipoControl?.updateValueAndValidity();
        this.errorMessage = ''; 
      }
    });
  }

  onSubmit(): void {
    const formValue: TipoCorrespondenciaI = this.form.value;

    // Comprobar si se ha seleccionado un nuevo tipo
    const tipoExistente = this.tiposExistentes.find(tipo => tipo.tipo.toLowerCase() === formValue.tipo.toLowerCase());

    if (tipoExistente && !formValue.nuevoTipo) {
      this.errorMessage = 'El tipo de correspondencia ya existe. Ingrese un nuevo tipo.';
      return;
    }

    // Si se seleccionó un nuevo tipo, se asigna al campo tipo
    if (formValue.nuevoTipo) {
      formValue.tipo = formValue.nuevoTipo;
    }

    this.tipoCorrespondenciaService.updateTipo(this.id, formValue).subscribe(
      () => {
        this.router.navigateByUrl('tipo-correspondencia'); 
      },
      err => {
        console.log('Error al actualizar el tipo de correspondencia', err);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/tipo-correspondencia'); 
  }

  get tipo() { return this.form.get('tipo'); }
  get nuevoTipo() { return this.form.get('nuevoTipo'); }
}
