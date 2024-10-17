import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipovehiculoService } from '../../../services/tipovehiculos/tipovehiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TipoVehiculoI } from '../../../models/transporte';

@Component({
  selector: 'app-actualizar-tipo-vehiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './actualizar-tipo-vehiculo.component.html',
  styleUrls: ['./actualizar-tipo-vehiculo.component.css']
})
export class ActualizarTipoVehiculoComponent implements OnInit {

  public form: FormGroup; // Declaración de la propiedad form
  tipovehiculoService = inject(TipovehiculoService); // Inyección del servicio
  router = inject(Router); // Inyección del router
  activatedRoute = inject(ActivatedRoute); // Inyección de la ruta activa

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.loadTipoVehiculo(); // Cargar datos del tipo de vehículo al inicializar el componente
  }

  loadTipoVehiculo(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (id) {
      this.tipovehiculoService.getOneTipo(Number(id)).subscribe(
        response => {
          const tipoVehiculo = response.tipoVehiculo;
          this.form.patchValue({ // Cargar datos en el formulario
            descripcion: tipoVehiculo.descripcion
          });
        },
        error => {
          console.error('Error al cargar el tipo de vehículo:', error);
          // Manejo de errores si es necesario
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: TipoVehiculoI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL

    if (id) {
      this.tipovehiculoService.updateTipo(Number(id), formValue).subscribe(
        () => {
          console.log('Tipo de vehículo actualizado correctamente:', formValue);
          this.router.navigateByUrl('/tipo-vehiculo'); // Redirigir a la lista de tipos de vehículos
        },
        err => {
          console.error(err);
          console.log('No se ha actualizado correctamente');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/tipo-vehiculo'); // Redirigir a la lista de tipos de vehículos
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get descripcion() { return this.form.get('descripcion'); }
}
