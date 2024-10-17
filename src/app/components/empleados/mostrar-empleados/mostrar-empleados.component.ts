// src/app/components/empleados/mostrar-empleados/mostrar-empleados.component.ts
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EmpleadosService } from '../../../services/empleados/empleados.service';
import { EmpleadoI } from '../../../models/empleado';

@Component({
  selector: 'app-mostrar-empleados',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-empleados.component.html',
  styleUrls: ['./mostrar-empleados.component.css']
})
export class MostrarEmpleadosComponent implements OnInit  {

  public empleados: EmpleadoI[] = [];

  constructor(
    private empleadosService: EmpleadosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarEmpleados();
  }

  mostrarEmpleados() {
    this.empleadosService.getAllEmpleados()
      .subscribe({
        next: (data) => {
          this.empleados = data.empleados;
        }
      });
  }

  eliminar(id: number): void {
    this.empleadosService.deleteEmpleado(id).subscribe(
      () => {
        this.mostrarEmpleados();
      },
      err => {
        console.log('error');
      }
    );
  }
}
