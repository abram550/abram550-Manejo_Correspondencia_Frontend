import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaService } from '../../../services/rutas/rutas.service';
import { Router } from '@angular/router';
import { RutaI } from '../../../models/ruta'; // Asegúrate de importar ambos modelos
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { SucursalI } from '../../../models/sucursal';

@Component({
  selector: 'app-crear-rutas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './crear-rutas.component.html',
  styleUrls: ['./crear-rutas.component.css']
})
export class CrearRutasComponent implements OnInit {
  public form: FormGroup; // Declaración de la propiedad form
  public sucursales: SucursalI[] = []; // Para almacenar las sucursales
  rutaService = inject(RutaService); // Inyección del servicio
  router = inject(Router); // Inyección del router

  constructor(private formBuilder: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      sucursalOrigenId: ['', [Validators.required]],
      sucursalDestinoId: ['', [Validators.required]],
      distanciaKm: ['', [Validators.required, Validators.min(1)]],
      tiempoEstimadoHoras: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.rutaService.getAllSucursales().subscribe(sucursales => {
      this.sucursales = sucursales; // Cargar sucursales al iniciar
    });
  }

  onSubmit(): void {
    const formValue: RutaI = this.form.value;
    console.log(formValue);
    this.rutaService.createRuta(formValue).subscribe(
      () => {
        console.log(formValue);
        this.router.navigateByUrl('rutas'); // Redirigir a la lista de rutas
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/rutas'); // Redirigir a la lista de rutas
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get sucursalOrigenId() { return this.form.get('sucursalOrigenId'); }
  get sucursalDestinoId() { return this.form.get('sucursalDestinoId'); }
  get distanciaKm() { return this.form.get('distanciaKm'); }
  get tiempoEstimadoHoras() { return this.form.get('tiempoEstimadoHoras'); }
}
