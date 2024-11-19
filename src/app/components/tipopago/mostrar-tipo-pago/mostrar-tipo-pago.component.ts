import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TipopagoService } from '../../../services/payment-type/payment-type.service';
import { TipoPagoI } from '../../../models/Payment';

@Component({
  selector: 'app-mostrar-tipo-pago',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-tipo-pago.component.html',
  styleUrls: ['./mostrar-tipo-pago.component.css']
})
export class MostrarTipoPagoComponent implements OnInit {

  public tipo: TipoPagoI[] = [];

  constructor(
    private tipopagoService: TipopagoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarTipos();
  }

  mostrarTipos() {
    this.tipopagoService.getAllTipos()
      .subscribe({
        next: (data) => {
          this.tipo = data.tiposPago;
        }
      });
  }

  eliminar(id: number): void {
    this.tipopagoService.deleteTipo(id).subscribe(
      () => {
        this.mostrarTipos();
      },
      err => {
        console.log('Error al eliminar el tipo de pago');
      }
    );
  }
}
