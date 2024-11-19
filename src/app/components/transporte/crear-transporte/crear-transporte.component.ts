import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransporteService } from '../../../services/transport/transport.service';
import { Router } from '@angular/router';
import { TransporteI, TipoVehiculoI } from '../../../models/Transport';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-crear-transporte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './crear-transporte.component.html',
  styleUrls: ['./crear-transporte.component.css']
})
export class CrearTransporteComponent implements OnInit {

  public form: FormGroup; // Declaración de la propiedad form
  public tiposVehiculo: TipoVehiculoI[] = []; // Para almacenar los tipos de vehículo
  transporteService = inject(TransporteService); // Inyección del servicio
  router = inject(Router); // Inyección del router

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      placa: ['', [Validators.required]], // Asumí que 'placa' es requerido
      capacidadKg: ['', [Validators.required, Validators.min(0)]], // Validación para capacidad
      tipoVehiculoId: ['', [Validators.required]], // Id del tipo de vehículo
    });
  }

  ngOnInit(): void {
    // Cargar los tipos de vehículos al inicializar
    this.transporteService.getAllTiposVehiculo().subscribe(tipos => {
      this.tiposVehiculo = tipos; // Cargar tipos de vehículo
    });
  }

  onSubmit(): void {
    if (this.form.valid) { // Verificar que el formulario sea válido
      const formValue: TransporteI = this.form.value;
      this.transporteService.createTransporte(formValue).subscribe(
        () => {
          this.router.navigateByUrl('transporte'); // Redirigir a la lista de transportes
        },
        err => {
          console.error(err);
          console.log('No se ha creado correctamente');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/transportes'); // Redirigir a la lista de transportes
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get placa() { return this.form.get('placa'); }
  get capacidadKg() { return this.form.get('capacidadKg'); }
  get tipoVehiculoId() { return this.form.get('tipoVehiculoId'); } // Añadido getter para tipoVehiculoId
}
