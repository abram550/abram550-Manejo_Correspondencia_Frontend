// src/app/components/eventos-correspondencia/mostrar-evento-correspondencia/mostrar-evento-correspondencia.component.ts
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EventosCorrespondenciaService } from '../../../services/eventos-correspondencia/eventos-correspondencia.service';
import { EventosCorrespondenciaI } from '../../../models/eventoscorrespondencia';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mostrar-evento-correspondencia',
  standalone: true,
  imports: [RouterModule,TableModule, ButtonModule, CardModule,CommonModule],
  templateUrl: './mostrar-eventos-correspondencia.component.html',
  styleUrls: ['./mostrar-eventos-correspondencia.component.css']
})
export class MostrarEventosCorrespondenciaComponent implements OnInit  {

  public evento: EventosCorrespondenciaI[] = [];

  constructor(
    private eventosService: EventosCorrespondenciaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarEventos();
  }

  mostrarEventos() {
    this.eventosService.getAllEventos()
      .subscribe({
        next: (data) => {
          this.evento = data.eventos;
        }
      });
  }

  eliminar(id: number): void {
    this.eventosService.deleteEvento(id).subscribe(
      () => {
        this.mostrarEventos();
      },
      err => {
        console.log('error');
      }
    );
  }
}
