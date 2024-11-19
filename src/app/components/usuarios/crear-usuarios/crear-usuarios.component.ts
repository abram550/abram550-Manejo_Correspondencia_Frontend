import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/users/users.service';
import { Router } from '@angular/router';
import { UsuarioI, TipoUsuarioI } from '../../../models/User
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {
  
  public form: FormGroup;
  public tiposUsuario: TipoUsuarioI[] = []; // Para almacenar los tipos de usuario
  usuariosService = inject(UsuariosService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      tipoUsuarioId: ['', [Validators.required]] // Cambiado para usar tipoUsuarioId
    });
  }

  ngOnInit(): void {
    this.usuariosService.getAllTiposUsuario().subscribe(tipos => {
      this.tiposUsuario = tipos; // Cargar tipos de usuario al iniciar
    });
  }

  onSubmit(): void {
    if (this.form.valid) { // Verificar que el formulario sea válido
      const formValue: UsuarioI = this.form.value;
      this.usuariosService.createusuarios(formValue).subscribe(
        () => {
          this.router.navigateByUrl('usuarios');
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/usuarios');
  }

  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); }
  get correo() { return this.form.get('correo'); }
  get telefono() { return this.form.get('telefono'); }
  get tipoUsuarioId() { return this.form.get('tipoUsuarioId'); } // Añadido getter para tipoUsuarioId
}
