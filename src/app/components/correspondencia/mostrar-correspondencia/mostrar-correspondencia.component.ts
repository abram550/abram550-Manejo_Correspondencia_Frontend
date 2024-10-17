import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CorrespondenciaService } from '../../../services/correspondencia/correspondencia.service';
import { CorrespondenciaI } from '../../../models/correspondencia';
import { UsuarioI } from '../../../models/usuario';
import { EmpleadoI } from '../../../models/empleado';
import { TipoCorrespondenciaI } from '../../../models/tipocorrespondencia';
import { EstadoCorrespondenciaI } from '../../../models/estadocorrespondencia';
import { SucursalI } from '../../../models/sucursal';
import { TransporteI } from '../../../models/transporte';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrar-correspondencia',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './mostrar-correspondencia.component.html',
  styleUrls: ['./mostrar-correspondencia.component.css']
})
export class MostrarCorrespondenciaComponent implements OnInit  {

  public correspondencia: CorrespondenciaI[] = [];
  public usuarios: UsuarioI[] = [];
  public empleados: EmpleadoI[] = [];
  public tiposCorrespondencia: TipoCorrespondenciaI[] = [];
  public estadosCorrespondencia: EstadoCorrespondenciaI[] = [];
  public sucursales: SucursalI[] = [];
  public transportes: TransporteI[] = [];

  constructor(
    private correspondenciaService: CorrespondenciaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarCorrespondencias();
    this.obtenerUsuarios();
    this.obtenerEmpleados();
    this.obtenerTiposCorrespondencia();
    this.obtenerEstadosCorrespondencia();
    this.obtenerSucursales();
    this.obtenerTransportes();
  }

  mostrarCorrespondencias() {
    this.correspondenciaService.getAllCorrespondencias()
      .subscribe({
        next: (data) => {
          this.correspondencia = data.correspondencias;
        },
        error: (err) => {
          console.error('Error al cargar las correspondencias', err);
        }
      });
  }

  obtenerUsuarios() {
    this.correspondenciaService.getAllUsuarios()
      .subscribe({
        next: (data) => {
          this.usuarios = data; // Almacenar usuarios
        },
        error: (err) => {
          console.error('Error al cargar los usuarios', err);
        }
      });
  }

  obtenerEmpleados() {
    this.correspondenciaService.getAllEmpleados()
      .subscribe({
        next: (data) => {
          this.empleados = data; // Almacenar empleados
        },
        error: (err) => {
          console.error('Error al cargar los empleados', err);
        }
      });
  }

  obtenerTiposCorrespondencia() {
    this.correspondenciaService.getAllTiposCorrespondencia()
      .subscribe({
        next: (data) => {
          this.tiposCorrespondencia = data; // Almacenar tipos de correspondencia
        },
        error: (err) => {
          console.error('Error al cargar los tipos de correspondencia', err);
        }
      });
  }

  obtenerEstadosCorrespondencia() {
    this.correspondenciaService.getAllEstadosCorrespondencia()
      .subscribe({
        next: (data) => {
          this.estadosCorrespondencia = data; // Almacenar estados de correspondencia
        },
        error: (err) => {
          console.error('Error al cargar los estados de correspondencia', err);
        }
      });
  }

  obtenerSucursales() {
    this.correspondenciaService.getAllSucursales()
      .subscribe({
        next: (data) => {
          this.sucursales = data; // Almacenar sucursales
        },
        error: (err) => {
          console.error('Error al cargar las sucursales', err);
        }
      });
  }

  obtenerTransportes() {
    this.correspondenciaService.getAllTransportes()
      .subscribe({
        next: (data) => {
          this.transportes = data; // Almacenar transportes
        },
        error: (err) => {
          console.error('Error al cargar los transportes', err);
        }
      });
  }

  eliminar(id: number): void {
    this.correspondenciaService.deleteCorrespondencia(id).subscribe(
      () => {
        this.mostrarCorrespondencias();
      },
      err => {
        console.log('Error al eliminar la correspondencia', err);
      }
    );
  }

  // Métodos para obtener los nombres de los IDs
  getRemitenteNombre(id: number): string {
    const usuario = this.usuarios.find(u => u.id === id);
    return usuario ? usuario.nombre : 'Remitente no encontrado';
  }

  getDestinatarioNombre(id: number): string {
    const usuario = this.usuarios.find(u => u.id === id);
    return usuario ? usuario.nombre : 'Destinatario no encontrado';
  }

  getEmpleadoNombre(id: number): string {
    const empleado = this.empleados.find(e => e.id === id);
    return empleado ? empleado.nombre : 'Empleado no encontrado';
  }

  getTipoCorrespondenciaNombre(id: number): string {
    const tipo = this.tiposCorrespondencia.find(t => t.id === id);
    return tipo ? tipo.tipo : 'Tipo no encontrado';
  }

  getEstadoCorrespondenciaNombre(id: number): string {
    const estado = this.estadosCorrespondencia.find(e => e.id === id);
    return estado ? estado.estado : 'Estado no encontrado';
  }

  getSucursalOrigenNombre(id: number): string {
    const sucursal = this.sucursales.find(s => s.id === id);
    return sucursal ? sucursal.nombre : 'Sucursal origen no encontrada';
  }

  getSucursalDestinoNombre(id: number): string {
    const sucursal = this.sucursales.find(s => s.id === id);
    return sucursal ? sucursal.nombre : 'Sucursal destino no encontrada';
  }

  getTransporteNombre(id: number): string {
    const transporte = this.transportes.find(t => t.id === id);
    return transporte ? transporte.placa : 'Transporte no encontrado';
  }
}
