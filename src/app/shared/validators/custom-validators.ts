import { AbstractControl, ValidationErrors } from '@angular/forms';

export function soloAlfabeticoValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
  return regex.test(control.value) ? null : { soloAlfabetico: true };
}