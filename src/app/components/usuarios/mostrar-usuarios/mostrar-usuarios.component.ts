import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { UsuarioI } from '../../../models/usuario';

@Component({
  selector: 'app-mostrar-usuarios',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-usuarios.component.html',
  styleUrl: './mostrar-usuarios.component.css'
})
export class MostrarUsuariosComponent implements OnInit  {

  public usuario: UsuarioI[] = [];

  constructor(
    private usuariosservice: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarusuarios();
  }

  mostrarusuarios() {
    this.usuariosservice.getAllusuarios()
      .subscribe({
        next: (data) => {
          this.usuario = data.usuarios;
        }
      });
  }

  eliminar(id: number): void {
    this.router.navigateByUrl('/usuarios');
    this.usuariosservice.deleteusuarios(id).subscribe(
      () => {
        this.mostrarusuarios();
      },
      err => {
        console.log('error');
        this.router.navigateByUrl('/usuarios');
      }
    );
  }
}
