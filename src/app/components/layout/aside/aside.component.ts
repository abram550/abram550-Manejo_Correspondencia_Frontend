import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        routerLink: '/usuarios'
      },
      {
        label: 'Empleados',
        icon: 'pi pi-fw pi-qrcode',
        routerLink: '/empleados'
      },
      {
        label: 'Tipo Correspondencia',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink: '/tipo-correspondencia'
      },
      {
        label: 'Estado Correspondencia',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/estado-correspondencia'
      },
      {
        label: 'Sucursales',
        icon: 'pi pi-fw pi-map',
        routerLink: '/sucursales'
      },
      {
        label: 'Transporte',
        icon: 'pi pi-fw pi-car',
        routerLink: '/transporte'
      },
      {
        label: 'Rutas',
        icon: 'pi pi-fw pi-road',
        routerLink: '/rutas'
      },
      {
        label: 'Correspondencia',
        icon: 'pi pi-fw pi-envelope',
        routerLink: '/correspondencia'
      },
      {
        label: 'Pagos',
        icon: 'pi pi-fw pi-money-bill',
        routerLink: '/pagos'
      },
      {
        label: 'Eventos Correspondencia',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/eventos-correspondencia'
      },
      {
        label: 'Tipo Usuario',
        icon: 'pi pi-fw pi-user',
        routerLink: '/tipo-usuario'
      },
      {
        label: 'Tipo Pago',
        icon: 'pi pi-fw pi-dollar',
        routerLink: '/tipo-pago'
      },
      {
        label: 'Tipo Empleado',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: '/tipo-empleado'
      },
      {
        label: 'Tipo Vehículo',
        icon: 'pi pi-fw pi-car',
        routerLink: '/tipo-vehiculo'
      }
    ];
  }
}
