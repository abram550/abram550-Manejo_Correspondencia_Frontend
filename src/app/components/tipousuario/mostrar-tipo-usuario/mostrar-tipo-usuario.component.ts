import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TipousuarioService } from '../../../services/user-type/user-type.service';
import { TipoUsuarioI } from '../../../models/User

@Component({
  selector: 'app-mostrar-tipo-usuario',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-tipo-usuario.component.html',
  styleUrls: ['./mostrar-tipo-usuario.component.css']
})
export class MostrarTipoUsuarioComponent implements OnInit {

  public tiposUsuario: TipoUsuarioI[] = [];

  constructor(
    private tipousuarioService: TipousuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarTipos();
  }

  mostrarTipos() {
    this.tipousuarioService.getAllTipos()
      .subscribe({
        next: (data) => {
          this.tiposUsuario = data.tiposUsuario;
        }
      });
  }

  eliminar(id: number): void {
    this.tipousuarioService.deleteTipo(id).subscribe(
      () => {
        this.mostrarTipos();
      },
      err => {
        console.log('error al eliminar el tipo de usuario');
      }
    );
  }
}
