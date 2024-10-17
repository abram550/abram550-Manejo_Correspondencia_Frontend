import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PagoService } from '../../../services/pagos/pagos.service';
import { PagoI, TipoPagoI } from '../../../models/pago';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrar-pago',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './mostrar-pagos.component.html',
  styleUrls: ['./mostrar-pagos.component.css']
})
export class MostrarPagosComponent implements OnInit  {

  public pagos: PagoI[] = [];
  public tiposPago: TipoPagoI[] = []; 

  constructor(
    private pagoService: PagoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarTiposPago(); // Cargar tipos de pago primero
    this.mostrarPagos(); // Luego, mostrar los pagos
  }

  mostrarPagos() {
    this.pagoService.getAllPagos().subscribe({
      next: (data) => {
        this.pagos = data.pagos.map(pago => {
          const tipoPago = this.tiposPago.find(tp => tp.id === pago.tipoPagoId);

          // Si no encuentra un tipo de pago, asigna un objeto vacío o un valor por defecto
          return {
            ...pago,
            tipopago: tipoPago || { id: 0, nombre: 'Desconocido' } 
          };
        });
      }
    });
  }

  cargarTiposPago() {
    this.pagoService.getAllTiposPago().subscribe({
      next: (data) => {
        this.tiposPago = data; // Cargar los tipos de pago disponibles
      }
    });
  }

  eliminar(id: number): void {
    this.pagoService.deletePago(id).subscribe(
      () => {
        this.mostrarPagos();
      },
      err => {
        console.log('error');
      }
    );
  }
}
