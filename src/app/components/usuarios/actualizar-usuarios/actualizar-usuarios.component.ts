import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioI, TipoUsuarioI } from '../../../models/User
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-actualizar-usuarios',
  standalone: true,
  imports: [CommonModule,DropdownModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './actualizar-usuarios.component.html',
  styleUrls: ['./actualizar-usuarios.component.css']
})
export class ActualizarUsuariosComponent implements OnInit {
  
  public id: number = 0;
  public form!: FormGroup;
  public tiposUsuario: TipoUsuarioI[] = []; // Para almacenar los tipos de usuario
  public usuario!: UsuarioI | null; // Puede ser null hasta que se cargue

  usuariosService = inject(UsuariosService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
    this.loadTiposUsuario();
  }

  loadUser(): void {
    this.usuariosService.getOneusuarios(this.id).subscribe(usuario => {
      this.usuario = usuario.usuario; // Se asegura que tenga la información completa del usuario
      this.initializeForm(); // Inicializa el formulario después de cargar el usuario
    });
}


  loadTiposUsuario(): void {
    this.usuariosService.getAllTiposUsuario().subscribe(tipos => {
      this.tiposUsuario = tipos; // Cargar tipos de usuario al iniciar
    });
  }

  initializeForm(): void {
    if (this.usuario) { // Verificar que el usuario no sea null
      this.form = this.formBuilder.group({
        nombre: [this.usuario.nombre, [Validators.required]],
        direccion: [this.usuario.direccion, [Validators.required]],
        correo: [this.usuario.correo, [Validators.required, Validators.email]],
        telefono: [this.usuario.telefono, [Validators.required]],
        tipoUsuarioId: [this.usuario.tipoUsuario.id, [Validators.required]] // Cambiado a id del tipo de usuario
      });
    } else {
      this.form = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required]],
        tipoUsuarioId: ['', [Validators.required]] // Cambiado a id del tipo de usuario
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) { // Verificar que el formulario sea válido
      const formValue: UsuarioI = {
        ...this.form.value,
        tipoUsuario: { id: this.form.value.tipoUsuarioId } as TipoUsuarioI // Añadir tipoUsuario completo para el envío
      };
      this.usuariosService.updateusuarios(this.id, formValue).subscribe(
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
}
