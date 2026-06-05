import { Injectable } from '@angular/core';
import { Cotizacion, CotizacionForm } from '../models/cotizacion.model';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private readonly STORAGE_KEY = 'moto_cotizaciones';

  getCotizaciones(): Cotizacion[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  getCotizacionById(id: string): Cotizacion | undefined {
    return this.getCotizaciones().find(c => c.id === id);
  }

  guardarCotizacion(datos: CotizacionForm): Cotizacion {
    const cuotaMensual = this.calcularCuota(
      datos.montoSolicitado,
      datos.tasaInteres,
      datos.plazoMeses
    );

    const nueva: Cotizacion = {
      id: `COT-${Date.now()}`,
      ...datos,
      cuotaMensual,
      fechaCreacion: new Date().toISOString()
    };

    const lista = this.getCotizaciones();
    lista.push(nueva);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));

    return nueva;
  }

  // Fórmula francesa: M = P * [i*(1+i)^n] / [(1+i)^n - 1]
  calcularCuota(monto: number, tasaAnual: number, plazo: number): number {
    if (!monto || !plazo) return 0;
    if (tasaAnual === 0) return monto / plazo;

    const i = tasaAnual / 12 / 100;
    const potencia = Math.pow(1 + i, plazo);
    return monto * (i * potencia) / (potencia - 1);
  }
}