
export interface TransporteI {
    id?: number;
    tipoVehiculo: string;
    placa: string;
    capacidadKg: number;
    tipovehiculo: TipoVehiculoI;
    tipoVehiculoId: number;
  }

  export interface TipoVehiculoI {
    id: number;
    descripcion: string;
  }
  
  