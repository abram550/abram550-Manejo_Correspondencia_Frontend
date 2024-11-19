import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoService } from '../../../services/payments/payments.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { PagoI, TipoPagoI } from '../../../models/Payment';

@Component({
  selector: 'app-crear-pagos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './crear-pagos.component.html',
  styleUrls: ['./crear-pagos.component.css']
})
export class CrearPagosComponent implements OnInit {

  public form: FormGroup; // Declaración de la propiedad form
  public tiposPago: TipoPagoI[] = []; // Lista para almacenar los tipos de pago disponibles
  pagoService = inject(PagoService); // Inyección del servicio
  router = inject(Router); // Inyección del router

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      correspondenciaId: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(0)]],
      tipoPagoId: ['', [Validators.required]], // Cambiado para que use el ID del tipo de pago
      fechaPago: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadTiposPago(); // Cargar los tipos de pago al inicializar el componente
  }

  loadTiposPago(): void {
    this.pagoService.getAllTiposPago().subscribe(
      (tipos: TipoPagoI[]) => {
        this.tiposPago = tipos;
      },
      err => {
        console.log('Error al cargar los tipos de pago:', err);
      }
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido:', this.form.errors);
      return; // No continuar si el formulario es inválido
    }
  
    const formValue = this.form.value; // Guardar los valores del formulario
    const selectedTipoPago = this.tiposPago.find(tipo => tipo.id === formValue.metodoPago); // Asegúrate de que el nombre de campo sea correcto
  
    // Verifica si se encontró un tipo de pago
    if (!selectedTipoPago) {
      console.error('Tipo de pago no encontrado');
      return; // Detener la ejecución si no se encuentra el tipo de pago
    }
  
    const pagoData = {
      pago: {
        correspondenciaId: formValue.correspondenciaId,
        monto: formValue.monto.toString(), // Convertir a string
        tipoPagoId: formValue.metodoPago.toString(), // Asegúrate de que sea un string
        fechaPago: new Date(formValue.fechaPago).toISOString(), // Asegúrate de que esté en el formato correcto
        tipopago: selectedTipoPago // Añadir el objeto tipopago
      }
    };
  
    console.log('Datos a enviar:', pagoData); // Log para verificar los datos
  
    this.pagoService.createPago(pagoData).subscribe(
      response => {
        console.log('Respuesta del servidor:', response); // Log para verificar la respuesta
        this.router.navigateByUrl('pagos'); // Redirigir a la lista de pagos
      },
      err => {
        console.log('Error al crear el pago:', err); // Log para errores
        console.log('No se ha creado correctamente');
      }
    );
  }
  
  

  cancel() {
    this.router.navigateByUrl('/pagos'); // Redirigir a la lista de pagos
  }

  // Getters para los controles del formulario
  get correspondenciaId() { return this.form.get('correspondenciaId'); }
  get monto() { return this.form.get('monto'); }
  get tipoPagoId() { return this.form.get('tipoPagoId'); }
  get fechaPago() { return this.form.get('fechaPago'); }
}
