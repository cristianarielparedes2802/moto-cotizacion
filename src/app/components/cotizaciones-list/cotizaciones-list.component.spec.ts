import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesListComponent } from './cotizaciones-list.component';

describe('CotizacionesListComponent', () => {
  let component: CotizacionesListComponent;
  let fixture: ComponentFixture<CotizacionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizacionesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CotizacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
