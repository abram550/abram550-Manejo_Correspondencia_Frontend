import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TransporteService } from '../../../services/transport/transport.service';
import { TransporteI } from '../../../models/Transport';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-mostrar-transporte',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './mostrar-transporte.component.html',
  styleUrls: ['./mostrar-transporte.component.css']
})
export class MostrarTransporteComponent implements OnInit {

  public transportes: TransporteI[] = [];

  constructor(
    private transporteService: TransporteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarTransportes();
  }

  mostrarTransportes() {
    this.transporteService.getAllTransportes()
      .subscribe({
        next: (data) => {
          this.transportes = data.transportes;
        }
      });
  }

  eliminar(id: number): void {
    this.transporteService.deleteTransporte(id).subscribe(
      () => {
        this.mostrarTransportes();
      },
      err => {
        console.log('error');
      }
    );
  }
}
