# Módulo de Cotización de Préstamos para Motocicletas
Prueba Técnica — DES05 Angular Forms

## Requisitos
- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)

## Instalación
```bash
npm install
```

## Ejecución
```bash
ng serve
```
Abre en el navegador: `http://localhost:4200`

## Estructura del proyecto
```
src/app/
├── components/   # Componentes de vista (list, form, detalle)
├── services/     # Lógica de negocio y persistencia
├── models/       # Interfaces TypeScript
└── shared/       # Componentes reutilizables y validadores
```

## Funcionalidades
- Listado de cotizaciones guardadas
- Formulario con validaciones completas (Reactive Forms)
- Cálculo automático de cuota mensual (sistema francés)
- Persistencia en localStorage