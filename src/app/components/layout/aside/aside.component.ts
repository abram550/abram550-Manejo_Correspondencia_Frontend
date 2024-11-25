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
        routerLink: '/users'
      },
      {
        label: 'Empleados',
        icon: 'pi pi-fw pi-qrcode',
        routerLink: '/employees'
      },
      {
        label: 'Tipo Correspondencia',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink: '/correspondence-type'
      },
      {
        label: 'Estado Correspondencia',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/correspondence-status'
      },
      {
        label: 'Sucursales',
        icon: 'pi pi-fw pi-map',
        routerLink: '/branches'
      },
      {
        label: 'Transporte',
        icon: 'pi pi-fw pi-car',
        routerLink: '/transport'
      },
      {
        label: 'Rutas',
        icon: 'pi pi-fw pi-road',
        routerLink: '/routes'
      },
      {
        label: 'Correspondencia',
        icon: 'pi pi-fw pi-envelope',
        routerLink: '/correspondence'
      },
      {
        label: 'payments',
        icon: 'pi pi-fw pi-money-bill',
        routerLink: '/payments'
      },
      {
        label: 'Eventos Correspondencia',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/correspondence-events'
      },
      {
        label: 'Tipo Usuario',
        icon: 'pi pi-fw pi-user',
        routerLink: '/user-type'
      },
      {
        label: 'Tipo Pago',
        icon: 'pi pi-fw pi-dollar',
        routerLink: '/payment-type'
      },
      {
        label: 'Tipo Empleado',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: '/employee-type'
      },
      {
        label: 'Tipo Vehículo',
        icon: 'pi pi-fw pi-car',
        routerLink: '/vehicle-type'
      }
    ];
  }
}
