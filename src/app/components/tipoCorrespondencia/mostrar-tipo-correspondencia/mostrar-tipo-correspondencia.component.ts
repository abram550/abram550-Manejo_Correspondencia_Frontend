// src/app/components/tipo-correspondencia/mostrar-tipo-correspondencia/mostrar-tipo-correspondencia.component.ts
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TipoCorrespondenciaService } from '../../../services/tipo-correspondencia/tipo-correspondencia.service';
import { TipoCorrespondenciaI } from '../../../models/tipocorrespondencia';

@Component({
  selector: 'app-mostrar-tipo-correspondencia',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-tipo-correspondencia.component.html',
  styleUrls: ['./mostrar-tipo-correspondencia.component.css']
})
export class MostrarTipoCorrespondenciaComponent implements OnInit  {

  public tipo: TipoCorrespondenciaI[] = [];

  constructor(
    private tipoCorrespondenciaService: TipoCorrespondenciaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarTipos();
  }

  mostrarTipos() {
    this.tipoCorrespondenciaService.getAllTipos()
      .subscribe({
        next: (data) => {
          this.tipo = data.tipos;
        }
      });
  }

  eliminar(id: number): void {
    this.tipoCorrespondenciaService.deleteTipo(id).subscribe(
      () => {
        this.mostrarTipos();
      },
      err => {
        console.log('error');
      }
    );
  }
}
