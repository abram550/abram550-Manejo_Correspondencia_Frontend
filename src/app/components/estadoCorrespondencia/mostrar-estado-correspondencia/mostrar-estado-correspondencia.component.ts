// src/app/components/estado-correspondencia/mostrar-estado-correspondencia/mostrar-estado-correspondencia.component.ts
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EstadoCorrespondenciaService } from '../../../services/estado-correspondencia/estado-correspondencia.service';
import { EstadoCorrespondenciaI } from '../../../models/estadocorrespondencia';

@Component({
  selector: 'app-mostrar-estado-correspondencia',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-estado-correspondencia.component.html',
  styleUrls: ['./mostrar-estado-correspondencia.component.css']
})
export class MostrarEstadoCorrespondenciaComponent implements OnInit  {

  public estado: EstadoCorrespondenciaI[] = [];

  constructor(
    private estadoCorrespondenciaService: EstadoCorrespondenciaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarEstados();
  }

  mostrarEstados() {
    this.estadoCorrespondenciaService.getAllEstados()
      .subscribe({
        next: (data) => {
          this.estado = data.estados;
        }
      });
  }

  eliminar(id: number): void {
    this.estadoCorrespondenciaService.deleteEstado(id).subscribe(
      () => {
        this.mostrarEstados();
      },
      err => {
        console.log('error');
      }
    );
  }
}
