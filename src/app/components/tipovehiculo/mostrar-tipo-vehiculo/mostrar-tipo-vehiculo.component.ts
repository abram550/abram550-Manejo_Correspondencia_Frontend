import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TipovehiculoService } from '../../../services/vehicle-type/vehicle-type.service';
import { TipoVehiculoI } from '../../../models/Transport';

@Component({
  selector: 'app-mostrar-tipo-vehiculo',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-tipo-vehiculo.component.html',
  styleUrls: ['./mostrar-tipo-vehiculo.component.css']
})
export class MostrarTipoVehiculoComponent implements OnInit  {

  public tipo: TipoVehiculoI[] = [];

  constructor(
    private tipoVehiculoService: TipovehiculoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarTipos();
  }

  mostrarTipos() {
    this.tipoVehiculoService.getAllTipos()
      .subscribe({
        next: (data) => {
          this.tipo = data.tiposVehiculo;
        },
        error: (err) => {
          console.error('Error al obtener los tipos de vehículo', err);
        }
      });
  }

  eliminar(id: number): void {
    this.tipoVehiculoService.deleteTipo(id).subscribe(
      () => {
        this.mostrarTipos();
      },
      err => {
        console.error('Error al eliminar el tipo de vehículo', err);
      }
    );
  }
}
