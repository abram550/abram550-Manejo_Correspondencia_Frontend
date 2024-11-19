import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoEmpleadoService } from '../../../services/employee-type/employee-type.service';
import { Router } from '@angular/router';
import { TipoEmpleadoI } from '../../../models/Employee';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-tipo-empleado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-tipo-empleado.component.html',
  styleUrls: ['./crear-tipo-empleado.component.css']
})
export class CrearTipoEmpleadoComponent implements OnInit {
  
  public form: FormGroup;
  tipoEmpleadoService = inject(TipoEmpleadoService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      puesto: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) { // Verificar que el formulario sea válido
      const formValue: TipoEmpleadoI = this.form.value;
      this.tipoEmpleadoService.createTipo(formValue).subscribe(
        () => {
          this.router.navigateByUrl('tipo-empleado');
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/tipo-empleado');
  }

  get puesto() { return this.form.get('puesto'); }
}
