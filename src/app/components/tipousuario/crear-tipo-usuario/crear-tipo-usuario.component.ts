import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipousuarioService } from '../../../services/tipousuarios/tipousuario.service';
import { Router } from '@angular/router';
import { TipoUsuarioI } from '../../../models/usuario';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-tipo-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-tipo-usuario.component.html',
  styleUrls: ['./crear-tipo-usuario.component.css']
})
export class CrearTipoUsuarioComponent implements OnInit {

  public form: FormGroup;
  tipoUsuarioService = inject(TipousuarioService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]]  // Cambiado de 'puesto' a 'descripcion'
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {  // Verificar que el formulario sea válido
      const formValue: TipoUsuarioI = this.form.value;
      this.tipoUsuarioService.createTipo(formValue).subscribe(
        () => {
          this.router.navigateByUrl('tipo-usuario');
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/tipo-usuario');
  }

  get descripcion() { return this.form.get('descripcion'); }
}
