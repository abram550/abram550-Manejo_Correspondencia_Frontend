import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RutaService } from '../../../services/routes-/routes.service';
import { RutaI } from '../../../models/Route';
import { SucursalI } from '../../../models/Branch';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-mostrar-ruta',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './mostrar-rutas.component.html',
  styleUrls: ['./mostrar-rutas.component.css']
})
export class MostrarRutasComponent implements OnInit  {

  public rutas: RutaI[] = [];
  public sucursales: SucursalI[] = [];

  constructor(
    private rutaService: RutaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarRutas();
    this.obtenerSucursales(); // Cargar sucursales al iniciar
  }

  mostrarRutas() {
    this.rutaService.getAllRutas()
      .subscribe({
        next: (data) => {
          this.rutas = data.rutas;
        },
        error: (err) => {
          console.error('Error al cargar las rutas', err);
        }
      });
  }

  obtenerSucursales() {
    this.rutaService.getAllSucursales()
      .subscribe({
        next: (data) => {
          this.sucursales = data; // Almacenar sucursales
        },
        error: (err) => {
          console.error('Error al cargar las sucursales', err);
        }
      });
  }

  eliminar(id: number): void {
    this.rutaService.deleteRuta(id).subscribe(
      () => {
        this.mostrarRutas();
      },
      err => {
        console.log('Error al eliminar la ruta', err);
      }
    );
  }

  // Método para obtener el nombre de una sucursal por su ID
  getSucursalNombre(id: number): string {
    const sucursal = this.sucursales.find(s => s.id === id);
    return sucursal ? sucursal.nombre : 'Sucursal no encontrada';
  }
}
