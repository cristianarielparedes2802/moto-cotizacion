import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { CotizacionService } from '../../services/cotizacion.service';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { soloAlfabeticoValidator } from '../../shared/validators/custom-validators';

@Component({
  selector: 'app-nueva-cotizacion',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DecimalPipe, SectionHeaderComponent],
  templateUrl: './nueva-cotizacion.component.html',
  styleUrl: './nueva-cotizacion.component.css'
})
export class NuevaCotizacionComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  cuotaCalculada = 0;
  enviando = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private cotizacionService: CotizacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreCliente: ['', [
        Validators.required,
        soloAlfabeticoValidator
      ]],
      montoSolicitado: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(60000)
      ]],
      tasaInteres: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(20)
      ]],
      plazoMeses: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(60)
      ]]
    });

    this.form.valueChanges
      .pipe(debounceTime(250), takeUntil(this.destroy$))
      .subscribe(() => this.recalcularCuota());
  }

  private recalcularCuota(): void {
    const { montoSolicitado, tasaInteres, plazoMeses } = this.form.value;
    if (montoSolicitado > 0 && tasaInteres >= 0 && plazoMeses > 0) {
      this.cuotaCalculada = this.cotizacionService.calcularCuota(
        +montoSolicitado, +tasaInteres, +plazoMeses
      );
    } else {
      this.cuotaCalculada = 0;
    }
  }

  getError(campo: string): string {
    const ctrl = this.form.get(campo);
    if (!ctrl || !ctrl.touched || !ctrl.errors) return '';

    if (ctrl.errors['required'])       return 'Este campo es obligatorio.';
    if (ctrl.errors['soloAlfabetico']) return 'Solo se permiten letras y espacios.';
    if (ctrl.errors['min'])            return `El valor debe ser mayor a ${ctrl.errors['min'].min}.`;
    if (ctrl.errors['max']) {
      const max = ctrl.errors['max'].max;
      return campo === 'montoSolicitado'
        ? `El monto máximo permitido es Q ${max.toLocaleString('es-GT')}.`
        : `El valor máximo es ${max}.`;
    }
    return '';
  }

  isInvalid(campo: string): boolean {
    const ctrl = this.form.get(campo);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando = true;
    const nuevaCotizacion = this.cotizacionService.guardarCotizacion(this.form.value);
    this.router.navigate(['/detalle', nuevaCotizacion.id]);
  }

  cancelar(): void {
    this.router.navigate(['/cotizaciones']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}