import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipovehiculoService } from '../../../services/vehicle-type/vehicle-type.service';
import { Router } from '@angular/router';
import { TipoVehiculoI } from '../../../models/Transport';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-tipo-vehiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-tipo-vehiculo.component.html',
  styleUrls: ['./crear-tipo-vehiculo.component.css']
})
export class CrearTipoVehiculoComponent implements OnInit {
  
  public form: FormGroup;
  tipovehiculoService = inject(TipovehiculoService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]] // Campo para la descripción del tipo de vehículo
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) { // Verificar que el formulario sea válido
      const formValue: TipoVehiculoI = this.form.value;
      this.tipovehiculoService.createTipo(formValue).subscribe(
        () => {
          this.router.navigateByUrl('tipo-vehiculo'); // Redirigir a la lista de tipos de vehículos
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/tipo-vehiculo'); // Cancelar y redirigir a la lista de tipos de vehículos
  }

  get descripcion() { return this.form.get('descripcion'); } // Getter para el control de descripción
}
