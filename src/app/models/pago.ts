export interface TipoPagoI {
  id: number;
  nombre: string;

}

export interface PagoI {
  id?: number;
  correspondenciaId: number;
  monto: string; // Cambiado a string
  tipoPagoId: string; // Cambiado a string
  fechaPago: string; // Cambiado a string para que coincida con el formato esperado por el backend
  tipopago: TipoPagoI;  // El objeto TipoPagoI contiene el detalle del tipo de pago
}

