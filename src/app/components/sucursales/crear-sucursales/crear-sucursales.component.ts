import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalService } from '../../../services/sucursales/sucursales.service';
import { Router } from '@angular/router';
import { SucursalI } from '../../../models/sucursal'; // Importar la interfaz de sucursal
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-sucursales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-sucursales.component.html',
  styleUrls: ['./crear-sucursales.component.css']
})
export class CrearSucursalesComponent implements OnInit {

  public form: FormGroup; // Declaración de la propiedad form
  sucursalService = inject(SucursalService); // Inyección del servicio de sucursales
  router = inject(Router); // Inyección del router

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const formValue: SucursalI = this.form.value;
    console.log(formValue);
    this.sucursalService.createSucursal(formValue).subscribe(
      () => {
        console.log(formValue);
        this.router.navigateByUrl('sucursales'); // Redirigir a la lista de sucursales
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/sucursales'); // Redirigir a la lista de sucursales
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); }
  get ciudad() { return this.form.get('ciudad'); }
  get telefono() { return this.form.get('telefono'); }
}
