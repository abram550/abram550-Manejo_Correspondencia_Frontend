import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoService } from '../../../services/payments/payments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { PagoI } from '../../../models/Payment';

@Component({
  selector: 'app-actualizar-pagos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './actualizar-pagos.component.html',
  styleUrls: ['./actualizar-pagos.component.css']
})
export class ActualizarPagosComponent implements OnInit {
  
  public form: FormGroup; // Declaración de la propiedad form
  pagoService = inject(PagoService); // Inyección del servicio
  router = inject(Router); // Inyección del router
  activatedRoute = inject(ActivatedRoute); // Inyección de la ruta activa

  // Arreglo de métodos de pago
  metodosPago: { label: string, value: string }[] = [
    { label: 'Efectivo', value: 'efectivo' },
    { label: 'Tarjeta de Crédito', value: 'tarjeta credito' },
    { label: 'Transferencia', value: 'transferencia' }
  ];

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      correspondenciaId: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(0)]],
      metodoPago: ['', [Validators.required]],
      fechaPago: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadPago(); // Cargar datos del pago al inicializar el componente
  }

  loadPago(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (id) {
      this.pagoService.getOnePago(Number(id)).subscribe(
        response => {
          const pago = response.pago;
          this.form.patchValue({ // Cargar datos en el formulario
            correspondenciaId: pago.correspondenciaId,
            monto: pago.monto,
            fechaPago: pago.fechaPago
          });
        },
        error => {
          console.error('Error al cargar el pago:', error);
          // Manejo de errores si es necesario
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: PagoI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL

    if (id) {
      this.pagoService.updatePago(Number(id), formValue).subscribe(
        () => {
          console.log('Pago actualizado correctamente:', formValue);
          this.router.navigateByUrl('pagos'); // Redirigir a la lista de pagos
        },
        err => {
          console.error(err);
          console.log('No se ha actualizado correctamente');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/pagos'); // Redirigir a la lista de pagos
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get correspondenciaId() { return this.form.get('correspondenciaId'); }
  get monto() { return this.form.get('monto'); }
  get metodoPago() { return this.form.get('metodoPago'); }
  get fechaPago() { return this.form.get('fechaPago'); }
}
