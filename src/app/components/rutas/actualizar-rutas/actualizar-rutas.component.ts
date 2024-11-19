import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RutaService } from '../../../services/routes-/routes.service';
import { RutaI } from '../../../models/Route';
import { SucursalI } from '../../../models/Branch';

@Component({
  selector: 'app-actualizar-rutas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './actualizar-rutas.component.html',
  styleUrls: ['./actualizar-rutas.component.css']
})
export class ActualizarRutasComponent implements OnInit {
  public form: FormGroup;
  public sucursales: SucursalI[] = []; // Array para almacenar sucursales
  rutaService = inject(RutaService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      sucursalOrigenId: ['', [Validators.required]],
      sucursalDestinoId: ['', [Validators.required]],
      distanciaKm: ['', [Validators.required]],
      tiempoEstimadoHoras: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadSucursales(); // Cargar sucursales al inicializar el componente
    this.loadRuta(); // Cargar ruta al inicializar el componente
  }

  loadSucursales(): void {
    this.rutaService.getAllSucursales().subscribe(
      sucursales => {
        this.sucursales = sucursales; // Almacenar sucursales en el array
      },
      error => {
        console.error('Error al cargar las sucursales:', error);
        this.errorMessage = 'No se pudieron cargar las sucursales. Intente nuevamente más tarde.';
      }
    );
  }

  loadRuta(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (id) {
      this.rutaService.getOneRuta(Number(id)).subscribe(
        response => {
          const ruta = response.ruta;
          this.form.patchValue({ // Cargar datos en el formulario
            sucursalOrigenId: ruta.sucursalOrigenId,
            sucursalDestinoId: ruta.sucursalDestinoId,
            distanciaKm: ruta.distanciaKm,
            tiempoEstimadoHoras: ruta.tiempoEstimadoHoras
          });
        },
        error => {
          console.error('Error al cargar la ruta:', error);
          this.errorMessage = 'No se pudo cargar la ruta. Intente nuevamente más tarde.';
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: RutaI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.rutaService.updateRuta(Number(id), formValue).subscribe(
        () => {
          console.log('Ruta actualizada correctamente:', formValue);
          this.router.navigateByUrl('rutas'); // Redirigir a la lista de rutas
        },
        err => {
          console.error(err);
          console.log('No se ha actualizado correctamente');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/rutas');
  }

  get sucursalOrigenId() { return this.form.get('sucursalOrigenId'); }
  get sucursalDestinoId() { return this.form.get('sucursalDestinoId'); }
  get distanciaKm() { return this.form.get('distanciaKm'); }
  get tiempoEstimadoHoras() { return this.form.get('tiempoEstimadoHoras'); }
}
