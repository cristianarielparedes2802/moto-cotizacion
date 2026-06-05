import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Cotizacion } from '../../models/cotizacion.model';
import { CotizacionService } from '../../services/cotizacion.service';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-detalle-cotizacion',
  standalone: true,
  imports: [NgIf, SectionHeaderComponent],
  templateUrl: './detalle-cotizacion.component.html',
  styleUrl: './detalle-cotizacion.component.css'
})
export class DetalleCotizacionComponent implements OnInit {
  cotizacion?: Cotizacion;
  noEncontrada = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cotizacionService: CotizacionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cotizacion = this.cotizacionService.getCotizacionById(id);
      if (!this.cotizacion) this.noEncontrada = true;
    }
  }

  get totalPagar(): number {
    return this.cotizacion
      ? this.cotizacion.cuotaMensual * this.cotizacion.plazoMeses
      : 0;
  }

  get totalIntereses(): number {
    return this.cotizacion
      ? this.totalPagar - this.cotizacion.montoSolicitado
      : 0;
  }

  formatMoneda(valor: number): string {
    return `Q ${valor.toLocaleString('es-GT', { minimumFractionDigits: 2 })}`;
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-GT', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  }

  volver(): void {
    this.router.navigate(['/cotizaciones']);
  }
}