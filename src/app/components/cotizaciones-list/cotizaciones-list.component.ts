import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Cotizacion } from '../../models/cotizacion.model';
import { CotizacionService } from '../../services/cotizacion.service';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-cotizaciones-list',
  standalone: true,
  imports: [NgFor, NgIf, SectionHeaderComponent],
  templateUrl: './cotizaciones-list.component.html',
  styleUrl: './cotizaciones-list.component.css'
})
export class CotizacionesListComponent implements OnInit {
  cotizaciones: Cotizacion[] = [];

  constructor(private cotizacionService: CotizacionService,private router: Router) {
    
  }

  ngOnInit(): void {
    this.cotizaciones = this.cotizacionService.getCotizaciones();
  }

  verDetalle(id: string): void {
    this.router.navigate(['/detalle', id]);
  }

  nuevaCotizacion(): void {
    this.router.navigate(['/nueva-cotizacion']);
  }

  formatMoneda(valor: number): string {
    return `Q ${valor.toFixed(2)}`;
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-GT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}