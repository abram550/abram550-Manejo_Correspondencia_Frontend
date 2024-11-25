import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserI } from '../../../models/User';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css'],
})
export class UpdateUsersComponent implements OnInit {
  // ID del usuario a editar
  public id: number = 0;

  // Formulario reactivo
  public form!: FormGroup;

  // Usuario cargado
  public user!: UserI | null;

  // Inyección de servicios
  usersService = inject(UsersService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(private formBuilder: FormBuilder) {}

  /**
   * Hook de inicialización del componente.
   */
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')); // Obtener ID del usuario
    this.loadUser(); // Cargar datos del usuario
  }

  /**
   * Carga los datos del usuario y inicializa el formulario.
   */
  loadUser(): void {
    this.usersService.getOneUser(this.id).subscribe((response) => {
      this.user = response.user; // Asignar datos del usuario
      this.initializeForm(); // Inicializar formulario
    });
  }

  /**
   * Inicializa el formulario reactivo con las validaciones.
   */
  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [this.user?.name || '', [Validators.required]],
      address: [this.user?.address || '', [Validators.required]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phone || '', [Validators.required]],
      status: [this.user?.status ?? true], // Estado por defecto activo
      password: [this.user?.password || '', [Validators.required, Validators.minLength(6)]] // Cargar la contraseña
    });
  }
  
  

  /**
   * Envía el formulario y actualiza los datos del usuario.
   */
  onSubmit(): void {
    if (this.form.valid) {
      const formValue: Partial<UserI> = { ...this.form.value };
  
      // Solo actualizar la contraseña si es proporcionada
      if (!formValue.password) {
        delete formValue.password; // Eliminar la contraseña si está vacía
      }
  
      this.usersService.updateUser(this.id, formValue).subscribe(
        () => {
          this.router.navigateByUrl('/users'); // Navegar a la lista de usuarios
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
  
  

  /**
   * Cancela la operación de actualización y vuelve a la lista de usuarios.
   */
  cancel(): void {
    this.router.navigateByUrl('/users');
  }
}
