import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportService } from '../../../services/transport/transport.service';
import { Router } from '@angular/router';
import { TransportI } from '../../../models/Transport';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-create-transport',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    RippleModule,
  ],
  templateUrl: './create-transport.component.html',
  styleUrls: ['./create-transport.component.css'],
})
export class CreateTransportComponent implements OnInit {
  public form!: FormGroup;
  public vehicleTypes: { label: string; value: number }[] = [];
  
  private transportService = inject(TransportService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadVehicleTypes();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      licensePlate: ['', [Validators.required]],
      capacityKg: ['', [Validators.required, Validators.min(0)]],
      vehicleTypeId: [null, [Validators.required]],
    });
  }

  private loadVehicleTypes(): void {
    this.transportService.getAllVehicleTypes().subscribe({
      next: (data) => {
        this.vehicleTypes = data.map((type) => ({
          label: type.description,
          value: type.id,
        }));
      },
      error: (err) => {
        console.error('Error al obtener los tipos de vehículos:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = {
        ...this.form.value,
        plate: this.form.value.licensePlate, // Mapear `licensePlate` a `plate`
      };
      delete formValue.licensePlate; // Eliminar `licensePlate` para evitar redundancia
  
      this.transportService.createTransport(formValue as TransportI).subscribe({
        next: () => {
          this.router.navigateByUrl('/transport');
        },
        error: (err) => {
          console.error('Error al crear el transporte:', err);
        },
      });
    } else {
      this.markFormFieldsAsTouched();
    }
  }
  
  cancel(): void {
    this.router.navigateByUrl('/transport');
  }

  private markFormFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para facilitar el acceso a los controles del formulario en el HTML
  get licensePlate() {
    return this.form.get('licensePlate');
  }

  get capacityKg() {
    return this.form.get('capacityKg');
  }

  get vehicleTypeId() {
    return this.form.get('vehicleTypeId');
  }
}
