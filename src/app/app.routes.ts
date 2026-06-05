import { Routes } from '@angular/router';
import { CotizacionesListComponent } from './components/cotizaciones-list/cotizaciones-list.component';
import { NuevaCotizacionComponent } from './components/nueva-cotizacion/nueva-cotizacion.component';
import { DetalleCotizacionComponent } from './components/detalle-cotizacion/detalle-cotizacion.component';


export const routes: Routes = [
  { path: '', redirectTo: 'cotizaciones', pathMatch: 'full' },
  { path: 'cotizaciones', component: CotizacionesListComponent },
  { path: 'nueva-cotizacion', component: NuevaCotizacionComponent },
  { path: 'detalle/:id', component: DetalleCotizacionComponent },
  { path: '**', redirectTo: 'cotizaciones' }
];