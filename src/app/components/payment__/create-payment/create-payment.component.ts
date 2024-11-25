import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../services/payments/payments.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { PaymentI, PaymentTypeI } from '../../../models/Payment';

@Component({
  selector: 'app-create-payments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './create-payments.component.html',
  styleUrls: ['./create-payments.component.css']
})
export class CreatePaymentsComponent implements OnInit {

  public form: FormGroup; 
  public paymentTypes: PaymentTypeI[] = []; 
  paymentService = inject(PaymentService); 
  router = inject(Router); 

  constructor(private formBuilder: FormBuilder) {
    
    this.form = this.formBuilder.group({
      correspondenceId: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      paymentTypeId: ['', [Validators.required]], 
      paymentDate: ['', [Validators.required]] 
    });
  }

  ngOnInit(): void {
    this.loadPaymentTypes();
  }


  loadPaymentTypes(): void {
    this.paymentService.getAllPaymentTypes().subscribe(
      (types: PaymentTypeI[]) => {
        this.paymentTypes = types;
      },
      err => {
        console.log('Error al cargar los tipos de pago:', err); 
      }
    );
  }


  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido:', this.form.errors); 
      return; 
    }
  
    const formValue = this.form.value; 
    const selectedPaymentType = this.paymentTypes.find(type => type.id === formValue.paymentTypeId);
  

    if (!selectedPaymentType) {
      console.error('Tipo de pago no encontrado');
      return; 
    }
  
    const paymentData = {
      payment: {
        correspondenceId: formValue.correspondenceId,
        amount: formValue.amount.toString(),
        paymentTypeId: formValue.paymentTypeId.toString(), 
        paymentDate: new Date(formValue.paymentDate), 
        paymentType: selectedPaymentType, 
        status: false 
      }
    };
  
    console.log('Datos a enviar:', paymentData); 
  
    this.paymentService.createPayment(paymentData).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        this.router.navigateByUrl('payments');
      },
      err => {
        console.log('Error al crear el pago:', err);
        console.log('No se ha creado el pago correctamente');
      }
    );
  }
  

  cancel() {
    this.router.navigateByUrl('/payments');
  }

  get correspondenceId() { return this.form.get('correspondenceId'); }
  get amount() { return this.form.get('amount'); }
  get paymentTypeId() { return this.form.get('paymentTypeId'); }
  get paymentDate() { return this.form.get('paymentDate'); }
}
