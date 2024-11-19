import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipopagoService } from '../../../services/payment-type/payment-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TipoPagoI } from '../../../models/Payment';

@Component({
  selector: 'app-actualizar-tipo-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './actualizar-tipo-pago.component.html',
  styleUrls: ['./actualizar-tipo-pago.component.css']
})
export class ActualizarTipoPagoComponent implements OnInit {

  public form: FormGroup; // Declaración de la propiedad form
  tipopagoService = inject(TipopagoService); // Inyección del servicio
  router = inject(Router); // Inyección del router
  activatedRoute = inject(ActivatedRoute); // Inyección de la ruta activa

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.loadTipoPago(); // Cargar datos del tipo de pago al inicializar el componente
  }

  loadTipoPago(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (id) {
      this.tipopagoService.getOneTipo(Number(id)).subscribe(
        response => {
          const tipoPago = response.tipoPago;
          this.form.patchValue({ // Cargar datos en el formulario
            nombre: tipoPago.nombre
          });
        },
        error => {
          console.error('Error al cargar el tipo de pago:', error);
          // Manejo de errores si es necesario
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: TipoPagoI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL

    if (id) {
      this.tipopagoService.updateTipo(Number(id), formValue).subscribe(
        () => {
          console.log('Tipo de pago actualizado correctamente:', formValue);
          this.router.navigateByUrl('/tipo-pago'); // Redirigir a la lista de tipos de pago
        },
        err => {
          console.error(err);
          console.log('No se ha actualizado correctamente');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/tipo-pago'); // Redirigir a la lista de tipos de pago
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get nombre() { return this.form.get('nombre'); }
}
