import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipopagoService } from '../../../services/tipopagos/tipopago.service';
import { Router } from '@angular/router';
import { TipoPagoI } from '../../../models/pago';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-tipo-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-tipo-pago.component.html',
  styleUrls: ['./crear-tipo-pago.component.css']
})
export class CrearTipoPagoComponent implements OnInit {
  
  public form: FormGroup;
  tipopagoService = inject(TipopagoService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]] // Campo para el nombre del tipo de pago
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) { // Verificar que el formulario sea válido
      const formValue: TipoPagoI = this.form.value;
      this.tipopagoService.createTipo(formValue).subscribe(
        () => {
          this.router.navigateByUrl('tipo-pago'); // Redirigir a la lista de tipos de pago
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/tipo-pago'); // Redirigir al listado de tipos de pago
  }

  get nombre() { return this.form.get('nombre'); } // Getter para el control de formulario
}
