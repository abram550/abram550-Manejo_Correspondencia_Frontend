import { Routes } from '@angular/router';

// Importa los componentes generados para las diferentes tablas
import { MostrarUsuariosComponent } from './components/usuarios/mostrar-usuarios/mostrar-usuarios.component';
import { CrearUsuariosComponent } from './components/usuarios/crear-usuarios/crear-usuarios.component';
import { ActualizarUsuariosComponent } from './components/usuarios/actualizar-usuarios/actualizar-usuarios.component';
import { EliminarUsuariosComponent } from './components/usuarios/eliminar-usuarios/eliminar-usuarios.component';

import { MostrarEmpleadosComponent } from './components/empleados/mostrar-empleados/mostrar-empleados.component';
import { CrearEmpleadosComponent } from './components/empleados/crear-empleados/crear-empleados.component';
import { ActualizarEmpleadosComponent } from './components/empleados/actualizar-empleados/actualizar-empleados.component';
import { EliminarEmpleadosComponent } from './components/empleados/eliminar-empleados/eliminar-empleados.component';

import { MostrarTipoCorrespondenciaComponent } from './components/tipoCorrespondencia/mostrar-tipo-correspondencia/mostrar-tipo-correspondencia.component';
import { CrearTipoCorrespondenciaComponent } from './components/tipoCorrespondencia/crear-tipo-correspondencia/crear-tipo-correspondencia.component';
import { ActualizarTipoCorrespondenciaComponent } from './components/tipoCorrespondencia/actualizar-tipo-correspondencia/actualizar-tipo-correspondencia.component';
import { EliminarTipoCorrespondenciaComponent } from './components/tipoCorrespondencia/eliminar-tipo-correspondencia/eliminar-tipo-correspondencia.component';

import { MostrarEstadoCorrespondenciaComponent } from './components/estadoCorrespondencia/mostrar-estado-correspondencia/mostrar-estado-correspondencia.component';
import { CrearEstadoCorrespondenciaComponent } from './components/estadoCorrespondencia/crear-estado-correspondencia/crear-estado-correspondencia.component';
import { ActualizarEstadoCorrespondenciaComponent } from './components/estadoCorrespondencia/actualizar-estado-correspondencia/actualizar-estado-correspondencia.component';
import { EliminarEstadoCorrespondenciaComponent } from './components/estadoCorrespondencia/eliminar-estado-correspondencia/eliminar-estado-correspondencia.component';

import { MostrarSucursalesComponent } from './components/sucursales/mostrar-sucursales/mostrar-sucursales.component';
import { CrearSucursalesComponent } from './components/sucursales/crear-sucursales/crear-sucursales.component';
import { ActualizarSucursalesComponent } from './components/sucursales/actualizar-sucursales/actualizar-sucursales.component';
import { EliminarSucursalesComponent } from './components/sucursales/eliminar-sucursales/eliminar-sucursales.component';

import { MostrarTransporteComponent } from './components/transporte/mostrar-transporte/mostrar-transporte.component';
import { CrearTransporteComponent } from './components/transporte/crear-transporte/crear-transporte.component';
import { ActualizarTransporteComponent } from './components/transporte/actualizar-transporte/actualizar-transporte.component';
import { EliminarTransporteComponent } from './components/transporte/eliminar-transporte/eliminar-transporte.component';

import { MostrarRutasComponent } from './components/rutas/mostrar-rutas/mostrar-rutas.component';
import { CrearRutasComponent } from './components/rutas/crear-rutas/crear-rutas.component';
import { ActualizarRutasComponent } from './components/rutas/actualizar-rutas/actualizar-rutas.component';
import { EliminarRutasComponent } from './components/rutas/eliminar-rutas/eliminar-rutas.component';

import { MostrarCorrespondenciaComponent } from './components/correspondencia/mostrar-correspondencia/mostrar-correspondencia.component';
import { CrearCorrespondenciaComponent } from './components/correspondencia/crear-correspondencia/crear-correspondencia.component';
import { ActualizarCorrespondenciaComponent } from './components/correspondencia/actualizar-correspondencia/actualizar-correspondencia.component';
import { EliminarCorrespondenciaComponent } from './components/correspondencia/eliminar-correspondencia/eliminar-correspondencia.component';

import { MostrarPagosComponent } from './components/pagos/mostrar-pagos/mostrar-pagos.component';
import { CrearPagosComponent } from './components/pagos/crear-pagos/crear-pagos.component';
import { ActualizarPagosComponent } from './components/pagos/actualizar-pagos/actualizar-pagos.component';
import { EliminarPagosComponent } from './components/pagos/eliminar-pagos/eliminar-pagos.component';

import { MostrarEventosCorrespondenciaComponent } from './components/eventosCorrespondencia/mostrar-eventos-correspondencia/mostrar-eventos-correspondencia.component';
import { CrearEventosCorrespondenciaComponent } from './components/eventosCorrespondencia/crear-eventos-correspondencia/crear-eventos-correspondencia.component';
import { ActualizarEventosCorrespondenciaComponent } from './components/eventosCorrespondencia/actualizar-eventos-correspondencia/actualizar-eventos-correspondencia.component';
import { EliminarEventosCorrespondenciaComponent } from './components/eventosCorrespondencia/eliminar-eventos-correspondencia/eliminar-eventos-correspondencia.component';

// Rutas para Tipo Usuario
import { MostrarTipoUsuarioComponent } from './components/tipousuario/mostrar-tipo-usuario/mostrar-tipo-usuario.component';
import { CrearTipoUsuarioComponent } from './components/tipousuario/crear-tipo-usuario/crear-tipo-usuario.component';
import { ActualizarTipoUsuarioComponent } from './components/tipousuario/actualizar-tipo-usuario/actualizar-tipo-usuario.component';
import { EliminarTipoUsuarioComponent } from './components/tipousuario/eliminar-tipo-usuario/eliminar-tipo-usuario.component';

// Rutas para Tipo Pago
import { MostrarTipoPagoComponent } from './components/tipopago/mostrar-tipo-pago/mostrar-tipo-pago.component';
import { CrearTipoPagoComponent } from './components/tipopago/crear-tipo-pago/crear-tipo-pago.component';
import { ActualizarTipoPagoComponent } from './components/tipopago/actualizar-tipo-pago/actualizar-tipo-pago.component';
import { EliminarTipoPagoComponent } from './components/tipopago/eliminar-tipo-pago/eliminar-tipo-pago.component';

// Rutas para Tipo Empleado
import { MostrarTipoEmpleadoComponent } from './components/tipoempleado/mostrar-tipo-empleado/mostrar-tipo-empleado.component';
import { CrearTipoEmpleadoComponent } from './components/tipoempleado/crear-tipo-empleado/crear-tipo-empleado.component';
import { ActualizarTipoEmpleadoComponent } from './components/tipoempleado/actualizar-tipo-empleado/actualizar-tipo-empleado.component';
import { EliminarTipoEmpleadoComponent } from './components/tipoempleado/eliminar-tipo-empleado/eliminar-tipo-empleado.component';

// Rutas para Tipo Vehiculo
import { MostrarTipoVehiculoComponent } from './components/tipovehiculo/mostrar-tipo-vehiculo/mostrar-tipo-vehiculo.component';
import { CrearTipoVehiculoComponent } from './components/tipovehiculo/crear-tipo-vehiculo/crear-tipo-vehiculo.component';
import { ActualizarTipoVehiculoComponent } from './components/tipovehiculo/actualizar-tipo-vehiculo/actualizar-tipo-vehiculo.component';
import { EliminarTipoVehiculoComponent } from './components/tipovehiculo/eliminar-tipo-vehiculo/eliminar-tipo-vehiculo.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/usuarios', 
        pathMatch: 'full' 
    },
    // Rutas de Usuarios
    {
        path: "usuarios",
        component: MostrarUsuariosComponent
    },
    {
        path: "usuarios/nuevo",
        component: CrearUsuariosComponent
    },
    {
        path: "usuarios/edit/:id",
        component: ActualizarUsuariosComponent
    },
    {
        path: "usuarios/eliminar/:id",
        component: EliminarUsuariosComponent
    },
    // Rutas de Empleados
    {
        path: "empleados",
        component: MostrarEmpleadosComponent
    },
    {
        path: "empleados/nuevo",
        component: CrearEmpleadosComponent
    },
    {
        path: "empleados/edit/:id",
        component: ActualizarEmpleadosComponent
    },
    {
        path: "empleados/eliminar/:id",
        component: EliminarEmpleadosComponent
    },
    // Rutas de TipoCorrespondencia
    {
        path: "tipo-correspondencia",
        component: MostrarTipoCorrespondenciaComponent
    },
    {
        path: "tipo-correspondencia/nuevo",
        component: CrearTipoCorrespondenciaComponent
    },
    {
        path: "tipo-correspondencia/edit/:id",
        component: ActualizarTipoCorrespondenciaComponent
    },
    {
        path: "tipo-correspondencia/eliminar/:id",
        component: EliminarTipoCorrespondenciaComponent
    },
    // Rutas de EstadoCorrespondencia
    {
        path: "estado-correspondencia",
        component: MostrarEstadoCorrespondenciaComponent
    },
    {
        path: "estado-correspondencia/nuevo",
        component: CrearEstadoCorrespondenciaComponent
    },
    {
        path: "estado-correspondencia/edit/:id",
        component: ActualizarEstadoCorrespondenciaComponent
    },
    {
        path: "estado-correspondencia/eliminar/:id",
        component: EliminarEstadoCorrespondenciaComponent
    },
    // Rutas de Sucursales
    {
        path: "sucursales",
        component: MostrarSucursalesComponent
    },
    {
        path: "sucursales/nuevo",
        component: CrearSucursalesComponent
    },
    {
        path: "sucursales/edit/:id",
        component: ActualizarSucursalesComponent
    },
    {
        path: "sucursales/eliminar/:id",
        component: EliminarSucursalesComponent
    },
    // Rutas de Transporte
    {
        path: "transporte",
        component: MostrarTransporteComponent
    },
    {
        path: "transporte/nuevo",
        component: CrearTransporteComponent
    },
    {
        path: "transporte/edit/:id",
        component: ActualizarTransporteComponent
    },
    {
        path: "transporte/eliminar/:id",
        component: EliminarTransporteComponent
    },
    // Rutas de Rutas
    {
        path: "rutas",
        component: MostrarRutasComponent
    },
    {
        path: "rutas/nuevo",
        component: CrearRutasComponent
    },
    {
        path: "rutas/edit/:id",
        component: ActualizarRutasComponent
    },
    {
        path: "rutas/eliminar/:id",
        component: EliminarRutasComponent
    },
    // Rutas de Correspondencia
    {
        path: "correspondencia",
        component: MostrarCorrespondenciaComponent
    },
    {
        path: "correspondencia/nuevo",
        component: CrearCorrespondenciaComponent
    },
    {
        path: "correspondencia/edit/:id",
        component: ActualizarCorrespondenciaComponent
    },
    {
        path: "correspondencia/eliminar/:id",
        component: EliminarCorrespondenciaComponent
    },
    // Rutas de Pagos
    {
        path: "pagos",
        component: MostrarPagosComponent
    },
    {
        path: "pagos/nuevo",
        component: CrearPagosComponent
    },
    {
        path: "pagos/edit/:id",
        component: ActualizarPagosComponent
    },
    {
        path: "pagos/eliminar/:id",
        component: EliminarPagosComponent
    },
    // Rutas de EventosCorrespondencia
    {
        path: "eventos-correspondencia",
        component: MostrarEventosCorrespondenciaComponent
    },
    {
        path: "eventos-correspondencia/nuevo",
        component: CrearEventosCorrespondenciaComponent
    },
    {
        path: "eventos-correspondencia/edit/:id",
        component: ActualizarEventosCorrespondenciaComponent
    },
    {
        path: "eventos-correspondencia/eliminar/:id",
        component: EliminarEventosCorrespondenciaComponent
    },
    // Rutas para Tipo Usuario
    {
        path: "tipo-usuario",
        component: MostrarTipoUsuarioComponent
    },
    {
        path: "tipo-usuario/nuevo",
        component: CrearTipoUsuarioComponent
    },
    {
        path: "tipo-usuario/edit/:id",
        component: ActualizarTipoUsuarioComponent
    },
    {
        path: "tipo-usuario/eliminar/:id",
        component: EliminarTipoUsuarioComponent
    },
    // Rutas para Tipo Pago
    {
        path: "tipo-pago",
        component: MostrarTipoPagoComponent
    },
    {
        path: "tipo-pago/nuevo",
        component: CrearTipoPagoComponent
    },
    {
        path: "tipo-pago/edit/:id",
        component: ActualizarTipoPagoComponent
    },
    {
        path: "tipo-pago/eliminar/:id",
        component: EliminarTipoPagoComponent
    },
    // Rutas para Tipo Empleado
    {
        path: "tipo-empleado",
        component: MostrarTipoEmpleadoComponent
    },
    {
        path: "tipo-empleado/nuevo",
        component: CrearTipoEmpleadoComponent
    },
    {
        path: "tipo-empleado/edit/:id",
        component: ActualizarTipoEmpleadoComponent
    },
    {
        path: "tipo-empleado/eliminar/:id",
        component: EliminarTipoEmpleadoComponent
    },
    // Rutas para Tipo Vehiculo
    {
        path: "tipo-vehiculo",
        component: MostrarTipoVehiculoComponent
    },
    {
        path: "tipo-vehiculo/nuevo",
        component: CrearTipoVehiculoComponent
    },
    {
        path: "tipo-vehiculo/edit/:id",
        component: ActualizarTipoVehiculoComponent
    },
    {
        path: "tipo-vehiculo/eliminar/:id",
        component: EliminarTipoVehiculoComponent
    }
];
