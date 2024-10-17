import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransporteService } from '../../../services/transporte/transporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TransporteI, TipoVehiculoI } from '../../../models/transporte';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-actualizar-transporte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './actualizar-transporte.component.html',
  styleUrls: ['./actualizar-transporte.component.css']
})
export class ActualizarTransporteComponent implements OnInit {
  
  public form: FormGroup; // Declaración de la propiedad form
  public tiposVehiculo: TipoVehiculoI[] = []; // Nueva propiedad para almacenar los tipos de vehículos
  transporteService = inject(TransporteService); // Inyección del servicio
  router = inject(Router); // Inyección del router
  activatedRoute = inject(ActivatedRoute); // Inyección de ActivatedRoute

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      id: [''], // Agregar ID
      tipoVehiculoId: ['', [Validators.required]], // Cambiar a tipoVehiculoId
      placa: ['', [Validators.required]],
      capacidadKg: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadTransporte(); // Cargar transporte al inicializar el componente
    this.loadTiposVehiculo(); // Cargar tipos de vehículo
  }

  loadTransporte(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (id) {
      this.transporteService.getOneTransporte(Number(id)).subscribe(
        response => {
          const transporte = response.transporte; // Obtenemos el transporte
          this.form.patchValue({ // Cargar datos en el formulario
            id: transporte.id, // Asignar ID
            tipoVehiculoId: transporte.tipoVehiculoId, // Asignar ID del tipo de vehículo
            placa: transporte.placa,
            capacidadKg: transporte.capacidadKg
          });
        },
        error => {
          console.error('Error al cargar el transporte:', error);
        }
      );
    }
  }

  loadTiposVehiculo(): void {
    this.transporteService.getAllTiposVehiculo().subscribe(
      tipos => {
        this.tiposVehiculo = tipos; // Cargar tipos de vehículos
      },
      error => {
        console.error('Error al cargar tipos de vehículos:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) { // Verificar que el formulario sea válido
      const formValue: TransporteI = {
        ...this.form.value,
        tipovehiculo: { id: this.form.value.tipoVehiculoId } // Añadir tipoVehiculo completo para el envío
      };
      const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
      if (id) {
        this.transporteService.updateTransporte(Number(id), formValue).subscribe(
          () => {
            console.log('Transporte actualizado correctamente:', formValue);
            this.router.navigateByUrl('transporte'); // Redirigir a la lista de transportes
          },
          err => {
            console.error('No se ha actualizado correctamente', err);
          }
        );
      }
    }
  }

  cancel() {
    this.router.navigateByUrl('/transporte'); // Redirigir a la lista de transportes
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get tipoVehiculoId() { return this.form.get('tipoVehiculoId'); }
  get placa() { return this.form.get('placa'); }
  get capacidadKg() { return this.form.get('capacidadKg'); }
}
