import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SucursalService } from '../../../services/sucursales/sucursales.service';
import { SucursalI } from '../../../models/sucursal';

@Component({
  selector: 'app-actualizar-sucursales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './actualizar-sucursales.component.html',
  styleUrls: ['./actualizar-sucursales.component.css']
})
export class ActualizarSucursalesComponent implements OnInit {
  public form: FormGroup;
  sucursalService = inject(SucursalService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadSucursal(); // Cargar sucursal al inicializar el componente
  }

  loadSucursal(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (id) {
      this.sucursalService.getOneSucursal(Number(id)).subscribe(
        response => {
          const sucursal = response.sucursal;
          this.form.patchValue({ // Cargar datos en el formulario
            nombre: sucursal.nombre,
            direccion: sucursal.direccion,
            ciudad: sucursal.ciudad,
            telefono: sucursal.telefono
          });
        },
        error => {
          console.error('Error al cargar la sucursal:', error);
          this.errorMessage = 'No se pudo cargar la sucursal. Intente nuevamente más tarde.';
        }
      );
    }
  }

  onSubmit(): void {
    const formValue: SucursalI = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.sucursalService.updateSucursal(Number(id), formValue).subscribe(
        () => {
          console.log('Sucursal actualizada correctamente:', formValue);
          this.router.navigateByUrl('sucursales'); // Redirigir a la lista de sucursales
        },
        err => {
          console.error(err);
          console.log('No se ha actualizado correctamente');
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/sucursales');
  }

  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); }
  get ciudad() { return this.form.get('ciudad'); }
  get telefono() { return this.form.get('telefono'); }
}
