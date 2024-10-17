import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TipoEmpleadoService } from '../../../services/tipoempleados/tipoempleado.service';
import { TipoEmpleadoI } from '../../../models/empleado';

@Component({
  selector: 'app-mostrar-tipo-empleado',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-tipo-empleado.component.html',
  styleUrls: ['./mostrar-tipo-empleado.component.css']
})
export class MostrarTipoEmpleadoComponent implements OnInit  {

  public tipo: TipoEmpleadoI[] = [];

  constructor(
    private tipoEmpleadoService: TipoEmpleadoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarTipos();
  }

  mostrarTipos() {
    this.tipoEmpleadoService.getAllTipos()
      .subscribe({
        next: (data) => {
          this.tipo = data.tiposEmpleado;
        }
      });
  }

  eliminar(id: number): void {
    this.tipoEmpleadoService.deleteTipo(id).subscribe(
      () => {
        this.mostrarTipos();
      },
      err => {
        console.log('error');
      }
    );
  }
}
