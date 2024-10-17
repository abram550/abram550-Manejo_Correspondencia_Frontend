import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SucursalService } from '../../../services/sucursales/sucursales.service';
import { SucursalI } from '../../../models/sucursal';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-mostrar-sucursal',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule], // Agrega RouterModule aquí
  templateUrl: './mostrar-sucursales.component.html',
  styleUrls: ['./mostrar-sucursales.component.css']
})
export class MostrarSucursalesComponent implements OnInit  {

  public sucursale: SucursalI[] = [];

  constructor(
    private sucursalservice: SucursalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarSucursales();
  }

  mostrarSucursales() {
    this.sucursalservice.getAllSucursales()
      .subscribe({
        next: (data) => {
          this.sucursale = data.sucursales;
        }
      });
  }

  eliminar(id: number): void {
    this.sucursalservice.deleteSucursal(id).subscribe(
      () => {
        this.mostrarSucursales();
      },
      err => {
        console.log('error');
      }
    );
  }
}
