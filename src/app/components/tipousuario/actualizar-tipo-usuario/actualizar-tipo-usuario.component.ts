import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipousuarioService } from '../../../services/user-type/user-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TipoUsuarioI } from '../../../models/User

@Component({
  selector: 'app-actualizar-tipo-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './actualizar-tipo-usuario.component.html',
  styleUrls: ['./actualizar-tipo-usuario.component.css']
})
export class ActualizarTipoUsuarioComponent implements OnInit {

  public form: FormGroup; // Declaración del formulario
  tipousuarioService = inject(TipousuarioService); // Inyección del servicio
  router = inject(Router); // Inyección del router
  activatedRoute = inject(ActivatedRoute); // Inyección de la ruta activa

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.loadTipoUsuario(); // Cargar datos del tipo de usuario al inicializar el componente
  }

  loadTipoUsuario(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (id) {
      this.tipousuarioService.getOneTipo(Number(id)).subscribe(
        response => {
          const tipoUsuario = response.tipoUsuario;
          this.form.patchValue({ // Cargar datos en el formulario
            descripcion: tipoUsuario.descripcion
          });
        },
        error => {
          console.error('Error al cargar el tipo de usuario:', error);
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: TipoUsuarioI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL

    if (id) {
      this.tipousuarioService.updateTipo(Number(id), formValue).subscribe(
        () => {
          console.log('Tipo de usuario actualizado correctamente:', formValue);
          this.router.navigateByUrl('/tipo-usuario'); // Redirigir a la lista de tipos de usuario
        },
        err => {
          console.error(err);
          console.log('No se ha actualizado correctamente');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/tipo-usuario'); // Redirigir a la lista de tipos de usuario
  }

  // Obtener el campo de descripción para las validaciones
  get descripcion() { return this.form.get('descripcion'); }
}
