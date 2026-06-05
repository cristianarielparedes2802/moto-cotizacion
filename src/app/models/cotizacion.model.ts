export interface Cotizacion {
  id: string;
  nombreCliente: string;
  montoSolicitado: number;
  tasaInteres: number;
  plazoMeses: number;
  cuotaMensual: number;
  fechaCreacion: string;
}

export interface CotizacionForm {
  nombreCliente: string;
  montoSolicitado: number;
  tasaInteres: number;
  plazoMeses: number;
}