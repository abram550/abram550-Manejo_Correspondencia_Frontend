
  
  export interface TransportI {
    id: number;
    plate: string;
    capacityKg: number;
    vehicleTypeId: number;
    status: boolean; 
    vehicleType : VehicleTypeI;
  }


  export interface VehicleTypeI {
    id: number;
    description: string;
    status: boolean;
  }